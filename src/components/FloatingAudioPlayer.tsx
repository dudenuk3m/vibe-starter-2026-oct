import React from 'react';
import { Article } from '../data/nytData';

interface FloatingAudioPlayerProps {
  article: Article;
  isPlaying: boolean;
  rate: number;
  onTogglePlay: () => void;
  onChangeRate: (rate: number) => void;
  onClose: () => void;
}

export const FloatingAudioPlayer: React.FC<FloatingAudioPlayerProps> = ({
  article,
  isPlaying,
  rate,
  onTogglePlay,
  onChangeRate,
  onClose,
}) => {
  const rates = [1, 1.25, 1.5, 2];

  const handleNextRate = () => {
    const nextIdx = (rates.indexOf(rate) + 1) % rates.length;
    onChangeRate(rates[nextIdx]);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[480px] z-50 bg-stone-900 text-white rounded-lg shadow-2xl p-3.5 border border-stone-700 animate-in slide-in-from-bottom-4 duration-300 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Waveform animation & Article Info */}
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <div className="w-9 h-9 rounded bg-action-blue flex items-center justify-center shrink-0">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-1 bg-white animate-pulse h-2"></span>
                <span className="w-1 bg-white animate-pulse h-4" style={{ animationDelay: '0.15s' }}></span>
                <span className="w-1 bg-white animate-pulse h-3" style={{ animationDelay: '0.3s' }}></span>
              </div>
            ) : (
              <span className="material-symbols-outlined text-[20px] text-white">volume_up</span>
            )}
          </div>
          <div className="overflow-hidden">
            <span className="text-[10px] font-sans uppercase font-bold tracking-wider text-action-blue block">
              Audio Edition • {article.readTime}
            </span>
            <h5 className="font-serif text-xs font-bold text-white truncate">
              {article.title}
            </h5>
            <span className="text-[10px] font-sans text-stone-400 block truncate">
              {article.author}
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Rate button */}
          <button
            onClick={handleNextRate}
            className="px-2 py-1 text-[11px] font-mono font-bold bg-stone-800 hover:bg-stone-700 rounded text-stone-300 transition-colors cursor-pointer"
            title="Narration Speed"
          >
            {rate}x
          </button>

          {/* Play/Pause */}
          <button
            onClick={onTogglePlay}
            className="w-8 h-8 rounded-full bg-white text-stone-950 flex items-center justify-center hover:bg-stone-200 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
