/**
 * API Service for ML Assistant Frontend
 */

import { ChatApiResponse, DomainValidationResponse } from '../types.ts';
import { KnowledgeTopic, AlgorithmDetail, GlossaryItem, RoadmapStep } from '../../server/knowledgeBase.ts';

export const apiService = {
  // Send chat message
  async sendChat(message: string, history: Array<{ role: 'user' | 'model'; text: string }>): Promise<ChatApiResponse> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.details || `Server responded with status ${res.status}`);
    }

    return res.json();
  },

  // Test domain validation directly
  async testDomainValidation(query: string): Promise<DomainValidationResponse> {
    const res = await fetch('/api/validate-domain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    if (!res.ok) {
      throw new Error(`Domain check failed with status ${res.status}`);
    }

    return res.json();
  },

  // Get 21 knowledge topics
  async getTopics(): Promise<KnowledgeTopic[]> {
    const res = await fetch('/api/kb/topics');
    if (!res.ok) throw new Error('Failed to fetch knowledge topics');
    const data = await res.json();
    return data.topics;
  },

  // Get algorithms
  async getAlgorithms(): Promise<AlgorithmDetail[]> {
    const res = await fetch('/api/kb/algorithms');
    if (!res.ok) throw new Error('Failed to fetch algorithms');
    const data = await res.json();
    return data.algorithms;
  },

  // Get glossary
  async getGlossary(): Promise<GlossaryItem[]> {
    const res = await fetch('/api/kb/glossary');
    if (!res.ok) throw new Error('Failed to fetch glossary');
    const data = await res.json();
    return data.glossary;
  },

  // Get roadmap
  async getRoadmap(): Promise<RoadmapStep[]> {
    const res = await fetch('/api/kb/roadmap');
    if (!res.ok) throw new Error('Failed to fetch roadmap');
    const data = await res.json();
    return data.roadmap;
  },

  // Health check
  async getHealth() {
    const res = await fetch('/api/health');
    return res.json();
  }
};
