/**
 * Storage & Database Simulation Service
 * Implements the entity model: Users, ChatSessions, Messages, Feedback, Logs
 * Ready to connect with PostgreSQL / MySQL backend
 */

import { ChatSession, Message, SystemLog } from '../types.ts';

const SESSIONS_KEY = 'ml_assistant_sessions_v1';
const CURRENT_SESSION_KEY = 'ml_assistant_active_session_id';
const LOGS_KEY = 'ml_assistant_logs_v1';

export const storageService = {
  // Get all chat sessions
  getSessions(): ChatSession[] {
    try {
      const data = localStorage.getItem(SESSIONS_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to parse sessions from localStorage', err);
      return [];
    }
  },

  // Save session list
  saveSessions(sessions: ChatSession[]): void {
    try {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch (err) {
      console.error('Failed to save sessions to localStorage', err);
    }
  },

  // Get active session ID
  getActiveSessionId(): string | null {
    return localStorage.getItem(CURRENT_SESSION_KEY);
  },

  setActiveSessionId(id: string | null): void {
    if (id) {
      localStorage.setItem(CURRENT_SESSION_KEY, id);
    } else {
      localStorage.removeItem(CURRENT_SESSION_KEY);
    }
  },

  // Create a new session
  createSession(initialTitle = 'New ML Discussion'): ChatSession {
    const newSession: ChatSession = {
      id: 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: initialTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    };

    const sessions = this.getSessions();
    sessions.unshift(newSession);
    this.saveSessions(sessions);
    this.setActiveSessionId(newSession.id);
    this.logEvent('info', 'chat_request', `Created new session ${newSession.id}`);
    return newSession;
  },

  // Get specific session
  getSession(id: string): ChatSession | undefined {
    const sessions = this.getSessions();
    return sessions.find(s => s.id === id);
  },

  // Update session title
  renameSession(id: string, newTitle: string): void {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.id === id);
    if (session) {
      session.title = newTitle.trim() || 'Untitled Discussion';
      session.updatedAt = new Date().toISOString();
      this.saveSessions(sessions);
    }
  },

  // Delete session
  deleteSession(id: string): void {
    let sessions = this.getSessions();
    sessions = sessions.filter(s => s.id !== id);
    this.saveSessions(sessions);

    if (this.getActiveSessionId() === id) {
      const nextId = sessions.length > 0 ? sessions[0].id : null;
      this.setActiveSessionId(nextId);
    }
  },

  // Add message to session
  addMessage(sessionId: string, message: Message): ChatSession | undefined {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      session.messages.push(message);
      session.updatedAt = new Date().toISOString();
      
      // Auto update title from first user query if still generic
      if (session.messages.length === 1 && message.role === 'user') {
        const autoTitle = message.content.slice(0, 36).replace(/\n/g, ' ') + (message.content.length > 36 ? '...' : '');
        session.title = autoTitle;
      }

      this.saveSessions(sessions);
      return session;
    }
    return undefined;
  },

  // Update message feedback
  setMessageFeedback(sessionId: string, messageId: string, feedback: 'like' | 'dislike'): void {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      const msg = session.messages.find(m => m.id === messageId);
      if (msg) {
        msg.feedback = feedback;
        this.saveSessions(sessions);
        this.logEvent('info', 'feedback_submitted', `User marked message ${messageId} as ${feedback}`);
      }
    }
  },

  // Clear messages in a session
  clearSessionMessages(sessionId: string): void {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      session.messages = [];
      session.updatedAt = new Date().toISOString();
      this.saveSessions(sessions);
    }
  },

  // Logs entity
  getLogs(): SystemLog[] {
    try {
      const raw = localStorage.getItem(LOGS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  logEvent(level: 'info' | 'warn' | 'error', eventType: SystemLog['eventType'], details: string): void {
    try {
      const logs = this.getLogs();
      const newLog: SystemLog = {
        id: 'log_' + Date.now(),
        timestamp: new Date().toISOString(),
        level,
        eventType,
        details
      };
      logs.unshift(newLog);
      // Keep last 100 logs
      localStorage.setItem(LOGS_KEY, JSON.stringify(logs.slice(0, 100)));
    } catch {
      // ignore
    }
  }
};
