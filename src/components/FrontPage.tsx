import React from 'react';
import {
  LEAD_ARTICLE,
  GUILFOYLE_ARTICLE,
  SIDEBAR_ARTICLES,
  TECH_ARTICLES,
  MID_COLUMN_ARTICLES,
  ELECTION_DISPATCHES,
  OPINION_ESSAYS,
  CULTURE_ARTICLES,
  RECIPES,
  WIRECUTTER_REVIEWS,
  Article,
  Recipe,
  WirecutterReview,
} from '../data/nytData';

interface FrontPageProps {
  currentSection: string;
  onSelectArticle: (article: Article) => void;
  onOpenWordle: () => void;
  onOpenConnections: () => void;
  onOpenSpellingBee: () => void;
  onOpenMiniCrossword: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onSelectReview: (review: WirecutterReview) => void;
  onOpenConfidentialTip: () => void;
  onOpenPolls: () => void;
  onOpenSubscribe: () => void;
  onSelectSection: (section: string) => void;
}

export const FrontPage: React.FC<FrontPageProps> = ({
  currentSection,
  onSelectArticle,
  onOpenWordle,
  onOpenConnections,
  onOpenSpellingBee,
  onOpenMiniCrossword,
  onSelectRecipe,
  onSelectReview,
  onOpenConfidentialTip,
  onOpenPolls,
  onOpenSubscribe,
  onSelectSection,
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Free to Read Sub-Bar / Alert Notice */}
      <div className="w-full bg-opinion-cream py-space-xs px-gutter-desktop border-b border-rule-hairline">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between text-label-nav font-label-nav">
          <div className="flex items-center gap-space-sm text-on-surface">
            <span className="w-2 h-2 rounded-full bg-breaking-red animate-pulse"></span>
            <span>
              These top stories are{' '}
              <strong
                onClick={onOpenSubscribe}
                className="font-bold underline cursor-pointer hover:text-action-blue"
              >
                free to read
              </strong>{' '}
              with an account.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-space-md text-text-muted text-label-metadata font-label-metadata">
            <button
              onClick={onOpenPolls}
              className="hover:text-on-surface cursor-pointer transition-colors"
            >
              Midterm Updates
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectArticle(LEAD_ARTICLE)}
              className="hover:text-on-surface cursor-pointer transition-colors"
            >
              Supreme Court Docket
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectArticle(TECH_ARTICLES[2])}
              className="hover:text-on-surface cursor-pointer transition-colors"
            >
              Climate Monitor
            </button>
          </div>
        </div>
      </div>

      {/* Section Filter Indicator banner if filtered */}
      {currentSection !== 'front-page' && (
        <div className="w-full bg-surface-container-low border-b border-rule-hairline py-2 px-gutter-desktop">
          <div className="max-w-[1280px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-sans uppercase tracking-widest text-primary">
                Section: {currentSection.replace('-', ' ').toUpperCase()}
              </span>
              <span className="text-xs text-text-muted font-sans">• Showing curated dispatches</span>
            </div>
            <button
              onClick={() => onSelectSection('front-page')}
              className="text-xs font-sans font-bold text-action-blue hover:underline cursor-pointer"
            >
              ← Back to Complete Front Page
            </button>
          </div>
        </div>
      )}

      {/* Broadsheet Main Container (1280px max) */}
      <div className="w-full max-w-[1280px] mx-auto px-gutter-desktop pb-space-xl">
        {/* Primary Editorial Grid: 3-column architecture (Lead News, Developing Beat, Opinion/Culture) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop pt-space-md">
          {/* ================= LEFT & CENTER LEAD PACKAGE (Columns 1 to 7) ================= */}
          <section className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* Main Breaking News Headline Package */}
            <article className="flex flex-col gap-space-sm pb-space-md border-b border-rule-hairline">
              <div className="flex items-center gap-space-xs">
                <span className="bg-breaking-red text-on-primary font-label-badge text-label-badge uppercase px-space-xs py-[2px] tracking-wider">
                  {LEAD_ARTICLE.kicker}
                </span>
                <span className="text-text-muted font-label-metadata text-label-metadata">
                  Washington Bureau
                </span>
              </div>
              <h1
                onClick={() => onSelectArticle(LEAD_ARTICLE)}
                className="font-headline-lead text-headline-lead text-primary hover:text-action-blue cursor-pointer transition-colors"
              >
                {LEAD_ARTICLE.title}
              </h1>
              <p className="font-body-lead text-body-lead text-on-surface leading-snug">
                {LEAD_ARTICLE.summary}
              </p>
              <div className="flex items-center gap-space-sm text-text-muted font-label-metadata text-label-metadata pt-space-xs">
                <span className="text-on-surface font-semibold">{LEAD_ARTICLE.author}</span>
                <span>•</span>
                <span>{LEAD_ARTICLE.readTime}</span>
                <span>•</span>
                <button
                  onClick={() => onSelectArticle(LEAD_ARTICLE)}
                  className="flex items-center gap-1 hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">chat_bubble</span>{' '}
                  {LEAD_ARTICLE.commentsCount}
                </button>
              </div>
            </article>

            {/* Two Column Sub-Package Under Lead: Main Photo + Companion Sidebar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop">
              {/* Editorial Photo & Kimberly Guilfoyle teaser (MD col 7) */}
              <div className="md:col-span-7 flex flex-col gap-space-xs">
                <div
                  onClick={() => onSelectArticle(GUILFOYLE_ARTICLE)}
                  className="relative overflow-hidden bg-surface-container cursor-pointer group"
                >
                  <img
                    className="w-full h-72 object-cover object-top group-hover:scale-[1.01] transition-transform duration-300"
                    src={GUILFOYLE_ARTICLE.imageUrl}
                    alt={GUILFOYLE_ARTICLE.imageCaption}
                  />
                  <span className="absolute bottom-1 right-1 bg-primary/70 text-on-primary text-[9px] font-label-metadata px-1 uppercase">
                    {GUILFOYLE_ARTICLE.imageCredit}
                  </span>
                </div>
                <article className="pt-space-xs">
                  <h2
                    onClick={() => onSelectArticle(GUILFOYLE_ARTICLE)}
                    className="font-headline-secondary text-headline-secondary text-primary hover:text-action-blue cursor-pointer"
                  >
                    {GUILFOYLE_ARTICLE.title}
                  </h2>
                  <p className="font-body-summary text-body-summary text-on-surface-variant mt-space-xs">
                    {GUILFOYLE_ARTICLE.summary}
                  </p>
                  <div className="flex items-center gap-space-sm text-text-muted font-label-metadata text-label-metadata mt-space-xs">
                    <span>{GUILFOYLE_ARTICLE.author}</span>
                    <span>•</span>
                    <span>{GUILFOYLE_ARTICLE.readTime}</span>
                  </div>
                </article>
              </div>

              {/* Secondary Companion Wire (MD col 5) */}
              <div className="md:col-span-5 flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-xs">
                <article className="flex flex-col gap-space-xs">
                  <span className="font-label-badge text-label-badge text-action-blue uppercase tracking-widest">
                    {SIDEBAR_ARTICLES[0].kicker}
                  </span>
                  <h3
                    onClick={() => onSelectArticle(SIDEBAR_ARTICLES[0])}
                    className="font-headline-secondary text-headline-secondary text-primary hover:text-action-blue cursor-pointer"
                  >
                    {SIDEBAR_ARTICLES[0].title}
                  </h3>
                  <p className="font-body-summary text-body-summary text-on-surface-variant">
                    {SIDEBAR_ARTICLES[0].summary}
                  </p>
                  <div className="flex items-center gap-space-sm text-text-muted font-label-metadata text-label-metadata mt-space-xs">
                    <span>{SIDEBAR_ARTICLES[0].readTime}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">mode_comment</span>{' '}
                      {SIDEBAR_ARTICLES[0].commentsCount}
                    </span>
                  </div>
                </article>

                <div className="w-full h-8 bg-surface-container flex items-center justify-between px-space-sm rounded-xs">
                  <span className="font-label-metadata text-label-metadata text-text-muted uppercase tracking-wider">
                    Confidential Tip
                  </span>
                  <button
                    onClick={onOpenConfidentialTip}
                    className="font-label-metadata text-label-metadata text-action-blue font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Got a Tip? ›
                  </button>
                </div>

                <article className="flex flex-col gap-space-xs pt-space-xs">
                  <span className="font-label-badge text-label-badge text-breaking-red uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-breaking-red"></span>{' '}
                    {SIDEBAR_ARTICLES[1].kicker}
                  </span>
                  <h4
                    onClick={() => onSelectArticle(SIDEBAR_ARTICLES[1])}
                    className="font-headline-tertiary text-headline-tertiary text-primary hover:text-action-blue cursor-pointer"
                  >
                    {SIDEBAR_ARTICLES[1].title}
                  </h4>
                  <p className="font-body-summary text-body-summary text-on-surface-variant">
                    {SIDEBAR_ARTICLES[1].summary}
                  </p>
                </article>
              </div>
            </div>

            {/* Section: Artificial Intelligence & Tech Focus */}
            <div className="mt-space-md p-space-md bg-surface-container-lowest border-t border-rule-hairline">
              <div className="flex items-center justify-between mb-space-sm">
                <h3 className="font-label-section-header text-label-section-header uppercase tracking-wider text-primary">
                  Artificial Intelligence
                </h3>
                <button
                  onClick={() => onSelectSection('business')}
                  className="font-label-metadata text-label-metadata text-action-blue cursor-pointer hover:underline"
                >
                  More in Tech ›
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <article className="flex flex-col gap-space-xs">
                  <h4
                    onClick={() => onSelectArticle(TECH_ARTICLES[0])}
                    className="font-headline-primary text-headline-primary text-primary hover:text-action-blue cursor-pointer"
                  >
                    {TECH_ARTICLES[0].title}
                  </h4>
                  <p className="font-body-summary text-body-summary text-on-surface-variant">
                    {TECH_ARTICLES[0].summary}
                  </p>
                  <span className="text-text-muted font-label-metadata text-label-metadata">
                    {TECH_ARTICLES[0].author} • {TECH_ARTICLES[0].readTime}
                  </span>
                </article>

                <div className="flex flex-col gap-space-sm">
                  <article
                    onClick={() => onSelectArticle(TECH_ARTICLES[1])}
                    className="flex flex-col gap-1 p-space-xs hover:bg-surface-container-high transition-colors cursor-pointer rounded-xs"
                  >
                    <span className="font-label-badge text-label-badge text-text-muted uppercase">
                      {TECH_ARTICLES[1].kicker}
                    </span>
                    <h5 className="font-headline-tertiary text-headline-tertiary text-primary hover:text-action-blue">
                      {TECH_ARTICLES[1].title}
                    </h5>
                    <span className="text-text-muted font-label-metadata text-label-metadata">
                      {TECH_ARTICLES[1].readTime}
                    </span>
                  </article>

                  <article
                    onClick={() => onSelectArticle(TECH_ARTICLES[2])}
                    className="flex flex-col gap-1 p-space-xs hover:bg-surface-container-high transition-colors cursor-pointer rounded-xs"
                  >
                    <span className="font-label-badge text-label-badge text-text-muted uppercase">
                      {TECH_ARTICLES[2].kicker}
                    </span>
                    <h5 className="font-headline-tertiary text-headline-tertiary text-primary hover:text-action-blue">
                      {TECH_ARTICLES[2].title}
                    </h5>
                    <span className="text-text-muted font-label-metadata text-label-metadata">
                      {TECH_ARTICLES[2].readTime}
                    </span>
                  </article>
                </div>
              </div>
            </div>
          </section>

          {/* ================= MID COLUMN: RUSSIA-UKRAINE & MIDTERMS (Columns 8 to 9) ================= */}
          <section className="lg:col-span-2 flex flex-col gap-space-md bg-surface-container-low p-space-sm rounded-xs">
            {/* Russia-Ukraine War Package */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between pb-space-xs">
                <span className="font-label-badge text-label-badge uppercase tracking-wider text-breaking-red font-bold">
                  Russia-Ukraine War
                </span>
                <span className="w-2 h-2 rounded-full bg-breaking-red"></span>
              </div>
              <article className="flex flex-col gap-space-xs">
                <h3
                  onClick={() => onSelectArticle(MID_COLUMN_ARTICLES[0])}
                  className="font-headline-secondary text-headline-secondary text-primary hover:text-action-blue cursor-pointer"
                >
                  {MID_COLUMN_ARTICLES[0].title}
                </h3>
                <p className="font-body-summary text-body-summary text-on-surface-variant">
                  {MID_COLUMN_ARTICLES[0].summary}
                </p>
                <div className="flex items-center gap-space-sm text-text-muted font-label-metadata text-label-metadata">
                  <span>{MID_COLUMN_ARTICLES[0].author.split(' and ')[0]}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">forum</span> 1.1k
                  </span>
                </div>
              </article>

              <article
                onClick={() => onSelectArticle(MID_COLUMN_ARTICLES[1])}
                className="flex flex-col gap-space-xs pt-space-xs cursor-pointer group"
              >
                <h4 className="font-headline-tertiary text-headline-tertiary text-primary group-hover:text-action-blue">
                  {MID_COLUMN_ARTICLES[1].title}
                </h4>
                <span className="text-text-muted font-label-metadata text-label-metadata">
                  {MID_COLUMN_ARTICLES[1].readTime}
                </span>
              </article>

              <article
                onClick={() => onSelectArticle(MID_COLUMN_ARTICLES[2])}
                className="flex flex-col gap-space-xs pt-space-xs cursor-pointer group"
              >
                <h4 className="font-headline-tertiary text-headline-tertiary text-primary group-hover:text-action-blue">
                  {MID_COLUMN_ARTICLES[2].title}
                </h4>
                <span className="text-text-muted font-label-metadata text-label-metadata">
                  {MID_COLUMN_ARTICLES[2].readTime}
                </span>
              </article>
            </div>

            {/* The Evening Briefing Box */}
            <div
              onClick={() => onSelectArticle(LEAD_ARTICLE)}
              className="p-space-sm bg-surface-container flex flex-col gap-space-xs cursor-pointer hover:bg-surface-container-high transition-colors rounded-xs"
            >
              <span className="font-label-badge text-label-badge uppercase text-primary font-bold">
                The Evening Briefing
              </span>
              <h4 className="font-headline-tertiary text-headline-tertiary text-primary hover:underline">
                Catch Up on Today’s Biggest Stories
              </h4>
              <p className="font-body-summary text-body-summary text-on-surface-variant">
                Energy prices lift inflation, Ukraine grows vulnerable and the Texas Senate race tightens.
              </p>
              <span className="font-label-metadata text-label-metadata text-text-muted">
                5 min read • By NYT Staff
              </span>
            </div>

            {/* Election Dispatches Tracker Module */}
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <div className="flex items-center justify-between pb-space-xs">
                <span className="font-label-badge text-label-badge uppercase tracking-wider text-action-blue font-bold">
                  Election Dispatches
                </span>
                <span className="text-[10px] font-label-metadata text-text-muted">Midterms</span>
              </div>
              <article className="flex flex-col gap-space-xs">
                <h3
                  onClick={onOpenPolls}
                  className="font-headline-secondary text-headline-secondary text-primary hover:text-action-blue cursor-pointer"
                >
                  {ELECTION_DISPATCHES.title}
                </h3>
                <ul className="flex flex-col gap-space-xs font-body-summary text-body-summary text-on-surface-variant list-disc pl-4 mt-space-xs">
                  {ELECTION_DISPATCHES.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </article>

              {/* Interactive Polling Module Component */}
              <div className="p-space-xs bg-surface-bright mt-space-xs border border-rule-hairline rounded-xs">
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-section-header text-[12px] uppercase font-bold text-primary">
                    The Latest Polls
                  </span>
                  <button
                    onClick={onOpenPolls}
                    className="font-label-metadata text-[10px] text-action-blue hover:underline cursor-pointer"
                  >
                    Updated Hourly
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-space-xs text-center font-label-metadata text-label-metadata">
                  {ELECTION_DISPATCHES.polls.map(p => (
                    <div
                      key={p.race}
                      onClick={onOpenPolls}
                      className="p-space-xs bg-surface-container hover:bg-surface-container-high cursor-pointer transition-colors rounded-xs"
                    >
                      <span className="block text-primary font-bold">{p.race}</span>
                      <span className={`block text-[10px] ${p.race === 'Pres. Approval' ? 'text-breaking-red' : 'text-text-muted'}`}>
                        {p.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= RIGHT COLUMN: OPINION & CULTURE (Columns 10 to 12) ================= */}
          <section className="lg:col-span-3 flex flex-col gap-space-lg">
            {/* Opinion Header & Columnists (Classic NYT Opinion Styling with subtle cream background) */}
            <div className="bg-opinion-cream p-space-md flex flex-col gap-space-md rounded-xs border border-rule-hairline">
              <div className="flex items-center justify-between pb-space-xs">
                <span className="font-headline-primary text-headline-primary font-serif italic text-primary">
                  Opinion
                </span>
                <button
                  onClick={() => onSelectSection('opinion')}
                  className="font-label-metadata text-label-metadata text-action-blue cursor-pointer hover:underline"
                >
                  All Guest Essays ›
                </button>
              </div>

              {/* Essays */}
              {OPINION_ESSAYS.map((essay, idx) => (
                <article
                  key={essay.id}
                  onClick={() => onSelectArticle(essay)}
                  className={`flex flex-col gap-space-xs group cursor-pointer ${
                    idx > 0 ? 'pt-space-xs border-t border-rule-hairline' : ''
                  }`}
                >
                  <div className="flex items-center gap-space-xs">
                    <span
                      className={`w-6 h-6 rounded-full font-label-badge text-[10px] flex items-center justify-center font-bold ${
                        idx === 0
                          ? 'bg-primary text-on-primary'
                          : idx === 2
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-highest text-primary'
                      }`}
                    >
                      {essay.authorInitials}
                    </span>
                    <span className="font-label-metadata text-label-metadata text-primary font-bold">
                      {essay.author}
                    </span>
                  </div>
                  <h4 className="font-headline-tertiary text-headline-tertiary font-serif text-primary group-hover:text-action-blue">
                    {essay.title}
                  </h4>
                  <div className="flex items-center gap-space-sm text-text-muted font-label-metadata text-label-metadata">
                    <span>{idx === 2 ? 'Guest Essay' : idx === 3 ? 'Contributing Critic' : 'Opinion Columnist'}</span>
                    {idx < 2 && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[12px]">forum</span>{' '}
                          {essay.commentsCount}
                        </span>
                      </>
                    )}
                    {idx >= 2 && (
                      <>
                        <span>•</span>
                        <span>{essay.readTime}</span>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Culture, Real Estate & Metropolitan News */}
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-xs border-b border-rule-hairline">
                <span className="font-label-section-header text-label-section-header uppercase tracking-wider text-primary">
                  New York & Living
                </span>
              </div>

              <article
                onClick={() => onSelectArticle(CULTURE_ARTICLES[0])}
                className="flex flex-col gap-space-xs cursor-pointer group"
              >
                <h4 className="font-headline-tertiary text-headline-tertiary text-primary group-hover:text-action-blue">
                  {CULTURE_ARTICLES[0].title}
                </h4>
                <p className="font-body-summary text-body-summary text-on-surface-variant">
                  {CULTURE_ARTICLES[0].summary}
                </p>
                <span className="text-text-muted font-label-metadata text-label-metadata">
                  {CULTURE_ARTICLES[0].readTime} • {CULTURE_ARTICLES[0].author}
                </span>
              </article>

              <article
                onClick={() => onSelectArticle(CULTURE_ARTICLES[1])}
                className="flex flex-col gap-space-xs pt-space-xs border-t border-rule-hairline cursor-pointer group"
              >
                <h4 className="font-headline-tertiary text-headline-tertiary text-primary group-hover:text-action-blue">
                  {CULTURE_ARTICLES[1].title}
                </h4>
                <p className="font-body-summary text-body-summary text-on-surface-variant">
                  {CULTURE_ARTICLES[1].summary}
                </p>
                <span className="text-text-muted font-label-metadata text-label-metadata">
                  {CULTURE_ARTICLES[1].readTime}
                </span>
              </article>

              <article
                onClick={() => onSelectArticle(CULTURE_ARTICLES[2])}
                className="flex flex-col gap-space-xs pt-space-xs border-t border-rule-hairline cursor-pointer group"
              >
                <h4 className="font-headline-tertiary text-headline-tertiary text-primary group-hover:text-action-blue">
                  {CULTURE_ARTICLES[2].title}
                </h4>
                <p className="font-body-summary text-body-summary text-on-surface-variant">
                  {CULTURE_ARTICLES[2].summary}
                </p>
                <span className="text-text-muted font-label-metadata text-label-metadata">
                  {CULTURE_ARTICLES[2].readTime}
                </span>
              </article>

              {/* Sports Live Package: M.L.B. Postseason */}
              <div
                onClick={() => onSelectArticle(CULTURE_ARTICLES[3])}
                className="bg-surface-container-high p-space-sm flex flex-col gap-space-xs rounded-xs cursor-pointer hover:bg-surface-container-highest transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-badge text-label-badge uppercase text-breaking-red font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-breaking-red animate-ping"></span> Live • NLCS Game 3
                  </span>
                  <span className="font-label-metadata text-label-metadata text-text-muted">
                    The Athletic
                  </span>
                </div>
                <h5 className="font-headline-tertiary text-headline-tertiary text-primary hover:underline">
                  {CULTURE_ARTICLES[3].title}
                </h5>
                <p className="font-body-summary text-body-summary text-on-surface-variant">
                  {CULTURE_ARTICLES[3].summary}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ================= FEATURE RIBBON: GAMES, COOKING, WIRECUTTER ================= */}
        <section className="mt-space-xl pt-space-md border-t-2 border-rule-heavy">
          <div className="flex items-center justify-between mb-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="font-masthead-gothic text-[22px] text-primary">Lifestyle & Puzzles</span>
              <span className="text-text-muted font-label-metadata text-label-metadata">
                | Cross-Product Suite
              </span>
            </div>
            <span className="font-label-metadata text-label-metadata text-text-muted">
              All Access Features
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
            {/* NYT Games Card */}
            <div className="bg-surface-bright p-space-md flex flex-col justify-between border border-rule-hairline rounded-xs">
              <div>
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-section-header text-label-section-header uppercase tracking-wider text-primary">
                    NYT Games
                  </span>
                  <span className="font-label-badge text-label-badge bg-primary text-on-primary px-1.5 py-0.5">
                    Daily
                  </span>
                </div>
                <p className="font-body-summary text-body-summary text-text-muted mb-space-sm">
                  Word games, logic tests, and constructor classics.
                </p>

                <div className="flex flex-col gap-space-xs">
                  {/* Wordle */}
                  <div
                    onClick={onOpenWordle}
                    className="flex items-center justify-between p-space-xs bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer rounded-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-[#6aaa64] text-white flex items-center justify-center font-bold text-[10px] rounded-xs">
                        W
                      </span>
                      <span className="font-label-metadata text-label-metadata font-bold text-on-surface">
                        Wordle
                      </span>
                    </div>
                    <span className="font-label-metadata text-[10px] text-text-muted">
                      Puzzle #1214 ›
                    </span>
                  </div>

                  {/* Connections */}
                  <div
                    onClick={onOpenConnections}
                    className="flex items-center justify-between p-space-xs bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer rounded-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-[#b4a8ff] text-white flex items-center justify-center font-bold text-[10px] rounded-xs">
                        C
                      </span>
                      <span className="font-label-metadata text-label-metadata font-bold text-on-surface">
                        Connections
                      </span>
                    </div>
                    <span className="font-label-metadata text-[10px] text-text-muted">
                      Group by Topic ›
                    </span>
                  </div>

                  {/* Spelling Bee */}
                  <div
                    onClick={onOpenSpellingBee}
                    className="flex items-center justify-between p-space-xs bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer rounded-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-[#f7da21] text-primary flex items-center justify-center font-bold text-[10px] rounded-xs">
                        B
                      </span>
                      <span className="font-label-metadata text-label-metadata font-bold text-on-surface">
                        Spelling Bee
                      </span>
                    </div>
                    <span className="font-label-metadata text-[10px] text-text-muted">
                      7 Letters ›
                    </span>
                  </div>

                  {/* The Mini Crossword */}
                  <div
                    onClick={onOpenMiniCrossword}
                    className="flex items-center justify-between p-space-xs bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer rounded-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-action-blue text-white flex items-center justify-center font-bold text-[10px] rounded-xs">
                        M
                      </span>
                      <span className="font-label-metadata text-label-metadata font-bold text-on-surface">
                        The Mini Crossword
                      </span>
                    </div>
                    <span className="font-label-metadata text-[10px] text-text-muted">
                      Play in 2 Min ›
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenWordle}
                className="w-full mt-space-md py-space-xs bg-transparent text-primary hover:bg-surface-container font-label-badge text-label-badge uppercase tracking-wider transition-colors cursor-pointer border border-rule-hairline"
              >
                Solve Crosswords Archive
              </button>
            </div>

            {/* NYT Cooking Card */}
            <div className="bg-surface-bright p-space-md flex flex-col justify-between border border-rule-hairline rounded-xs">
              <div>
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-section-header text-label-section-header uppercase tracking-wider text-primary">
                    NYT Cooking
                  </span>
                  <span className="font-label-badge text-label-badge text-breaking-red uppercase">
                    Popular
                  </span>
                </div>
                <p className="font-body-summary text-body-summary text-text-muted mb-space-sm">
                  Tested recipes, smart pantry guides, and five-star meals.
                </p>

                <div className="flex flex-col gap-space-sm">
                  {/* Dish 1 */}
                  <div
                    onClick={() => onSelectRecipe(RECIPES[0])}
                    className="flex gap-space-sm items-center p-space-xs bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer rounded-xs"
                  >
                    <img
                      className="w-16 h-16 object-cover flex-shrink-0 rounded-xs"
                      src={RECIPES[0].imageUrl}
                      alt={RECIPES[0].title}
                    />
                    <div className="flex flex-col">
                      <span className="font-headline-tertiary text-headline-tertiary text-primary hover:text-action-blue">
                        {RECIPES[0].title}
                      </span>
                      <span className="font-label-metadata text-[11px] text-text-muted">
                        {RECIPES[0].author} • {RECIPES[0].time}
                      </span>
                    </div>
                  </div>

                  {/* Dish 2 */}
                  <div
                    onClick={() => onSelectRecipe(RECIPES[1])}
                    className="flex gap-space-sm items-center p-space-xs bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer rounded-xs"
                  >
                    <img
                      className="w-16 h-16 object-cover flex-shrink-0 rounded-xs"
                      src={RECIPES[1].imageUrl}
                      alt={RECIPES[1].title}
                    />
                    <div className="flex flex-col">
                      <span className="font-headline-tertiary text-headline-tertiary text-primary hover:text-action-blue">
                        {RECIPES[1].title}
                      </span>
                      <span className="font-label-metadata text-[11px] text-text-muted">
                        {RECIPES[1].author} • {RECIPES[1].time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectRecipe(RECIPES[0])}
                className="block text-center w-full mt-space-md py-space-xs bg-transparent text-primary hover:bg-surface-container font-label-badge text-label-badge uppercase tracking-wider transition-colors cursor-pointer border border-rule-hairline"
              >
                See Five Weeknight Dishes ›
              </button>
            </div>

            {/* Wirecutter Card */}
            <div className="bg-surface-bright p-space-md flex flex-col justify-between border border-rule-hairline rounded-xs">
              <div>
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-section-header text-label-section-header uppercase tracking-wider text-primary">
                    Wirecutter
                  </span>
                  <span className="font-label-badge text-label-badge text-secondary uppercase font-bold">
                    Independent Reviews
                  </span>
                </div>
                <p className="font-body-summary text-body-summary text-text-muted mb-space-sm">
                  Rigorous, unbiased reviews and lab-tested product guides.
                </p>

                <div className="flex flex-col gap-space-xs">
                  {WIRECUTTER_REVIEWS.map(rev => (
                    <div
                      key={rev.id}
                      onClick={() => onSelectReview(rev)}
                      className="p-space-xs bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer rounded-xs"
                    >
                      <span className="font-label-badge text-[9px] uppercase text-action-blue">
                        {rev.badge}
                      </span>
                      <span className="block font-headline-tertiary text-headline-tertiary text-primary">
                        {rev.title}
                      </span>
                      <span className="font-label-metadata text-[10px] text-text-muted">
                        {rev.testedHours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectReview(WIRECUTTER_REVIEWS[0])}
                className="w-full mt-space-md py-space-xs bg-action-blue text-on-primary hover:bg-[#446277] font-label-badge text-label-badge uppercase tracking-wider transition-colors cursor-pointer"
              >
                Explore All Wirecutter Guides
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
