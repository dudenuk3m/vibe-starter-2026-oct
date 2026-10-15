import React, { useState } from 'react';

interface HeaderProps {
  currentSection: string;
  onSelectSection: (section: string) => void;
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenLogin: () => void;
  onOpenTodaysPaper: () => void;
  onOpenMarkets: () => void;
  onOpenBookmarks: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onSelectSection,
  onOpenSearch,
  onOpenSubscribe,
  onOpenLogin,
  onOpenTodaysPaper,
  onOpenMarkets,
  onOpenBookmarks,
  savedCount,
}) => {
  const [edition, setEdition] = useState('U.S.');

  const sections = [
    { id: 'front-page', label: 'Front Page' },
    { id: 'us', label: 'U.S.' },
    { id: 'world', label: 'World' },
    { id: 'business', label: 'Business' },
    { id: 'arts', label: 'Arts' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'opinion', label: 'Opinion' },
    { id: 'video', label: 'Video' },
    { id: 'shows', label: 'Shows' },
    { id: 'games', label: 'Games' },
    { id: 'cooking', label: 'Cooking' },
    { id: 'wirecutter', label: 'Wirecutter' },
    { id: 'the-athletic', label: 'The Athletic' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-canvas-white border-b border-rule-hairline shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1280px] mx-auto px-gutter-desktop flex flex-col justify-between pt-space-xs pb-space-xs">
        {/* Top Tier: Search, Editions, Sub/Login CTAs */}
        <div className="flex items-center justify-between border-b border-rule-hairline pb-space-xs">
          <div className="flex items-center gap-space-md">
            <button
              onClick={onOpenSearch}
              aria-label="Search articles"
              className="flex items-center gap-1.5 text-on-surface hover:text-action-blue transition-colors px-1 py-0.5 rounded cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span className="hidden sm:inline font-label-metadata text-xs text-text-muted">SEARCH</span>
            </button>
            <div className="hidden sm:flex items-center gap-space-xs font-label-metadata text-label-metadata text-text-muted">
              {['U.S.', 'INTERNATIONAL', 'CANADA', 'ESPAÑOL', '中文'].map((ed, idx) => (
                <React.Fragment key={ed}>
                  {idx > 0 && <span>|</span>}
                  <button
                    onClick={() => setEdition(ed)}
                    className={`hover:text-on-surface cursor-pointer uppercase transition-colors ${
                      edition === ed ? 'text-on-surface font-bold underline underline-offset-2' : ''
                    }`}
                    type="button"
                  >
                    {ed}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <button
              onClick={onOpenSubscribe}
              className="bg-action-blue hover:bg-[#446277] active:scale-[0.98] text-on-primary font-label-badge text-label-badge uppercase px-space-md py-[7px] transition-all cursor-pointer shadow-xs"
              type="button"
            >
              Subscribe for $1/week
            </button>
            <button
              onClick={onOpenLogin}
              className="bg-transparent border border-rule-heavy text-on-surface font-label-badge text-label-badge uppercase px-space-md py-[6px] hover:bg-surface-container-high active:scale-[0.98] transition-all cursor-pointer"
              type="button"
            >
              Log In
            </button>
            <button
              onClick={onOpenBookmarks}
              title="Saved Articles"
              className="relative w-8 h-8 rounded-full bg-primary hover:bg-[#2b2b2b] text-on-primary flex items-center justify-center shrink-0 cursor-pointer transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">bookmark</span>
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-breaking-red text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Center Masthead Tier */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center py-space-xs gap-2">
          {/* Left: Date & Today's Paper */}
          <div className="hidden md:flex items-center gap-space-sm font-label-metadata text-label-metadata text-text-muted">
            <span className="whitespace-nowrap">Wednesday, October 14, 2026</span>
            <span>•</span>
            <button
              onClick={onOpenTodaysPaper}
              className="font-label-metadata text-label-metadata text-on-surface underline hover:text-action-blue cursor-pointer"
              type="button"
            >
              Today's Paper
            </button>
          </div>

          {/* Center: Iconic NYT Gothic Masthead */}
          <div className="text-center">
            <button
              onClick={() => onSelectSection('front-page')}
              className="inline-block font-masthead-gothic text-[36px] sm:text-[44px] leading-none tracking-tight text-primary hover:opacity-90 cursor-pointer transition-opacity"
              type="button"
            >
              The New York Times
            </button>
          </div>

          {/* Right: Weather & Markets */}
          <div className="hidden md:flex items-center justify-end gap-space-sm font-label-metadata text-label-metadata text-text-muted">
            <button
              onClick={onOpenMarkets}
              className="flex items-center gap-1 hover:text-on-surface cursor-pointer transition-colors"
              type="button"
              title="View Weather & Financial Markets"
            >
              <span className="material-symbols-outlined text-[15px] text-amber-500">partly_cloudy_day</span>
              <span className="font-semibold text-on-surface">68°F</span>
              <span>•</span>
              <span className="text-breaking-red font-bold animate-pulse">LIVE</span>
              <span className="text-emerald-700 font-semibold">Markets +0.42%</span>
            </button>
          </div>
        </div>

        {/* Section Navigation Tier */}
        <div className="border-t border-b border-rule-hairline py-[5px] overflow-x-auto scrollbar-none">
          <nav className="flex items-center justify-between min-w-[760px] sm:min-w-0 font-label-nav text-label-nav gap-2">
            {sections.map((sec, idx) => {
              const isActive = currentSection === sec.id;
              return (
                <React.Fragment key={sec.id}>
                  {idx > 0 && <span className="text-rule-hairline select-none">|</span>}
                  <button
                    onClick={() => onSelectSection(sec.id)}
                    className={`transition-colors py-[2px] whitespace-nowrap cursor-pointer uppercase ${
                      isActive
                        ? 'text-primary font-bold border-b-2 border-rule-heavy'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    {sec.label}
                  </button>
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
