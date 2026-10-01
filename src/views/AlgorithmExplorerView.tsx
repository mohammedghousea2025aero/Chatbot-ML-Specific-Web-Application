import React, { useState } from 'react';
import { ML_ALGORITHMS, AlgorithmDetail } from '../../server/knowledgeBase.ts';
import { 
  Cpu, 
  Search, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Code, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Sparkles 
} from 'lucide-react';

interface AlgorithmExplorerViewProps {
  onAskQuestion: (query: string) => void;
}

export const AlgorithmExplorerView: React.FC<AlgorithmExplorerViewProps> = ({ onAskQuestion }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedAlgoId, setExpandedAlgoId] = useState<string | null>(null);

  const categories = [
    'All',
    'Supervised - Regression',
    'Supervised - Classification',
    'Supervised - Both',
    'Unsupervised - Clustering',
    'Unsupervised - Dimensionality Reduction',
    'Ensemble Methods'
  ];

  const filtered = ML_ALGORITHMS.filter(algo => {
    const matchesCategory = selectedCategory === 'All' || algo.category === selectedCategory;
    const matchesSearch = 
      algo.name.toLowerCase().includes(search.toLowerCase()) ||
      algo.description.toLowerCase().includes(search.toLowerCase()) ||
      algo.useCases.some(u => u.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Cpu size={20} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            Interactive Catalog
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Machine Learning Algorithm Explorer
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
          Deep-dive into the essential mathematical algorithms powering modern machine learning. 
          Inspect decision mechanics, strengths, weaknesses, hyperparameters, and production scikit-learn code.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search algorithms by name or application (e.g., Random Forest, SVM, K-Means)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithms List */}
      <div className="space-y-4">
        {filtered.map((algo) => {
          const isExpanded = expandedAlgoId === algo.id;
          return (
            <div
              key={algo.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-xs transition-all"
            >
              {/* Main Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-900">
                      {algo.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                      {algo.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                    {algo.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                  <button
                    onClick={() => onAskQuestion(`Explain ${algo.name} in detail. Include mathematical derivation, intuition, pros/cons, and a scikit-learn example.`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors"
                  >
                    <Send size={12} />
                    <span>Ask in Chat</span>
                  </button>
                  <button
                    onClick={() => setExpandedAlgoId(isExpanded ? null : algo.id)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                    title={isExpanded ? 'Collapse' : 'Expand full details'}
                  >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Use Cases Pills */}
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                <span className="text-[11px] text-slate-400 font-semibold mr-1">Typical Use Cases:</span>
                {algo.useCases.map((uc, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded-md border border-slate-200/60 font-medium">
                    {uc}
                  </span>
                ))}
              </div>

              {/* Expandable Section */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                  {/* Math Foundation */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Mathematical Formulation
                    </span>
                    <code className="text-xs sm:text-[13px] font-mono text-purple-900 font-semibold">
                      {algo.mathFoundation}
                    </code>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                        Advantages & Strengths
                      </span>
                      <ul className="text-xs text-emerald-900/80 space-y-1 list-disc pl-4">
                        {algo.pros.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                      <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5 mb-1.5">
                        <XCircle size={14} className="text-rose-600" />
                        Limitations & Tradeoffs
                      </span>
                      <ul className="text-xs text-rose-900/80 space-y-1 list-disc pl-4">
                        {algo.cons.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Python Code Sample */}
                  <div>
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                      <Code size={14} className="text-indigo-600" />
                      Python Implementation (Scikit-Learn)
                    </span>
                    <pre className="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto shadow-xs">
                      <code>{algo.codeSample}</code>
                    </pre>
                  </div>

                  {/* Hyperparameters */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mr-1">
                      <Sliders size={13} className="text-slate-400" />
                      Key Hyperparameters:
                    </span>
                    {algo.hyperparameters.map((hp, i) => (
                      <code key={i} className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded border border-purple-200 font-mono">
                        {hp}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
