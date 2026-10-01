import React, { useState } from 'react';
import { ML_KNOWLEDGE_TOPICS, KnowledgeTopic } from '../../server/knowledgeBase.ts';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Send, 
  Code2, 
  Calculator, 
  HelpCircle,
  Tag
} from 'lucide-react';

interface LearnMLViewProps {
  onAskQuestion: (query: string) => void;
  initialCategory?: string;
}

export const LearnMLView: React.FC<LearnMLViewProps> = ({ 
  onAskQuestion, 
  initialCategory 
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(ML_KNOWLEDGE_TOPICS.map(t => t.category)))];

  const filteredTopics = ML_KNOWLEDGE_TOPICS.filter(t => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = 
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.summary.toLowerCase().includes(search.toLowerCase()) ||
      t.keyConcepts.some(c => c.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <BookOpen size={20} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Structured Knowledge Base
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Learn Machine Learning Fundamentals
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
          Explore the 21 structured core domains of Machine Learning. Study formal mathematical foundations, 
          intuitive explanations, key concepts, and practical code snippets.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search ML topics, concepts, or formulas (e.g., overfitting, regression, gradient descent)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Count */}
      <div className="text-xs text-slate-500 mb-4 flex items-center justify-between">
        <span>Showing {filteredTopics.length} of {ML_KNOWLEDGE_TOPICS.length} topics</span>
        <span className="hidden sm:inline text-indigo-600 font-medium">Click "Ask ML Assistant" to explore any concept in the chat</span>
      </div>

      {/* Grid of Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;
          return (
            <div
              key={topic.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center border border-indigo-100 font-mono">
                      #{topic.number}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        {topic.title}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <Tag size={10} />
                        {topic.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                  {topic.summary}
                </p>

                {/* Key Concepts Pills */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">
                    Key Concepts
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.keyConcepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] border border-slate-200/60 font-medium"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Formula (if available) */}
                {topic.formula && (
                  <div className="p-2.5 bg-slate-50 border border-slate-200/70 rounded-xl mb-3 flex items-start gap-2">
                    <Calculator size={14} className="text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Mathematical Foundation</span>
                      <code className="text-xs font-mono text-indigo-900 font-semibold">{topic.formula}</code>
                    </div>
                  </div>
                )}

                {/* Example */}
                <div className="text-xs text-slate-500 mb-3 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/60">
                  <span className="font-semibold text-amber-900 block mb-0.5">Real-World Application:</span>
                  {topic.example}
                </div>

                {/* Python Snippet toggle */}
                {topic.pythonSnippet && (
                  <div className="mb-4">
                    <button
                      onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                    >
                      <Code2 size={13} />
                      <span>{isExpanded ? 'Hide Code Snippet' : 'View Python Snippet'}</span>
                    </button>
                    {isExpanded && (
                      <pre className="mt-2 p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto shadow-xs">
                        <code>{topic.pythonSnippet}</code>
                      </pre>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Quick-Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Deepen knowledge</span>
                <button
                  onClick={() => onAskQuestion(`Explain ${topic.title} in detail with beginner-friendly intuition, mathematical background, and python code.`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors"
                >
                  <Send size={12} />
                  <span>Ask ML Assistant</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
