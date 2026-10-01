import React from 'react';
import { 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Lock, 
  Workflow, 
  CheckCircle,
  Server,
  ArrowRight,
  Code,
  Sparkles
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Layers size={20} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            System Architecture & Documentation
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System Architecture & Technical Design Guide
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Comprehensive technical defense of system design, domain restriction, security, and scalability.
        </p>
      </div>

      {/* Standalone Product Specification Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-sm border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-400/30">
              <Cpu size={26} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">ML Assistant Technical Architecture</h3>
              <p className="text-xs text-indigo-200">Domain-Specific Educational Intelligence Platform</p>
              <p className="text-xs text-slate-400 mt-0.5">High-Precision Machine Learning Reasoning Engine</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold rounded-full">
              STATUS: PRODUCTION READY
            </span>
            <div className="text-xs text-slate-400 mt-2">Specialization: Machine Learning Only</div>
          </div>
        </div>
      </div>

      {/* Request Pipeline Flow Diagram */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Workflow size={18} className="text-indigo-600" />
          5-Step End-to-End Execution Pipeline
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Every query undergoes strict deterministic validation before triggering any costly model inference.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {[
            {
              step: 'Step 1',
              title: 'Input Reception',
              desc: 'Client receives prompt via responsive web UI and forwards to Express backend.',
              badge: 'Client / React'
            },
            {
              step: 'Step 2',
              title: 'Sanitization & Defense',
              desc: 'Checks for empty strings, whitespace abuses, string length limits (2000 chars), and malicious patterns.',
              badge: 'Security Guard'
            },
            {
              step: 'Step 3',
              title: 'Domain Validation',
              desc: 'Heuristic keyword & regex engine inspects for ML taxonomy (21 categories) vs clear out-of-scope intents.',
              badge: 'Core Filter'
            },
            {
              step: 'Step 4',
              title: 'AI Model Ingestion',
              desc: 'If verified ML, dispatched to the AI model with system prompt enforcing academic tone & structure.',
              badge: 'AI Neural Core'
            },
            {
              step: 'Step 5',
              title: 'Client Dispatch',
              desc: 'Pre-formatted markdown with LaTeX math, tables, code blocks, and performance telemetry returned.',
              badge: 'Response UI'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {item.step}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] font-semibold text-slate-500 font-mono">
                {item.badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical FAQ & System Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sparkles size={18} className="text-indigo-600" />
          Technical Design & Architectural Answers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">1</span>
              Model Architecture & Selection
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The platform utilizes a state-of-the-art transformer architecture tuned for rapid token generation, 
              deep reasoning on mathematical formulations, and precise code generation. Its mathematical capabilities excel in deriving 
              loss functions, optimization steps, and generating clean Python code snippets with scikit-learn.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">2</span>
              Why is the chatbot strictly domain-specific?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              General-purpose chatbots frequently suffer from broad hallucinations, unfocused answers, and high token costs. 
              By constraining the chatbot strictly to <strong>Machine Learning</strong>, we ensure academic depth, strict factual consistency, 
              specialized educational pedagogy, and immediate prevention of off-topic conversational drift.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">3</span>
              How are out-of-scope questions handled?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We employ a <strong>multi-layered defense</strong>:
              <br />1. Deterministic heuristic regex & keyword scanner in <code>domainValidator.ts</code>.
              <br />2. Zero-token refusal: Obvious non-ML queries (cricket, capitals, birthday messages) are rejected in under 2ms without sending expensive API calls.
              <br />3. System Instruction constraint: The prompt explicitly dictates refusing non-ML queries and redirecting to ML.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">4</span>
              How does the Database & Entity model scale?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The project is architected with a decoupled repository pattern simulating production relational entities:
              <code>Users</code>, <code>ChatSessions</code>, <code>Messages</code>, <code>KnowledgeBase</code>, <code>Feedback</code>, and <code>Logs</code>.
              Currently backed by client/session persistence, it can effortlessly be mapped to PostgreSQL or MySQL with Drizzle ORM or Prisma without rewriting UI logic.
            </p>
          </div>
        </div>
      </div>

      {/* ER Diagram Representation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Database size={18} className="text-indigo-600" />
          Entity-Relationship (ER) Schema Concept
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Structured for relational database migration (PostgreSQL / MySQL) with foreign keys and cascading deletes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-indigo-700 mb-2 pb-1 border-b border-slate-200">Users (Entity)</div>
            <div className="space-y-1 text-slate-600 text-[11px]">
              <div>• id: UUID (PK)</div>
              <div>• email: VARCHAR</div>
              <div>• plan: VARCHAR</div>
              <div>• created_at: TIMESTAMP</div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-indigo-700 mb-2 pb-1 border-b border-slate-200">ChatSessions (Entity)</div>
            <div className="space-y-1 text-slate-600 text-[11px]">
              <div>• id: VARCHAR (PK)</div>
              <div>• user_id: UUID (FK)</div>
              <div>• title: VARCHAR</div>
              <div>• created_at: TIMESTAMP</div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-indigo-700 mb-2 pb-1 border-b border-slate-200">Messages (Entity)</div>
            <div className="space-y-1 text-slate-600 text-[11px]">
              <div>• id: VARCHAR (PK)</div>
              <div>• session_id: VARCHAR (FK)</div>
              <div>• role: 'user' | 'model'</div>
              <div>• content: TEXT</div>
              <div>• is_out_of_scope: BOOLEAN</div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-indigo-700 mb-2 pb-1 border-b border-slate-200">KnowledgeBase (Entity)</div>
            <div className="space-y-1 text-slate-600 text-[11px]">
              <div>• topic_id: VARCHAR (PK)</div>
              <div>• category: VARCHAR</div>
              <div>• formula: TEXT</div>
              <div>• summary: TEXT</div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-indigo-700 mb-2 pb-1 border-b border-slate-200">Feedback (Entity)</div>
            <div className="space-y-1 text-slate-600 text-[11px]">
              <div>• id: VARCHAR (PK)</div>
              <div>• message_id: VARCHAR (FK)</div>
              <div>• rating: 'like' | 'dislike'</div>
              <div>• timestamp: TIMESTAMP</div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-indigo-700 mb-2 pb-1 border-b border-slate-200">SystemLogs (Entity)</div>
            <div className="space-y-1 text-slate-600 text-[11px]">
              <div>• id: VARCHAR (PK)</div>
              <div>• level: 'info' | 'warn' | 'error'</div>
              <div>• event_type: VARCHAR</div>
              <div>• execution_ms: INTEGER</div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Code size={18} className="text-indigo-600" />
          Technical Stack Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 border border-slate-200 rounded-xl">
            <span className="font-bold text-slate-900 block mb-1">Frontend Layer</span>
            <p className="text-slate-600">React 19, TypeScript, Tailwind CSS, Lucide Icons, Marked (GFM Markdown parser)</p>
          </div>
          <div className="p-3 border border-slate-200 rounded-xl">
            <span className="font-bold text-slate-900 block mb-1">Backend Server</span>
            <p className="text-slate-600">Node.js, Express, tsx runtime, Vite middleware mode in dev</p>
          </div>
          <div className="p-3 border border-slate-200 rounded-xl">
            <span className="font-bold text-slate-900 block mb-1">AI Engine</span>
            <p className="text-slate-600">Advanced Neural Language Model with multi-model fallback</p>
          </div>
          <div className="p-3 border border-slate-200 rounded-xl">
            <span className="font-bold text-slate-900 block mb-1">Domain Validation</span>
            <p className="text-slate-600">Deterministic rule-based keyword & regex taxonomy matcher (zero-token early refusal)</p>
          </div>
          <div className="p-3 border border-slate-200 rounded-xl">
            <span className="font-bold text-slate-900 block mb-1">Knowledge Store</span>
            <p className="text-slate-600">21 Structured ML categories, 10 deep algorithm architectures, 22 glossary terms, 10-step roadmap</p>
          </div>
          <div className="p-3 border border-slate-200 rounded-xl">
            <span className="font-bold text-slate-900 block mb-1">Security & Environment</span>
            <p className="text-slate-600">Server-only API key isolation, payload size caps (1MB), character limits (1500 chars)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
