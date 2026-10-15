import React from 'react';

interface FooterProps {
  onSelectSection: (section: string) => void;
  onOpenSubscribe: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectSection, onOpenSubscribe }) => {
  return (
    <footer className="w-full bg-canvas-white border-t-2 border-rule-heavy mt-space-xl pt-space-lg pb-space-xl">
      <div className="max-w-[1280px] mx-auto px-gutter-desktop">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-space-md border-b border-rule-hairline gap-4">
          <button
            onClick={() => onSelectSection('front-page')}
            className="font-masthead-gothic text-headline-primary text-primary hover:opacity-90 cursor-pointer"
          >
            The New York Times
          </button>
          <div className="flex flex-wrap items-center gap-space-lg font-label-metadata text-label-metadata text-text-muted">
            <button
              onClick={() => onSelectSection('front-page')}
              className="hover:text-on-surface cursor-pointer"
            >
              News
            </button>
            <button
              onClick={() => onSelectSection('opinion')}
              className="hover:text-on-surface cursor-pointer"
            >
              Opinion
            </button>
            <button
              onClick={() => onSelectSection('arts')}
              className="hover:text-on-surface cursor-pointer"
            >
              Arts
            </button>
            <button
              onClick={() => onSelectSection('lifestyle')}
              className="hover:text-on-surface cursor-pointer"
            >
              Living
            </button>
            <button
              onClick={() => onSelectSection('games')}
              className="hover:text-on-surface cursor-pointer"
            >
              Games
            </button>
            <button
              onClick={() => onSelectSection('wirecutter')}
              className="hover:text-on-surface cursor-pointer"
            >
              Wirecutter
            </button>
            <button
              onClick={onOpenSubscribe}
              className="hover:text-on-surface cursor-pointer text-action-blue font-bold"
            >
              Subscriptions
            </button>
          </div>
        </div>

        <div className="pt-space-md flex flex-wrap items-center justify-between font-label-metadata text-label-metadata text-text-muted gap-space-sm text-xs">
          <div>© 2026 The New York Times Company. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-space-md">
            <span className="hover:text-on-surface cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-on-surface cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-on-surface cursor-pointer">Subscription Terms</span>
            <span>•</span>
            <span className="hover:text-on-surface cursor-pointer">Site Map</span>
            <span>•</span>
            <span className="hover:text-on-surface cursor-pointer">Help</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
