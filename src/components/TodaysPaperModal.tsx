import React from 'react';
import { Article } from '../data/nytData';

interface TodaysPaperModalProps {
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const TodaysPaperModal: React.FC<TodaysPaperModalProps> = ({
  onClose,
  articles,
  onSelectArticle,
}) => {
  const sections = [
    { name: 'Section A: Front Page & National', filter: ['U.S.', 'White House', 'Midterms 2026'] },
    { name: 'Section B: International & Diplomacy', filter: ['World', 'Russia-Ukraine War'] },
    { name: 'Section C: Business & Technology', filter: ['Business', 'Financial Wire', 'Artificial Intelligence', 'Wildfire Response'] },
    { name: 'Section D: Arts, Culture & Dining', filter: ['Arts', 'New York & Living', 'The Athletic', 'Cooking'] },
    { name: 'Section E: Editorial & Columnists', filter: ['Opinion'] },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-3 md:p-6 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[850px] rounded shadow-2xl border border-rule-hairline p-6 md:p-10 my-auto">
        <div className="flex items-center justify-between border-b-2 border-rule-heavy pb-4 mb-6">
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-action-blue block">
              Digital Replica & Directory
            </span>
            <h2 className="font-serif text-3xl font-bold text-primary">Today’s Paper</h2>
            <span className="font-serif italic text-sm text-text-muted">Wednesday, October 14, 2026 • Vol. CLXXV No. 60,342</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-6">
          {sections.map((sec, idx) => {
            const secArticles = articles.filter(a => sec.filter.includes(a.category));
            if (secArticles.length === 0) return null;

            return (
              <div key={idx} className="pb-6 border-b border-rule-hairline last:border-0">
                <h3 className="font-sans text-xs font-extrabold uppercase tracking-widest text-primary mb-3 bg-surface-container-low px-3 py-1.5 border-l-2 border-primary">
                  {sec.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {secArticles.map(art => (
                    <div
                      key={art.id}
                      onClick={() => {
                        onSelectArticle(art);
                        onClose();
                      }}
                      className="p-3 border border-rule-hairline rounded hover:border-action-blue hover:bg-surface-bright cursor-pointer transition-colors"
                    >
                      <span className="text-[10px] font-sans font-bold uppercase text-text-muted block mb-1">
                        {art.category} • {art.readTime}
                      </span>
                      <h4 className="font-serif font-bold text-base text-primary hover:text-action-blue leading-snug">
                        {art.title}
                      </h4>
                      <p className="font-sans text-xs text-text-muted line-clamp-2 mt-1">
                        {art.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
