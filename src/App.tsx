/**
 * ML Assistant - Domain-Specific Machine Learning AI Chatbot
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChatSession, Message } from './types.ts';
import { storageService } from './services/storage.ts';
import { apiService } from './services/api.ts';
import { Sidebar, ActiveTab } from './components/Sidebar.tsx';
import { ChatMessage } from './components/ChatMessage.tsx';
import { ChatbotAvatar } from './components/ChatbotAvatar.tsx';
import { ChatInput } from './components/ChatInput.tsx';
import { HomeHero } from './components/HomeHero.tsx';
import { LearnMLView } from './views/LearnMLView.tsx';
import { AlgorithmExplorerView } from './views/AlgorithmExplorerView.tsx';
import { RoadmapView } from './views/RoadmapView.tsx';
import { GlossaryView } from './views/GlossaryView.tsx';
import { TestingView } from './views/TestingView.tsx';
import { ArchitectureView } from './views/ArchitectureView.tsx';

import { 
  Menu, 
  Plus, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  X,
  Cpu
} from 'lucide-react';

export default function App() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [initialLearnCategory, setInitialLearnCategory] = useState<string | undefined>(undefined);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load sessions from storage on mount
  useEffect(() => {
    const loaded = storageService.getSessions();
    if (loaded.length === 0) {
      const first = storageService.createSession('Introduction to ML');
      setSessions([first]);
      setActiveSessionId(first.id);
    } else {
      setSessions(loaded);
      const savedActiveId = storageService.getActiveSessionId();
      if (savedActiveId && loaded.some(s => s.id === savedActiveId)) {
        setActiveSessionId(savedActiveId);
      } else {
        setActiveSessionId(loaded[0].id);
      }
    }
  }, []);

  // Current session helper
  const currentSession = sessions.find(s => s.id === activeSessionId);

  // Auto scroll to bottom of chat when new messages appear
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSession?.messages, isLoading, activeTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Create new session
  const handleNewChat = () => {
    const newSession = storageService.createSession('New ML Discussion');
    setSessions(storageService.getSessions());
    setActiveSessionId(newSession.id);
    setActiveTab('chat');
  };

  // Delete session
  const handleDeleteSession = (id: string) => {
    storageService.deleteSession(id);
    const updated = storageService.getSessions();
    setSessions(updated);
    if (activeSessionId === id) {
      if (updated.length > 0) {
        setActiveSessionId(updated[0].id);
      } else {
        const fresh = storageService.createSession('New ML Discussion');
        setSessions([fresh]);
        setActiveSessionId(fresh.id);
      }
    }
    showToast('Conversation deleted');
  };

  // Rename session
  const handleRenameSession = (id: string, newTitle: string) => {
    storageService.renameSession(id, newTitle);
    setSessions(storageService.getSessions());
  };

  // Clear messages in current session
  const handleClearCurrentSession = () => {
    if (!activeSessionId) return;
    storageService.clearSessionMessages(activeSessionId);
    setSessions(storageService.getSessions());
    showToast('Conversation cleared');
  };

  // Feedback on message
  const handleMessageFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
    if (!activeSessionId) return;
    storageService.setMessageFeedback(activeSessionId, messageId, feedback);
    setSessions(storageService.getSessions());
    showToast(feedback === 'like' ? 'Thank you! Marked as helpful.' : 'Feedback recorded.');
  };

  // Send message
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    let targetSessionId = activeSessionId;
    if (!targetSessionId || !sessions.some(s => s.id === targetSessionId)) {
      const created = storageService.createSession();
      setSessions(storageService.getSessions());
      targetSessionId = created.id;
      setActiveSessionId(created.id);
    }

    // Append user message immediately
    const userMsg: Message = {
      id: 'msg_user_' + Date.now(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString()
    };

    storageService.addMessage(targetSessionId, userMsg);
    setSessions(storageService.getSessions());
    setIsLoading(true);

    try {
      // Prepare previous 4 messages for context
      const sessionData = storageService.getSession(targetSessionId);
      const historyPayload = (sessionData?.messages || [])
        .slice(0, -1) // exclude current message just added
        .slice(-4)
        .map(m => ({ role: m.role, text: m.content }));

      const responseData = await apiService.sendChat(text.trim(), historyPayload);

      // Append bot message
      const botMsg: Message = {
        id: 'msg_bot_' + Date.now(),
        role: 'model',
        content: responseData.response,
        timestamp: new Date().toISOString(),
        isOutOfScope: responseData.isOutOfScope,
        category: responseData.category,
        matchedKeywords: responseData.matchedKeywords,
        executionTimeMs: responseData.executionTimeMs
      };

      storageService.addMessage(targetSessionId, botMsg);
      setSessions(storageService.getSessions());

    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        id: 'msg_err_' + Date.now(),
        role: 'model',
        content: `**Error:** ${error.message || 'Something went wrong while communicating with the AI service. Please try again.'}`,
        timestamp: new Date().toISOString(),
        isOutOfScope: false
      };
      storageService.addMessage(targetSessionId, errorMsg);
      setSessions(storageService.getSessions());
    } finally {
      setIsLoading(false);
    }
  };

  // Regenerate last response
  const handleRegenerate = () => {
    if (!currentSession || currentSession.messages.length === 0 || isLoading) return;
    
    // Find last user message
    const lastUserMsg = [...currentSession.messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.content);
    }
  };

  // Direct trigger from other tabs or suggestion cards
  const handleDirectAsk = (prompt: string) => {
    setActiveTab('chat');
    handleSendMessage(prompt);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <Sparkles size={14} className="text-indigo-400" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:text-slate-300">
            <X size={12} />
          </button>
        </div>
      )}

      {/* Collapsible / Mobile Sidebar */}
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={(id) => setActiveSessionId(id)}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        onRenameSession={handleRenameSession}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onSelectKnowledgeCategory={(cat) => setInitialLearnCategory(cat)}
      />

      {/* Main App Container */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-slate-50 relative">
        
        {/* Top Navbar */}
        <header className="h-14 sm:h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              title="Open menu"
            >
              <Menu size={20} />
            </button>

            {/* Title & Domain Badge */}
            <div className="flex items-center gap-2.5 truncate">
              <ChatbotAvatar size="sm" showStatus />
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-slate-900 text-sm sm:text-base leading-tight truncate">
                    ML Assistant
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    <ShieldCheck size={11} className="text-indigo-600" />
                    DOMAIN: ML ONLY
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 truncate hidden md:block">
                  {activeTab === 'chat' ? (currentSession?.title || 'Machine Learning Q&A') : 
                   activeTab === 'learn' ? 'Structured Knowledge Base (21 Categories)' :
                   activeTab === 'algorithms' ? 'Algorithm Architecture Explorer' :
                   activeTab === 'roadmap' ? '10-Step Machine Learning Roadmap' :
                   activeTab === 'glossary' ? 'Searchable Technical ML Glossary' :
                   activeTab === 'testing' ? 'Interactive Testing & Evaluation Suite' :
                   'System Architecture & Technical Documentation'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {activeTab === 'chat' && (
              <>
                {currentSession && currentSession.messages.length > 0 && (
                  <button
                    onClick={handleClearCurrentSession}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Clear current discussion"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <button
                  onClick={handleNewChat}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors"
                  title="Start a new chat session"
                >
                  <Plus size={14} />
                  <span>New Chat</span>
                </button>
              </>
            )}

            {/* Standalone Product Badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600 text-xs font-medium border border-slate-200">
              <Cpu size={13} className="text-indigo-600" />
              <span>Domain AI Specialist</span>
            </div>
          </div>
        </header>

        {/* Content View Router */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'chat' && (
            <div className="flex flex-col min-h-full">
              {/* If no messages in current session, render Home Hero */}
              {(!currentSession || currentSession.messages.length === 0) ? (
                <div className="flex-1 flex flex-col justify-center">
                  <HomeHero 
                    onSelectPrompt={(p) => handleSendMessage(p)}
                    onOpenTestingTab={() => setActiveTab('testing')}
                  />
                </div>
              ) : (
                /* Message Stream */
                <div className="flex-1 max-w-4xl w-full mx-auto py-6">
                  {currentSession.messages.map((msg, idx) => (
                    <ChatMessage
                      key={msg.id || idx}
                      message={msg}
                      onRegenerate={idx === currentSession.messages.length - 1 && msg.role === 'model' ? handleRegenerate : undefined}
                      onFeedback={handleMessageFeedback}
                    />
                  ))}

                  {/* Loading Typing Indicator with Avatar */}
                  {isLoading && (
                    <div className="flex justify-start my-4 px-2 sm:px-4">
                      <div className="flex items-start max-w-[85%] gap-3">
                        <ChatbotAvatar size="md" showStatus />
                        <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-xs">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="font-semibold text-slate-700">ML Assistant</span>
                            <span className="text-slate-400 font-mono text-[11px]">analyzing ML query...</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-3">
                            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* Bottom Sticky Chat Input */}
              <div className="sticky bottom-0 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-4">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  onSelectSuggestion={(s) => handleSendMessage(s)}
                />
              </div>
            </div>
          )}

          {activeTab === 'learn' && (
            <LearnMLView 
              onAskQuestion={handleDirectAsk}
              initialCategory={initialLearnCategory}
            />
          )}

          {activeTab === 'algorithms' && (
            <AlgorithmExplorerView onAskQuestion={handleDirectAsk} />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapView onAskQuestion={handleDirectAsk} />
          )}

          {activeTab === 'glossary' && (
            <GlossaryView onAskQuestion={handleDirectAsk} />
          )}

          {activeTab === 'testing' && (
            <TestingView />
          )}

          {activeTab === 'architecture' && (
            <ArchitectureView />
          )}
        </div>
      </main>
    </div>
  );
}
