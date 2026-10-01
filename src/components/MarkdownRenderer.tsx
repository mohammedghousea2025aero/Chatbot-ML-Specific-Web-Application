import React from 'react';
import { marked } from 'marked';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Parse marked HTML safely
  const rawHtml = React.useMemo(() => {
    try {
      return marked.parse(content, { gfm: true, breaks: true }) as string;
    } catch {
      return content;
    }
  }, [content]);

  // If content contains code blocks or formulas, render with clean styling
  return (
    <div className="prose prose-slate max-w-none text-slate-800 text-[15px] leading-relaxed break-words
      [&>p]:mb-3.5 [&>p:last-child]:mb-0
      [&>h1]:text-xl [&>h1]:font-bold [&>h1]:text-slate-900 [&>h1]:mt-5 [&>h1]:mb-3
      [&>h2]:text-lg [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:mt-4 [&>h2]:mb-2.5
      [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-slate-900 [&>h3]:mt-3 [&>h3]:mb-2
      [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ul]:mb-3.5
      [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>ol]:mb-3.5
      [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-400 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>blockquote]:my-3
      [&>table]:w-full [&>table]:border-collapse [&>table]:my-4 [&>table]:text-sm
      [&>table_th]:border [&>table_th]:border-slate-200 [&>table_th]:bg-slate-100 [&>table_th]:px-3 [&>table_th]:py-2 [&>table_th]:text-left [&>table_th]:font-semibold
      [&>table_td]:border [&>table_td]:border-slate-200 [&>table_td]:px-3 [&>table_td]:py-2
      [&>pre]:bg-slate-900 [&>pre]:text-slate-100 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:font-mono [&>pre]:text-xs [&>pre]:my-3.5 [&>pre]:shadow-sm
      [&_code]:font-mono [&_code]:text-[13px] [&_code]:bg-slate-100 [&_code]:text-indigo-700 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&>pre_code]:bg-transparent [&>pre_code]:text-slate-100 [&>pre_code]:p-0
      [&_hr]:border-slate-200 [&_hr]:my-4">
      <div 
        dangerouslySetInnerHTML={{ __html: rawHtml }} 
      />
    </div>
  );
};
