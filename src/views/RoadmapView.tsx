import React, { useState } from 'react';
import { ML_ROADMAP, RoadmapStep } from '../../server/knowledgeBase.ts';
import { 
  Map, 
  CheckCircle, 
  Circle, 
  ArrowDown, 
  Clock, 
  Wrench, 
  Lightbulb, 
  Send, 
  Award,
  Sparkles
} from 'lucide-react';

interface RoadmapViewProps {
  onAskQuestion: (query: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onAskQuestion }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) ? prev.filter(s => s !== stepNumber) : [...prev, stepNumber]
    );
  };

  const progressPercent = Math.round((completedSteps.length / ML_ROADMAP.length) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Map size={20} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Curriculum Guide
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Machine Learning Learning Roadmap
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
          An end-to-end structured path from Python and Linear Algebra to Deep Neural Networks and production MLOps deployment.
        </p>

        {/* Progress tracker */}
        <div className="mt-5 p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span className="flex items-center gap-1.5">
              <Award size={14} className="text-emerald-600" />
              Roadmap Mastery Progress: {completedSteps.length} of {ML_ROADMAP.length} Milestones
            </span>
            <span className="text-emerald-600 font-mono">{progressPercent}% Completed</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Visual Roadmap Flow */}
      <div className="relative pl-6 sm:pl-8 space-y-6">
        {/* Vertical Connecting Line */}
        <div className="absolute left-[19px] sm:left-[27px] top-6 bottom-6 w-0.5 bg-slate-200" />

        {ML_ROADMAP.map((step, idx) => {
          const isDone = completedSteps.includes(step.step);
          const isLast = idx === ML_ROADMAP.length - 1;

          return (
            <div key={step.step} className="relative group">
              {/* Step Marker Node */}
              <button
                onClick={() => toggleStep(step.step)}
                className={`absolute -left-6 sm:-left-8 top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all z-10 ${
                  isDone 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs' 
                    : 'bg-white border-slate-300 text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-600'
                }`}
                title={isDone ? 'Mark as incomplete' : 'Mark milestone completed'}
              >
                {isDone ? <CheckCircle size={16} /> : <span className="text-xs font-mono font-bold">{step.step}</span>}
              </button>

              {/* Step Card */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isDone 
                  ? 'bg-white border-emerald-200/80 shadow-xs' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}>
                {/* Title & Duration */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      STEP {step.step}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {step.title}
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-mono">
                    <Clock size={12} className="text-slate-400" />
                    {step.duration}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {step.description}
                </p>

                {/* Topics Covered */}
                <div className="mb-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Core Topics Covered
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.topics.map((topic, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs border border-slate-200/60 font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools & Project Idea */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-start gap-2 text-slate-600">
                    <Wrench size={14} className="text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800 block">Tools & Frameworks:</span>
                      <span>{step.tools.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-slate-600">
                    <Lightbulb size={14} className="text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800 block">Hands-on Project:</span>
                      <span className="text-slate-600">{step.projectIdea}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleStep(step.step)}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <span>{isDone ? '✓ Completed' : 'Mark as Done'}</span>
                  </button>

                  <button
                    onClick={() => onAskQuestion(`What is the recommended study guide, prerequisites, and code example for ${step.title}?`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors"
                  >
                    <Send size={12} />
                    <span>Study Step in Chat</span>
                  </button>
                </div>
              </div>

              {/* Connecting Down Arrow between cards */}
              {!isLast && (
                <div className="flex justify-center -mb-2 py-1">
                  <ArrowDown size={14} className="text-slate-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
