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
  theme: 'paper' | 'sepia' | 'dark';
  onChangeTheme: (theme: 'paper' | 'sepia' | 'dark') => void;
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
  theme,
  onChangeTheme,
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
    <header className="fixed top-0 left-0 right-0 z-40 bg-canvas-white border-b border-rule-hairline shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-colors">
      <div className="max-w-[1280px] mx-auto px-gutter-desktop flex flex-col justify-between pt-space-xs pb-space-xs">
        {/* Top Tier: Search, Editions, Reading Theme Switcher, Sub/Login CTAs */}
        <div className="flex items-center justify-between border-b border-rule-hairline pb-space-xs gap-2">
          {/* Left: Search & Editions */}
          <div className="flex items-center gap-space-md">
            <button
              onClick={onOpenSearch}
              aria-label="Search articles"
              className="flex items-center gap-1.5 text-on-surface hover:text-action-blue transition-colors px-1.5 py-1 rounded cursor-pointer border border-transparent hover:border-rule-hairline"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span className="hidden sm:inline font-label-metadata text-xs text-text-muted">SEARCH</span>
              <span className="hidden lg:inline text-[9px] bg-stone-100 text-stone-500 font-mono px-1 rounded border border-stone-200">/</span>
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

          {/* Right: Theme Toggles & Account actions */}
          <div className="flex items-center gap-2 sm:gap-space-md">
            {/* Reading Mode Selector (Classic / Sepia / Dark) */}
            <div className="flex items-center border border-rule-hairline rounded bg-surface-container-low p-0.5 text-[10px] font-sans">
              <button
                onClick={() => onChangeTheme('paper')}
                title="Paper Mode"
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-semibold ${
                  theme === 'paper' ? 'bg-white text-stone-900 shadow-xs' : 'text-text-muted hover:text-primary'
                }`}
              >
                Paper
              </button>
              <button
                onClick={() => onChangeTheme('sepia')}
                title="Warm Sepia Newsprint"
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-semibold ${
                  theme === 'sepia' ? 'bg-[#f7f4ee] text-stone-900 shadow-xs' : 'text-text-muted hover:text-primary'
                }`}
              >
                Warm
              </button>
              <button
                onClick={() => onChangeTheme('dark')}
                title="Night Edition"
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-semibold ${
                  theme === 'dark' ? 'bg-stone-900 text-white shadow-xs' : 'text-text-muted hover:text-primary'
                }`}
              >
                Dark
              </button>
            </div>

            <button
              onClick={onOpenSubscribe}
              className="bg-action-blue hover:bg-[#446277] active:scale-[0.98] text-on-primary font-label-badge text-label-badge uppercase px-space-md py-[7px] transition-all cursor-pointer shadow-xs whitespace-nowrap"
              type="button"
            >
              Subscribe for $1/week
            </button>

            <button
              onClick={onOpenLogin}
              className="hidden sm:inline-block bg-transparent border border-rule-heavy text-on-surface font-label-badge text-label-badge uppercase px-space-md py-[6px] hover:bg-surface-container-high active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              type="button"
            >
              Log In
            </button>

            <button
              onClick={onOpenBookmarks}
              title="Saved Articles / Reading List"
              className="relative w-8 h-8 rounded-full bg-primary hover:bg-[#2b2b2b] text-on-primary flex items-center justify-center shrink-0 cursor-pointer transition-colors shadow-xs"
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
          {/* Left: Date & Motto & Today's Paper */}
          <div className="hidden md:flex flex-col gap-0.5">
            <div className="flex items-center gap-space-sm font-label-metadata text-label-metadata text-text-muted">
              <span className="whitespace-nowrap font-medium text-on-surface">Wednesday, October 14, 2026</span>
              <span>•</span>
              <button
                onClick={onOpenTodaysPaper}
                className="font-label-metadata text-label-metadata text-on-surface underline hover:text-action-blue cursor-pointer"
                type="button"
              >
                Today's Paper
              </button>
            </div>
            <span className="font-serif italic text-[11px] text-text-muted">
              “All the News That’s Fit to Print”
            </span>
          </div>

          {/* Center: Iconic NYT Gothic Masthead */}
          <div className="text-center">
            <button
              onClick={() => onSelectSection('front-page')}
              className="inline-block font-masthead-gothic text-[36px] sm:text-[46px] leading-none tracking-tight text-primary hover:opacity-90 cursor-pointer transition-opacity"
              type="button"
            >
              The New York Times
            </button>
          </div>

          {/* Right: Weather & Markets with interactive details */}
          <div className="hidden md:flex flex-col items-end gap-0.5">
            <button
              onClick={onOpenMarkets}
              className="flex items-center gap-space-sm font-label-metadata text-label-metadata text-text-muted hover:text-on-surface cursor-pointer transition-colors"
              type="button"
              title="Click to view live market indices and weather"
            >
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-amber-500">partly_cloudy_day</span>
                <span className="font-semibold text-on-surface">68°F</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span className="text-breaking-red font-bold text-[10px] animate-pulse">LIVE</span>
                <span className="text-emerald-700 font-semibold font-mono">Markets +0.42%</span>
              </div>
            </button>
            <span className="text-[10px] font-sans text-text-muted">
              Vol. CLXXV No. 60,342
            </span>
          </div>
        </div>

        {/* Section Navigation Tier */}
        <div className="border-t border-b border-rule-hairline py-[5px] overflow-x-auto scrollbar-none">
          <nav className="flex items-center justify-between min-w-[780px] sm:min-w-0 font-label-nav text-label-nav gap-2">
            {sections.map((sec, idx) => {
              const isActive = currentSection === sec.id;
              return (
                <React.Fragment key={sec.id}>
                  {idx > 0 && <span className="text-rule-hairline select-none">|</span>}
                  <button
                    onClick={() => onSelectSection(sec.id)}
                    className={`transition-all py-[2px] whitespace-nowrap cursor-pointer uppercase ${
                      isActive
                        ? 'text-primary font-extrabold border-b-2 border-rule-heavy'
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
