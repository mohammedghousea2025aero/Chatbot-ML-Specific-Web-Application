import React, { useState } from 'react';
import { ML_GLOSSARY, GlossaryItem } from '../../server/knowledgeBase.ts';
import { 
  SpellCheck, 
  Search, 
  Send, 
  Calculator, 
  Tag,
  BookOpen
} from 'lucide-react';

interface GlossaryViewProps {
  onAskQuestion: (query: string) => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ onAskQuestion }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(ML_GLOSSARY.map(g => g.category)))];

  const filtered = ML_GLOSSARY.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase()) ||
      item.example.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
            <SpellCheck size={20} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
            Terminology Index
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Machine Learning Technical Glossary
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
          Instant definitions, mathematical intuitions, and real-world examples for 20+ core machine learning terms.
        </p>
      </div>

      {/* Search & Categories */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search terms (e.g., F1 Score, Confusion Matrix, Hyperparameter, Epoch)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-slate-900">
                  {item.term}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200 flex items-center gap-1">
                  <Tag size={10} />
                  {item.category}
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-3">
                {item.definition}
              </p>

              {item.formulaOrIntuition && (
                <div className="p-2.5 bg-slate-50 border border-slate-200/70 rounded-xl mb-3 flex items-start gap-2">
                  <Calculator size={13} className="text-teal-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Formula / Intuition</span>
                    <code className="text-xs font-mono text-teal-900 font-semibold">{item.formulaOrIntuition}</code>
                  </div>
                </div>
              )}

              <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-700 block mb-0.5">Example in practice:</span>
                {item.example}
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => onAskQuestion(`What is ${item.term} in Machine Learning? Give a detailed explanation with real-world examples and formulas.`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold transition-colors"
              >
                <Send size={11} />
                <span>Explain in Chat</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
