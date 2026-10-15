import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { FrontPage } from './components/FrontPage';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { RecipeModal } from './components/RecipeModal';
import { WirecutterModal } from './components/WirecutterModal';
import { WordleModal } from './components/WordleModal';
import { ConnectionsModal } from './components/ConnectionsModal';
import { SpellingBeeModal } from './components/SpellingBeeModal';
import { MiniCrosswordModal } from './components/MiniCrosswordModal';
import { SearchModal } from './components/SearchModal';
import { SubscribeModal } from './components/SubscribeModal';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { TodaysPaperModal } from './components/TodaysPaperModal';
import { MarketsModal } from './components/MarketsModal';
import { ConfidentialTipModal } from './components/ConfidentialTipModal';
import { PollsModal } from './components/PollsModal';
import { FloatingAudioPlayer } from './components/FloatingAudioPlayer';

import {
  ALL_ARTICLES,
  LEAD_ARTICLE,
  Recipe,
  WirecutterReview,
  Article,
  RECIPES,
  WIRECUTTER_REVIEWS,
} from './data/nytData';

export default function App() {
  const [currentSection, setCurrentSection] = useState('front-page');

  // Theme support: Paper (default white), Sepia (warm broadsheet), Dark (night edition)
  const [theme, setTheme] = useState<'paper' | 'sepia' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('nyt_theme');
      return (saved as 'paper' | 'sepia' | 'dark') || 'paper';
    } catch {
      return 'paper';
    }
  });

  useEffect(() => {
    document.body.classList.remove('theme-sepia', 'theme-dark');
    if (theme === 'sepia') {
      document.body.classList.add('theme-sepia');
    } else if (theme === 'dark') {
      document.body.classList.add('theme-dark');
    }
    try {
      localStorage.setItem('nyt_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Audio Narration State
  const [audioArticle, setAudioArticle] = useState<Article | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioRate, setAudioRate] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Modals & Screens
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedReview, setSelectedReview] = useState<WirecutterReview | null>(null);

  const [isWordleOpen, setIsWordleOpen] = useState(false);
  const [isConnectionsOpen, setIsConnectionsOpen] = useState(false);
  const [isSpellingBeeOpen, setIsSpellingBeeOpen] = useState(false);
  const [isMiniCrosswordOpen, setIsMiniCrosswordOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isTodaysPaperOpen, setIsTodaysPaperOpen] = useState(false);
  const [isMarketsOpen, setIsMarketsOpen] = useState(false);
  const [isConfidentialTipOpen, setIsConfidentialTipOpen] = useState(false);
  const [isPollsOpen, setIsPollsOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Bookmarked articles with localStorage persistence
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('nyt_bookmarked_articles');
      return saved ? JSON.parse(saved) : [LEAD_ARTICLE];
    } catch {
      return [LEAD_ARTICLE];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  useEffect(() => {
    try {
      localStorage.setItem('nyt_bookmarked_articles', JSON.stringify(bookmarkedArticles));
    } catch {
      // ignore
    }
  }, [bookmarkedArticles]);

  // Keyboard shortcut listener (/ for search, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleBookmark = (article: Article) => {
    const exists = bookmarkedArticles.some(a => a.id === article.id);
    if (exists) {
      setBookmarkedArticles(bookmarkedArticles.filter(a => a.id !== article.id));
      showToast('Article removed from reading list');
    } else {
      setBookmarkedArticles([article, ...bookmarkedArticles]);
      showToast('Article saved to your reading list');
    }
  };

  const handleRemoveBookmark = (articleId: string) => {
    setBookmarkedArticles(bookmarkedArticles.filter(a => a.id !== articleId));
    showToast('Article removed');
  };

  const handleSelectSection = (section: string) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (section === 'games') {
      setIsWordleOpen(true);
    } else if (section === 'cooking') {
      setSelectedRecipe(RECIPES[0]);
    } else if (section === 'wirecutter') {
      setSelectedReview(WIRECUTTER_REVIEWS[0]);
    }
  };

  // Audio Speech Synthesis Engine
  const startAudioNarration = (article: Article) => {
    if (!('speechSynthesis' in window)) {
      showToast('Speech narration is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    setAudioArticle(article);

    const fullSpeechText = `${article.title}. By ${article.author}. ${article.summary}. ${
      article.fullContent?.join(' ') || ''
    }`;

    const utterance = new SpeechSynthesisUtterance(fullSpeechText);
    utterance.rate = audioRate;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      setIsAudioPlaying(false);
    };
    utterance.onerror = () => {
      setIsAudioPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsAudioPlaying(true);
    showToast(`Listening to: ${article.title}`);
  };

  const toggleAudioPlay = () => {
    if (!('speechSynthesis' in window) || !audioArticle) return;

    if (isAudioPlaying) {
      window.speechSynthesis.pause();
      setIsAudioPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else if (utteranceRef.current) {
        window.speechSynthesis.speak(utteranceRef.current);
      } else {
        startAudioNarration(audioArticle);
      }
      setIsAudioPlaying(true);
    }
  };

  const changeAudioRate = (newRate: number) => {
    setAudioRate(newRate);
    if (audioArticle && isAudioPlaying) {
      startAudioNarration(audioArticle);
    }
  };

  const closeAudioPlayer = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setAudioArticle(null);
    setIsAudioPlaying(false);
  };

  return (
    <div className="bg-canvas-white text-on-surface antialiased min-h-screen flex flex-col font-serif selection:bg-[#c8e6ff] selection:text-[#001e2e]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white font-sans text-xs font-semibold px-4 py-2.5 rounded shadow-xl border border-stone-700 animate-in fade-in slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}

      {/* Global Fixed Header */}
      <Header
        currentSection={currentSection}
        onSelectSection={handleSelectSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenLogin={() => setIsSubscribeOpen(true)}
        onOpenTodaysPaper={() => setIsTodaysPaperOpen(true)}
        onOpenMarkets={() => setIsMarketsOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        savedCount={bookmarkedArticles.length}
        theme={theme}
        onChangeTheme={setTheme}
      />

      {/* Main Body - pt-36/40 to clear fixed top nav */}
      <main className="w-full pt-36 md:pt-40 bg-canvas-white flex-1 transition-colors">
        <FrontPage
          currentSection={currentSection}
          onSelectArticle={art => setSelectedArticle(art)}
          onOpenWordle={() => setIsWordleOpen(true)}
          onOpenConnections={() => setIsConnectionsOpen(true)}
          onOpenSpellingBee={() => setIsSpellingBeeOpen(true)}
          onOpenMiniCrossword={() => setIsMiniCrosswordOpen(true)}
          onSelectRecipe={recipe => setSelectedRecipe(recipe)}
          onSelectReview={rev => setSelectedReview(rev)}
          onOpenConfidentialTip={() => setIsConfidentialTipOpen(true)}
          onOpenPolls={() => setIsPollsOpen(true)}
          onOpenSubscribe={() => setIsSubscribeOpen(true)}
          onSelectSection={handleSelectSection}
          onToggleBookmark={handleToggleBookmark}
          bookmarkedIds={bookmarkedArticles.map(a => a.id)}
        />
      </main>

      {/* Global Broadsheet Footer */}
      <Footer
        onSelectSection={handleSelectSection}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
      />

      {/* Persistent Floating Audio Player when listening to any story */}
      {audioArticle && (
        <FloatingAudioPlayer
          article={audioArticle}
          isPlaying={isAudioPlaying}
          rate={audioRate}
          onTogglePlay={toggleAudioPlay}
          onChangeRate={changeAudioRate}
          onClose={closeAudioPlayer}
        />
      )}

      {/* ================= MODALS & ACTIVE SCREENS ================= */}

      {/* Article Detail View Screen */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isBookmarked={bookmarkedArticles.some(a => a.id === selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
          onSelectRelatedArticle={id => {
            const found = ALL_ARTICLES.find(a => a.id === id);
            if (found) setSelectedArticle(found);
          }}
          allArticles={ALL_ARTICLES}
          onStartAudioNarration={startAudioNarration}
        />
      )}

      {/* NYT Cooking Recipe Screen */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {/* Wirecutter Independent Review Screen */}
      {selectedReview && (
        <WirecutterModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}

      {/* Playable Wordle Screen */}
      {isWordleOpen && (
        <WordleModal onClose={() => setIsWordleOpen(false)} />
      )}

      {/* Playable Connections Screen */}
      {isConnectionsOpen && (
        <ConnectionsModal onClose={() => setIsConnectionsOpen(false)} />
      )}

      {/* Playable Spelling Bee Screen */}
      {isSpellingBeeOpen && (
        <SpellingBeeModal onClose={() => setIsSpellingBeeOpen(false)} />
      )}

      {/* Playable Mini Crossword Screen */}
      {isMiniCrosswordOpen && (
        <MiniCrosswordModal onClose={() => setIsMiniCrosswordOpen(false)} />
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal
          articles={ALL_ARTICLES}
          onClose={() => setIsSearchOpen(false)}
          onSelectArticle={art => setSelectedArticle(art)}
        />
      )}

      {/* Subscription Plans Modal */}
      {isSubscribeOpen && (
        <SubscribeModal onClose={() => setIsSubscribeOpen(false)} />
      )}

      {/* Today's Paper Digital Edition Index */}
      {isTodaysPaperOpen && (
        <TodaysPaperModal
          onClose={() => setIsTodaysPaperOpen(false)}
          articles={ALL_ARTICLES}
          onSelectArticle={art => setSelectedArticle(art)}
        />
      )}

      {/* Markets & Weather Drawer Modal */}
      {isMarketsOpen && (
        <MarketsModal onClose={() => setIsMarketsOpen(false)} />
      )}

      {/* Confidential Tip & Whistleblower Submission Modal */}
      {isConfidentialTipOpen && (
        <ConfidentialTipModal onClose={() => setIsConfidentialTipOpen(false)} />
      )}

      {/* Midterms 2026 Interactive Polling Modal */}
      {isPollsOpen && (
        <PollsModal onClose={() => setIsPollsOpen(false)} />
      )}

      {/* Saved / Bookmarked Articles Drawer */}
      {isBookmarksOpen && (
        <SavedArticlesDrawer
          savedArticles={bookmarkedArticles}
          onClose={() => setIsBookmarksOpen(false)}
          onSelectArticle={art => setSelectedArticle(art)}
          onRemoveBookmark={handleRemoveBookmark}
        />
      )}
    </div>
  );
}
