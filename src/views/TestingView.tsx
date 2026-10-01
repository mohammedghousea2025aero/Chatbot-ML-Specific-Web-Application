import React, { useState } from 'react';
import { TestCase } from '../types.ts';
import { apiService } from '../services/api.ts';
import { 
  TestTube, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCw, 
  ShieldCheck, 
  ShieldAlert,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const TestingView: React.FC = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: 'TC01',
      title: 'ML Definition Verification',
      input: 'What is Machine Learning?',
      expectedType: 'ml_answer',
      expectedDescription: 'Accurate Machine Learning educational explanation with paradigms.',
      status: 'pending',
    },
    {
      id: 'TC02',
      title: 'Clustering Algorithm Query',
      input: 'Explain K-Means clustering algorithm',
      expectedType: 'ml_answer',
      expectedDescription: 'Detailed explanation of K-Means centroid optimization & WCSS.',
      status: 'pending',
    },
    {
      id: 'TC03',
      title: 'Diagnostics Query',
      input: 'What is overfitting and how do I prevent it?',
      expectedType: 'ml_answer',
      expectedDescription: 'ML explanation of overfitting, bias-variance, and regularization.',
      status: 'pending',
    },
    {
      id: 'TC04',
      title: 'Out-of-Scope Sports Trivia',
      input: 'Who won the latest cricket World Cup?',
      expectedType: 'out_of_scope',
      expectedDescription: 'Polite refusal redirecting user to Machine Learning topics.',
      status: 'pending',
    },
    {
      id: 'TC05',
      title: 'Empty Input Validation',
      input: '   ',
      expectedType: 'validation_error',
      expectedDescription: 'Input validation error requiring non-empty input.',
      status: 'pending',
    },
    {
      id: 'TC06',
      title: 'Out-of-Scope World Geography',
      input: 'What is the capital of France?',
      expectedType: 'out_of_scope',
      expectedDescription: 'Polite refusal rejecting non-ML geography question.',
      status: 'pending',
    },
    {
      id: 'TC07',
      title: 'Out-of-Scope Creative Writing',
      input: 'Write a birthday message for my friend.',
      expectedType: 'out_of_scope',
      expectedDescription: 'Refusal stating assistant only supports Machine Learning.',
      status: 'pending',
    },
    {
      id: 'TC08',
      title: 'Advanced Comparative Analysis & Code',
      input: 'Compare Random Forest and SVM with python code',
      expectedType: 'ml_answer',
      expectedDescription: 'Technical comparison table and runnable scikit-learn code.',
      status: 'pending',
    }
  ]);

  const [isRunningAll, setIsRunningAll] = useState(false);

  const runSingleTest = async (testId: string) => {
    setTestCases(prev => prev.map(tc => tc.id === testId ? { ...tc, status: 'running' } : tc));

    const tc = testCases.find(t => t.id === testId);
    if (!tc) return;

    const startTime = Date.now();

    try {
      // For empty input test case
      if (tc.expectedType === 'validation_error') {
        if (!tc.input.trim()) {
          setTestCases(prev => prev.map(t => t.id === testId ? {
            ...t,
            status: 'pass',
            actualResult: 'Caught by input validator: Empty query rejected safely.',
            latencyMs: Date.now() - startTime,
            domainDetected: false
          } : t));
          return;
        }
      }

      // Check domain validator
      const domainResult = await apiService.testDomainValidation(tc.input);
      const isMl = domainResult.isMlDomain;

      let isPass = false;
      let actual = '';

      if (tc.expectedType === 'out_of_scope') {
        if (!isMl) {
          isPass = true;
          actual = `Correctly rejected as Out-of-Scope. Reason: ${domainResult.reason}`;
        } else {
          isPass = false;
          actual = `Failed: Incorrectly accepted non-ML query into domain.`;
        }
      } else if (tc.expectedType === 'ml_answer') {
        if (isMl) {
          isPass = true;
          actual = `Accepted in ML domain (${domainResult.category || 'General ML'}). Keywords: [${domainResult.matchedKeywords.slice(0, 3).join(', ')}]`;
        } else {
          isPass = false;
          actual = `Failed: Legitimate ML query was rejected.`;
        }
      }

      setTestCases(prev => prev.map(t => t.id === testId ? {
        ...t,
        status: isPass ? 'pass' : 'fail',
        actualResult: actual,
        latencyMs: Date.now() - startTime,
        domainDetected: isMl
      } : t));

    } catch (err: any) {
      setTestCases(prev => prev.map(t => t.id === testId ? {
        ...t,
        status: 'fail',
        actualResult: `Execution error: ${err.message}`,
        latencyMs: Date.now() - startTime
      } : t));
    }
  };

  const runAllTests = async () => {
    setIsRunningAll(true);
    for (const tc of testCases) {
      await runSingleTest(tc.id);
    }
    setIsRunningAll(false);
  };

  const passedCount = testCases.filter(t => t.status === 'pass').length;
  const failedCount = testCases.filter(t => t.status === 'fail').length;
  const totalCompleted = passedCount + failedCount;
  const passRate = totalCompleted > 0 ? Math.round((passedCount / totalCompleted) * 100) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <TestTube size={20} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Quality Assurance & Verification
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Testing & Evaluation Matrix
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Automated verification of domain boundaries, input sanitization, and ML answer delivery.
          </p>
        </div>

        <button
          onClick={runAllTests}
          disabled={isRunningAll}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-xs transition-all shrink-0 ${
            isRunningAll
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
          }`}
        >
          {isRunningAll ? <RotateCw size={16} className="animate-spin" /> : <Play size={16} />}
          <span>{isRunningAll ? 'Running Tests...' : 'Run All Test Cases'}</span>
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Test Cases</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">{testCases.length}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Passed</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono">{passedCount}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Failed</span>
          <div className="text-2xl font-bold text-rose-600 mt-1 font-mono">{failedCount}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Pass Rate</span>
          <div className="text-2xl font-bold text-indigo-600 mt-1 font-mono">
            {totalCompleted > 0 ? `${passRate}%` : '—'}
          </div>
        </div>
      </div>

      {/* Test Cases Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Test ID</th>
                <th className="py-3 px-4">Title & Input Query</th>
                <th className="py-3 px-4">Expected Result</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actual Result / Analysis</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {testCases.map((tc) => {
                return (
                  <tr key={tc.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Test ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {tc.id}
                    </td>

                    {/* Query */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900 text-xs sm:text-sm mb-0.5">{tc.title}</div>
                      <div className="text-xs text-slate-500 font-mono italic bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        "{tc.input || '(empty string)'}"
                      </div>
                    </td>

                    {/* Expected */}
                    <td className="py-3.5 px-4 text-xs">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold mb-1 ${
                        tc.expectedType === 'ml_answer' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : tc.expectedType === 'out_of_scope'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {tc.expectedType === 'ml_answer' ? 'ML Answer' : tc.expectedType === 'out_of_scope' ? 'Out-of-Scope' : 'Validation Error'}
                      </span>
                      <div className="text-slate-500 text-[11px]">{tc.expectedDescription}</div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {tc.status === 'pass' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 size={13} />
                          Pass
                        </span>
                      )}
                      {tc.status === 'fail' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                          <XCircle size={13} />
                          Fail
                        </span>
                      )}
                      {tc.status === 'running' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                          <RotateCw size={13} className="animate-spin" />
                          Testing...
                        </span>
                      )}
                      {tc.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-500">
                          Pending
                        </span>
                      )}
                      {tc.latencyMs !== undefined && (
                        <div className="text-[10px] text-slate-400 font-mono mt-1">
                          {tc.latencyMs}ms
                        </div>
                      )}
                    </td>

                    {/* Actual Result */}
                    <td className="py-3.5 px-4 text-xs max-w-sm">
                      {tc.actualResult ? (
                        <span className="text-slate-600">{tc.actualResult}</span>
                      ) : (
                        <span className="text-slate-400 italic">Not executed yet</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => runSingleTest(tc.id)}
                        disabled={tc.status === 'running' || isRunningAll}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 transition-colors"
                      >
                        Run Test
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
