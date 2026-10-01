import React from 'react';
import { ChatbotVisual } from './ChatbotVisual.tsx';
import { 
  Brain, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  GitCompare, 
  TrendingDown, 
  Grid3X3,
  ShieldCheck,
  ArrowRight,
  TestTube,
  MessageSquare
} from 'lucide-react';

interface HomeHeroProps {
  onSelectPrompt: (prompt: string) => void;
  onOpenTestingTab: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ 
  onSelectPrompt,
  onOpenTestingTab
}) => {
  const quickPills = [
    'What is Machine Learning?',
    'Explain Random Forest',
    'What is overfitting?',
    'Classification vs Regression'
  ];

  const suggestions = [
    {
      title: 'What is Machine Learning?',
      desc: 'Understand the fundamental definition, learning paradigm, and core concepts.',
      icon: Brain,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
    },
    {
      title: 'Explain supervised vs unsupervised learning',
      desc: 'Compare labeled data prediction vs finding hidden structures in data.',
      icon: GitCompare,
      color: 'text-blue-600 bg-blue-50 border-blue-100'
    },
    {
      title: 'What is overfitting?',
      desc: 'Diagnosing model generalization gap, bias-variance tradeoff, and remedies.',
      icon: Layers,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      title: 'Explain Random Forest',
      desc: 'Ensemble bagging technique combining multiple decision trees.',
      icon: Sparkles,
      color: 'text-purple-600 bg-purple-50 border-purple-100'
    },
    {
      title: 'How does gradient descent work?',
      desc: 'Iterative optimization algorithm for minimizing empirical loss functions.',
      icon: TrendingDown,
      color: 'text-amber-600 bg-amber-50 border-amber-100'
    },
    {
      title: 'What is a confusion matrix?',
      desc: 'Evaluation layout measuring TP, FP, TN, FN, precision, and recall.',
      icon: Grid3X3,
      color: 'text-teal-600 bg-teal-50 border-teal-100'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center">
      
      {/* Hero 2-Column Section */}
      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12 mb-10">
        
        {/* Left Column: Heading, Subtitle & Action */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start max-w-2xl">
          
          {/* Domain Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs">
              <ShieldCheck size={14} className="text-indigo-600" />
              DOMAIN: MACHINE LEARNING
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              <Sparkles size={12} className="text-indigo-500" />
              Intelligent Virtual Assistant
            </span>
          </div>

          {/* Friendly Greeting & Headline */}
          <h2 className="text-sm sm:text-base font-bold text-indigo-600 mb-1 flex items-center gap-1.5">
            <span>Hi, I'm ML Assistant</span>
            <span className="inline-block animate-wave origin-bottom-right">👋</span>
          </h2>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
            Learn Machine Learning.<br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
              Ask Anything ML.
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed">
            An intelligent domain-specific assistant for understanding Machine Learning concepts, 
            algorithms, models and real-world applications.
          </p>

          <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
            <MessageSquare size={15} className="text-indigo-600" />
            Ask me anything about Machine Learning:
          </p>

          {/* Quick Suggestion Pills from Requirement 5 */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
            {quickPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => onSelectPrompt(pill)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 text-xs font-medium shadow-xs transition-all hover:scale-[1.02]"
              >
                {pill}
              </button>
            ))}
          </div>

          <button
            onClick={() => onSelectPrompt('What is Machine Learning? Explain the core concepts.')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-all hover:shadow-lg"
          >
            <span>Start Chatting</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Right Column: Large Attractive AI Chatbot Illustration */}
        <div className="shrink-0 flex items-center justify-center">
          <ChatbotVisual size="lg" />
        </div>
      </div>

      {/* Domain Scope Enforcement Info Card */}
      <div className="w-full bg-slate-900 text-slate-200 rounded-2xl p-4 sm:p-5 mb-8 text-left shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
            <TestTube size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              Domain Scope Enforcement Engine
              <span className="px-2 py-0.5 bg-indigo-500/30 text-indigo-300 text-[10px] rounded uppercase font-mono tracking-wider">
                Strict Guardrail
              </span>
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Questions outside the Machine Learning domain (e.g., general trivia, world capitals, sports scores) 
              are automatically identified and politely refused with redirection to Machine Learning.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={() => onSelectPrompt('Who won the latest cricket World Cup?')}
            className="flex-1 md:flex-none text-xs px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 transition-colors"
            title="Test out-of-scope rejection"
          >
            Test Rejection 🚫
          </button>
          <button
            onClick={onOpenTestingTab}
            className="flex-1 md:flex-none text-xs px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Live Test Suite</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Suggested Topics Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1.5">
          <HelpCircle size={14} className="text-slate-400" />
          Popular ML Study Topics
        </h3>
        <span className="text-xs text-slate-400 hidden sm:inline">Click any card to start a discussion</span>
      </div>

      {/* 6 Suggestion Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full text-left">
        {suggestions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectPrompt(item.title)}
              className="group p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 rounded-2xl shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl border ${item.color}`}>
                    <Icon size={18} />
                  </div>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="text-[15px] font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
