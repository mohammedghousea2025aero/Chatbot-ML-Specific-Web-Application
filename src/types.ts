/**
 * Data Models & Type Definitions for ML Assistant
 */

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  isOutOfScope?: boolean;
  category?: string;
  matchedKeywords?: string[];
  executionTimeMs?: number;
  feedback?: 'like' | 'dislike' | null;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export interface DomainValidationResponse {
  isMlDomain: boolean;
  confidence: number;
  matchedKeywords: string[];
  category?: string;
  reason: string;
}

export interface ChatApiResponse {
  response: string;
  isOutOfScope: boolean;
  matchedKeywords?: string[];
  category?: string;
  reason?: string;
  confidence?: number;
  executionTimeMs?: number;
  error?: string;
}

export interface TestCase {
  id: string;
  title: string;
  input: string;
  expectedType: 'ml_answer' | 'out_of_scope' | 'validation_error';
  expectedDescription: string;
  status?: 'pending' | 'running' | 'pass' | 'fail';
  actualResult?: string;
  latencyMs?: number;
  domainDetected?: boolean;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  eventType: 'chat_request' | 'domain_validation' | 'out_of_scope_rejection' | 'feedback_submitted';
  details: string;
}
