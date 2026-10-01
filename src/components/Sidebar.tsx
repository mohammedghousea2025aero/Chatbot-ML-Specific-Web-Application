import React, { useState } from 'react';
import { ChatSession } from '../types.ts';
import { ChatbotAvatar } from './ChatbotAvatar.tsx';
import { 
  Plus, 
  MessageSquare, 
  Search, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  BookOpen, 
  Cpu, 
  Map, 
  SpellCheck, 
  TestTube, 
  Layers, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export type ActiveTab = 'chat' | 'learn' | 'algorithms' | 'roadmap' | 'glossary' | 'testing' | 'architecture';

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onRenameSession: (id: string, newTitle: string) => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  onSelectKnowledgeCategory?: (category: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onRenameSession,
  activeTab,
  onTabChange,
  isOpen,
  onCloseMobile,
  onSelectKnowledgeCategory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const filteredSessions = sessions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startRenaming = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditingTitle(session.title);
  };

  const saveRenaming = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (editingTitle.trim()) {
      onRenameSession(id, editingTitle.trim());
    }
    setEditingSessionId(null);
  };

  const cancelRenaming = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingSessionId(null);
  };

  const handleTabClick = (tab: ActiveTab) => {
    onTabChange(tab);
    onCloseMobile();
  };

  const handleTopicQuickJump = (topic: string) => {
    onTabChange('learn');
    onSelectKnowledgeCategory?.(topic);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static top-0 bottom-0 left-0 z-50
        w-72 bg-white border-r border-slate-200/90
        flex flex-col h-full shrink-0 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ChatbotAvatar size="md" showStatus />
            <div>
              <span className="font-bold text-slate-900 text-base leading-tight block">
                ML Assistant
              </span>
              <span className="text-[10px] text-indigo-600 font-semibold tracking-wide uppercase">
                Machine Learning AI
              </span>
            </div>
          </div>
          <button 
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Button: New Chat */}
        <div className="p-3 border-b border-slate-100">
          <button
            onClick={() => {
              onNewChat();
              onTabChange('chat');
              onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-xs transition-colors"
          >
            <Plus size={16} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Scrollable Navigation & History */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5 text-xs text-slate-600">
          
          {/* Main Navigation */}
          <div>
            <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Sections
            </div>
            <div className="space-y-0.5 mt-1">
              <button
                onClick={() => handleTabClick('chat')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left font-medium transition-colors ${
                  activeTab === 'chat' 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <MessageSquare size={15} className={activeTab === 'chat' ? 'text-indigo-600' : 'text-slate-400'} />
                <span>Chat Assistant</span>
              </button>

              <button
                onClick={() => handleTabClick('learn')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left font-medium transition-colors ${
                  activeTab === 'learn' 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <BookOpen size={15} className={activeTab === 'learn' ? 'text-indigo-600' : 'text-slate-400'} />
                <span>Learn ML (21 Topics)</span>
              </button>

              <button
                onClick={() => handleTabClick('algorithms')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left font-medium transition-colors ${
                  activeTab === 'algorithms' 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Cpu size={15} className={activeTab === 'algorithms' ? 'text-indigo-600' : 'text-slate-400'} />
                <span>Algorithm Explorer</span>
              </button>

              <button
                onClick={() => handleTabClick('roadmap')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left font-medium transition-colors ${
                  activeTab === 'roadmap' 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Map size={15} className={activeTab === 'roadmap' ? 'text-indigo-600' : 'text-slate-400'} />
                <span>Learning Roadmap</span>
              </button>

              <button
                onClick={() => handleTabClick('glossary')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left font-medium transition-colors ${
                  activeTab === 'glossary' 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <SpellCheck size={15} className={activeTab === 'glossary' ? 'text-indigo-600' : 'text-slate-400'} />
                <span>ML Glossary</span>
              </button>

              <button
                onClick={() => handleTabClick('testing')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left font-medium transition-colors ${
                  activeTab === 'testing' 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <TestTube size={15} className={activeTab === 'testing' ? 'text-indigo-600' : 'text-slate-400'} />
                <span>Testing & Evaluation</span>
              </button>

              <button
                onClick={() => handleTabClick('architecture')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left font-medium transition-colors ${
                  activeTab === 'architecture' 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Layers size={15} className={activeTab === 'architecture' ? 'text-indigo-600' : 'text-slate-400'} />
                <span>Architecture & Viva</span>
              </button>
            </div>
          </div>

          {/* Learn ML Topics Quick Jump */}
          <div>
            <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Core ML Topics</span>
              <Sparkles size={11} className="text-indigo-500" />
            </div>
            <div className="space-y-0.5 mt-1">
              {[
                'Fundamentals',
                'Supervised Learning',
                'Unsupervised Learning',
                'Reinforcement Learning',
                'Model Evaluation',
                'Neural Networks & Deep Learning'
              ].map((topic, i) => (
                <button
                  key={i}
                  onClick={() => handleTopicQuickJump(topic)}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                >
                  <span className="truncate">{topic}</span>
                  <ChevronRight size={11} className="text-slate-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Chat History */}
          <div>
            <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Chat History</span>
              <span className="text-[10px] text-slate-400 font-normal">({sessions.length})</span>
            </div>

            {/* History Search */}
            {sessions.length > 2 && (
              <div className="relative mt-1 mb-2 px-1">
                <Search size={12} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-7 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-400"
                />
              </div>
            )}

            <div className="space-y-1 mt-1">
              {filteredSessions.length === 0 ? (
                <div className="text-center py-4 text-slate-400 text-xs italic">
                  {searchQuery ? 'No matching chats found' : 'No chats yet. Start asking!'}
                </div>
              ) : (
                filteredSessions.map((session) => {
                  const isActive = activeSessionId === session.id && activeTab === 'chat';
                  const isEditing = editingSessionId === session.id;

                  if (isEditing) {
                    return (
                      <div key={session.id} className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveRenaming(session.id);
                            if (e.key === 'Escape') cancelRenaming();
                          }}
                          autoFocus
                          className="flex-1 bg-white border border-slate-300 rounded px-2 py-1 text-xs outline-none"
                        />
                        <button 
                          onClick={(e) => saveRenaming(session.id, e)} 
                          className="p-1 hover:text-emerald-600"
                        >
                          <Check size={13} />
                        </button>
                        <button 
                          onClick={(e) => cancelRenaming(e)} 
                          className="p-1 hover:text-slate-600"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={session.id}
                      onClick={() => {
                        onSelectSession(session.id);
                        onTabChange('chat');
                        onCloseMobile();
                      }}
                      className={`group flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-800 font-medium' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <MessageSquare size={13} className={isActive ? 'text-indigo-600 shrink-0' : 'text-slate-400 shrink-0'} />
                        <span className="truncate text-xs">{session.title}</span>
                      </div>

                      <div className="hidden group-hover:flex items-center gap-1 shrink-0 ml-1">
                        <button
                          onClick={(e) => startRenaming(session, e)}
                          className="p-1 text-slate-400 hover:text-slate-600 rounded"
                          title="Rename chat"
                        >
                          <Edit3 size={11} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSession(session.id);
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          title="Delete chat"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={13} />
            </div>
            <div className="truncate">
              <div className="text-[11px] font-semibold text-slate-800 truncate">
                ML Assistant AI
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                Domain-Specific Machine Learning
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/50 font-mono">
            <span>Neural Engine</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
