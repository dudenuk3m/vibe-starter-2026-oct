import React, { useState, useEffect } from 'react';
import { Article, ArticleComment } from '../data/nytData';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  onSelectRelatedArticle: (articleId: string) => void;
  allArticles: Article[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectRelatedArticle,
  allArticles,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [comments, setComments] = useState<ArticleComment[]>(article.comments || [
    {
      id: 'default-1',
      author: 'Jane Doe',
      location: 'New York, NY',
      timestamp: '1 hour ago',
      text: 'Remarkable reporting as always. This clarifies several ambiguities that emerged in earlier cable commentary.',
      upvotes: 28,
    },
    {
      id: 'default-2',
      author: 'Robert Sterling',
      location: 'London, UK',
      timestamp: '3 hours ago',
      text: 'The international ramifications of this policy pivot cannot be overstated. Watching this closely from Europe.',
      upvotes: 19,
    },
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.speechSynthesis.cancel();
    };
  }, [onClose]);

  // Audio Speech Synthesis
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const fullSpeechText = `${article.title}. ${article.summary}. ${
        article.fullContent?.join(' ') || ''
      }`;
      const utterance = new SpeechSynthesisUtterance(fullSpeechText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: ArticleComment = {
      id: `comment-${Date.now()}`,
      author: authorName.trim() || 'Reader',
      location: 'United States',
      timestamp: 'Just now',
      text: newCommentText.trim(),
      upvotes: 1,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleUpvote = (id: string) => {
    setComments(comments.map(c => (c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c)));
  };

  const fontClass =
    fontSize === 'normal'
      ? 'text-[17px] leading-[28px]'
      : fontSize === 'large'
      ? 'text-[20px] leading-[32px]'
      : 'text-[23px] leading-[36px]';

  const relatedArticles = allArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-0 md:p-4 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[960px] min-h-screen md:min-h-0 md:rounded-sm shadow-2xl overflow-hidden flex flex-col my-auto border border-rule-hairline">
        
        {/* Sticky Utility Sub-Header */}
        <div className="sticky top-0 z-30 bg-canvas-white/95 backdrop-blur-md border-b border-rule-hairline px-4 md:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-action-blue transition-colors cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
            <span>Back to Front Page</span>
          </button>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Audio narration */}
            <button
              onClick={handleToggleSpeech}
              title={isSpeaking ? 'Pause reading' : 'Listen to article'}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                isSpeaking
                  ? 'bg-action-blue text-white border-action-blue'
                  : 'bg-surface-container-low text-on-surface border-rule-hairline hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isSpeaking ? 'pause' : 'volume_up'}
              </span>
              <span className="hidden sm:inline">{isSpeaking ? 'Listening' : 'Listen'}</span>
            </button>

            {/* Font Size Selector */}
            <div className="flex items-center border border-rule-hairline rounded bg-surface-container-low px-1 py-0.5 text-xs font-serif">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 text-xs rounded transition-colors ${
                  fontSize === 'normal' ? 'bg-white font-bold shadow-xs' : 'text-text-muted hover:text-primary'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 text-sm rounded transition-colors ${
                  fontSize === 'large' ? 'bg-white font-bold shadow-xs' : 'text-text-muted hover:text-primary'
                }`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('huge')}
                className={`px-1.5 py-0.5 text-base rounded transition-colors ${
                  fontSize === 'huge' ? 'bg-white font-bold shadow-xs' : 'text-text-muted hover:text-primary'
                }`}
              >
                A++
              </button>
            </div>

            {/* Save/Bookmark */}
            <button
              onClick={() => onToggleBookmark(article)}
              title={isBookmarked ? 'Remove from Saved' : 'Save article'}
              className={`p-1.5 rounded transition-colors cursor-pointer border ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'border-rule-hairline text-text-muted hover:text-primary bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>

            {/* Share */}
            <button
              onClick={handleCopyLink}
              title="Copy article link"
              className="p-1.5 rounded border border-rule-hairline text-text-muted hover:text-primary bg-surface-container-low cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Share Feedback Toast */}
        {showShareToast && (
          <div className="bg-primary text-white text-xs px-4 py-2 text-center font-sans">
            Link copied to clipboard!
          </div>
        )}

        {/* Article Body Container */}
        <div className="px-6 md:px-16 py-8 max-w-[800px] mx-auto w-full">
          {/* Kicker & Category */}
          <div className="flex items-center gap-2 mb-3">
            {article.kicker && (
              <span
                className={`text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-xs ${
                  article.kickerType === 'red'
                    ? 'bg-breaking-red text-white'
                    : article.kickerType === 'blue'
                    ? 'text-action-blue bg-blue-50'
                    : 'text-primary bg-stone-100'
                }`}
              >
                {article.kicker}
              </span>
            )}
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              {article.category}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[32px] md:text-[42px] font-bold leading-[1.15] tracking-tight text-primary mb-4">
            {article.title}
          </h1>

          {/* Deck / Summary */}
          <p className="font-serif text-[18px] md:text-[20px] text-on-surface-variant leading-snug mb-6 pb-6 border-b border-rule-hairline">
            {article.summary}
          </p>

          {/* Byline and Metadata */}
          <div className="flex flex-wrap items-center justify-between text-xs text-text-muted font-sans pb-6 border-b border-rule-hairline gap-2 mb-6">
            <div>
              <span className="font-bold text-on-surface">{article.author}</span>
              {article.authorBio && (
                <span className="block text-[11px] text-text-muted mt-0.5">{article.authorBio}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-on-surface">
                <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
                {comments.length} Comments
              </span>
            </div>
          </div>

          {/* Optional Lead Image */}
          {article.imageUrl && (
            <div className="mb-8">
              <div className="relative bg-surface-container overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.imageCaption || article.title}
                  className="w-full max-h-[480px] object-cover object-top"
                />
                {article.imageCredit && (
                  <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[10px] px-1.5 py-0.5 font-sans">
                    {article.imageCredit}
                  </span>
                )}
              </div>
              {article.imageCaption && (
                <figcaption className="text-xs text-text-muted font-serif italic mt-2 px-1">
                  {article.imageCaption}
                </figcaption>
              )}
            </div>
          )}

          {/* Article Text */}
          <div className={`font-serif text-on-surface space-y-5 ${fontClass}`}>
            {article.fullContent ? (
              article.fullContent.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'drop-cap-p' : ''}>
                  {paragraph}
                </p>
              ))
            ) : (
              <>
                <p className="drop-cap-p">
                  {article.summary}
                </p>
                <p>
                  Senior analysts in Washington and abroad have noted the accelerating pace of these developments, which mark an unprecedented chapter in modern administrative governance and policy coordination.
                </p>
                <p>
                  Further updates and statements from administration officials are expected following closed-door congressional hearings scheduled later this week.
                </p>
              </>
            )}

            {/* Pull Quote */}
            {article.pullQuote && (
              <div className="my-8 py-6 border-y-2 border-rule-heavy">
                <blockquote className="text-center font-serif italic text-[22px] md:text-[26px] text-primary px-4">
                  “{article.pullQuote}”
                </blockquote>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="mt-12 pt-8 border-t-2 border-rule-heavy">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold text-primary flex items-center gap-2">
                <span>Comments</span>
                <span className="text-sm font-sans font-normal text-text-muted">({comments.length})</span>
              </h3>
              <span className="text-xs font-sans text-text-muted">Moderated in accordance with NYT Community Standards</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="bg-surface-container-low p-4 rounded mb-6 border border-rule-hairline">
              <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-primary mb-2">Join the Conversation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Rachel Green)"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  className="bg-white border border-rule-hairline px-3 py-1.5 text-xs rounded font-sans focus:outline-none focus:border-action-blue"
                />
              </div>
              <textarea
                placeholder="Share your thoughts on this story..."
                rows={3}
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                className="w-full bg-white border border-rule-hairline p-3 text-sm rounded font-sans focus:outline-none focus:border-action-blue resize-none mb-2"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-action-blue hover:bg-[#446277] text-white text-xs font-bold uppercase px-4 py-2 rounded transition-colors cursor-pointer"
                >
                  Submit Comment
                </button>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-4">
              {comments.map(c => (
                <div key={c.id} className="p-4 bg-white border border-rule-hairline rounded">
                  <div className="flex items-center justify-between mb-1.5 font-sans text-xs">
                    <span className="font-bold text-primary">{c.author} <span className="font-normal text-text-muted">({c.location})</span></span>
                    <span className="text-text-muted">{c.timestamp}</span>
                  </div>
                  <p className="font-serif text-[15px] leading-relaxed text-on-surface mb-2">{c.text}</p>
                  <button
                    onClick={() => handleUpvote(c.id)}
                    className="flex items-center gap-1 text-xs text-text-muted hover:text-action-blue cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                    <span>Recommend ({c.upvotes})</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Related Stories */}
          <div className="mt-12 pt-8 border-t border-rule-hairline">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-primary mb-4">
              More in {article.category}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelatedArticle(rel.id)}
                  className="p-3 bg-surface-bright border border-rule-hairline hover:bg-surface-container cursor-pointer transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-action-blue uppercase tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h5 className="font-serif font-bold text-sm text-primary line-clamp-2 hover:underline">
                      {rel.title}
                    </h5>
                  </div>
                  <span className="text-[11px] text-text-muted font-sans mt-3 block">
                    {rel.readTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
