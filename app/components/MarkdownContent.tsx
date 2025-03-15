'use client';
import { useEffect, useRef } from 'react';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Function to add target="_blank" rel="noreferrer" to all links
  useEffect(() => {
    if (contentRef.current) {
      const links = contentRef.current.querySelectorAll('a');
      links.forEach(link => {
        // Skip anchor links (links that start with #)
        if (!link.getAttribute('href')?.startsWith('#')) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noreferrer');
        }
      });
    }
  }, [content]); // Re-run when content changes

  return (
    <div className="markdown-content">
      <style jsx global>{`
        .markdown-content {
          color: white;
          line-height: 1.6;
          font-size: 1.125rem;
        }

        .markdown-content h1 {
          font-size: 2.5rem;
          margin-top: 2rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .markdown-content h2 {
          font-size: 2rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .markdown-content h3 {
          font-size: 1.5rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .markdown-content p {
          margin-bottom: 1.25rem;
        }

        .markdown-content a {
          color: #818cf8;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .markdown-content a:hover {
          color: #93c5fd;
        }

        .markdown-content strong {
          font-weight: 700;
          color: white;
        }

        .markdown-content em {
          font-style: italic;
        }

        .markdown-content blockquote {
          border-left: 4px solid #f59e0b;
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 1.5rem;
          font-style: italic;
          color: #d1d5db;
        }

        .markdown-content ul {
          list-style-type: disc;
          margin-left: 2rem;
          margin-bottom: 1.5rem;
        }

        .markdown-content ol {
          list-style-type: decimal;
          margin-left: 2rem;
          margin-bottom: 1.5rem;
        }

        .markdown-content li {
          margin-bottom: 0.5rem;
        }

        .markdown-content code {
          background-color: rgba(0, 0, 0, 0.2);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.875em;
        }

        .markdown-content pre {
          background-color: #1e1e1e;
          border-radius: 0.375rem;
          padding: 1rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }

        .markdown-content pre code {
          background-color: transparent;
          padding: 0;
          font-size: 0.9em;
          color: #e5e7eb;
          line-height: 1.5;
        }

        .markdown-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
          margin: 1.5rem 0;
        }

        .markdown-content hr {
          border: 0;
          height: 1px;
          background-color: #4b5563;
          margin: 2rem 0;
        }

        /* Enhanced table styling */
        .markdown-content table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: separate;
          border-spacing: 0;
          overflow-x: auto;
          display: block;
        }

        @media (min-width: 768px) {
          .markdown-content table {
            display: table;
            width: 100%;
          }
        }

        .markdown-content table thead {
          background-color: rgba(30, 58, 138, 0.2);
        }

        .markdown-content table th {
          color: white;
          font-weight: 600;
          text-align: left;
          padding: 0.75rem 1rem;
          border: 1px solid #374151;
        }

        .markdown-content table td {
          padding: 0.75rem 1rem;
          border: 1px solid #374151;
          vertical-align: top;
        }

        .markdown-content table tr:nth-child(even) {
          background-color: rgba(255, 255, 255, 0.025);
        }

        .markdown-content table a {
          color: #93c5fd;
        }
      `}</style>

      {/* Use ref to access the DOM and modify links */}
      <div 
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
} 