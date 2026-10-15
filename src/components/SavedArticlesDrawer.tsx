import React from 'react';
import { Article } from '../data/nytData';

interface SavedArticlesDrawerProps {
  savedArticles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  savedArticles,
  onClose,
  onSelectArticle,
  onRemoveBookmark,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[420px] h-full shadow-2xl border-l border-rule-hairline flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-rule-hairline flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-action-blue">bookmark</span>
            <h3 className="font-serif text-lg font-bold text-primary">Saved for Later</h3>
            <span className="text-xs font-sans text-text-muted">({savedArticles.length})</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-text-muted hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-rule-hairline">
          {savedArticles.length === 0 ? (
            <div className="py-12 text-center text-text-muted font-serif">
              <span className="material-symbols-outlined text-4xl text-stone-300 block mb-2">bookmark_border</span>
              <p className="text-sm">No saved articles yet.</p>
              <p className="text-xs font-sans text-text-muted mt-1">
                Click the bookmark icon on any article to save it here for later offline reading.
              </p>
            </div>
          ) : (
            savedArticles.map(article => (
              <div key={article.id} className="py-3 group flex items-start justify-between gap-3">
                <div
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer"
                >
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-action-blue block mb-0.5">
                    {article.category}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-primary group-hover:text-action-blue leading-snug">
                    {article.title}
                  </h4>
                  <span className="text-[11px] font-sans text-text-muted mt-1 block">
                    {article.author} • {article.readTime}
                  </span>
                </div>

                <button
                  onClick={() => onRemoveBookmark(article.id)}
                  title="Remove from saved"
                  className="text-stone-300 hover:text-breaking-red p-1 cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
