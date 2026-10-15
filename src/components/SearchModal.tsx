import React, { useState, useMemo } from 'react';
import { Article } from '../data/nytData';

interface SearchModalProps {
  articles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  articles,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return articles.slice(0, 6);
    const q = query.toLowerCase();
    return articles.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [articles, query]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 pt-12 md:pt-20 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[650px] rounded shadow-2xl border border-rule-hairline overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-rule-hairline flex items-center gap-3">
          <span className="material-symbols-outlined text-text-muted text-[22px]">search</span>
          <input
            type="text"
            placeholder="Search news, opinion, culture, topics..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base font-serif placeholder:font-sans placeholder:text-text-muted focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-text-muted hover:text-primary text-xs font-sans font-bold uppercase px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-text-muted hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-rule-hairline">
          <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-text-muted mb-2">
            {query.trim() ? `Search Results (${filtered.length})` : 'Recent Headlines'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-text-muted font-serif">
              No matching articles found for “{query}”.
            </div>
          ) : (
            filtered.map(art => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="py-3 px-2 hover:bg-surface-container-low transition-colors cursor-pointer rounded"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-action-blue">
                    {art.category}
                  </span>
                  <span className="text-text-muted">•</span>
                  <span className="text-xs font-sans text-text-muted">{art.date}</span>
                </div>
                <h4 className="font-serif font-bold text-base text-primary hover:text-action-blue leading-snug">
                  {art.title}
                </h4>
                <p className="font-sans text-xs text-on-surface-variant line-clamp-1 mt-1">
                  {art.summary}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
