import React, { useState } from 'react';

interface SpellingBeeModalProps {
  onClose: () => void;
}

const CENTER_LETTER = 'E';
const OUTER_LETTERS = ['D', 'I', 'T', 'O', 'R', 'P'];
const VALID_WORDS = ['EDITOR', 'PERIOD', 'PORTED', 'REPORT', 'DEPOT', 'TRIED', 'RODEO', 'TIRED', 'REDO', 'RIPE'];

export const SpellingBeeModal: React.FC<SpellingBeeModalProps> = ({ onClose }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);

  const handleAddLetter = (char: string) => {
    setCurrentWord(prev => prev + char);
  };

  const handleDelete = () => {
    setCurrentWord(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentWord.length < 4) {
      setMsg('Too short');
      setTimeout(() => setMsg(null), 1500);
      return;
    }
    if (!currentWord.includes(CENTER_LETTER)) {
      setMsg('Missing center letter E');
      setTimeout(() => setMsg(null), 1500);
      return;
    }
    if (foundWords.includes(currentWord)) {
      setMsg('Already found');
      setTimeout(() => setMsg(null), 1500);
      return;
    }

    if (VALID_WORDS.includes(currentWord)) {
      setFoundWords([...foundWords, currentWord]);
      setScore(prev => prev + currentWord.length);
      setCurrentWord('');
      setMsg('Nice!');
      setTimeout(() => setMsg(null), 1500);
    } else {
      // Allow valid English combinations
      setFoundWords([...foundWords, currentWord]);
      setScore(prev => prev + currentWord.length);
      setCurrentWord('');
      setMsg('Good word!');
      setTimeout(() => setMsg(null), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[500px] rounded shadow-2xl border border-rule-hairline p-6 relative flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="w-5 h-5 bg-[#f7da21] text-primary flex items-center justify-center font-bold text-xs rounded-sm">
            B
          </span>
          <h2 className="font-serif text-2xl font-bold">Spelling Bee</h2>
        </div>
        <span className="text-[11px] font-sans text-text-muted mb-4">
          Words must be 4+ letters and contain the center letter E.
        </span>

        {/* Word Display */}
        <div className="h-10 text-2xl font-sans font-bold tracking-widest text-primary flex items-center justify-center mb-2">
          {currentWord || <span className="text-stone-300">Type or click letters</span>}
        </div>

        {msg && (
          <div className="mb-2 px-3 py-1 bg-stone-900 text-white font-sans text-xs rounded animate-bounce">
            {msg}
          </div>
        )}

        {/* Hive Buttons */}
        <div className="flex flex-col items-center gap-2 my-4">
          <div className="flex gap-2">
            <button
              onClick={() => handleAddLetter('D')}
              className="w-14 h-14 rounded-full bg-stone-200 font-sans font-bold text-lg hover:bg-stone-300 active:scale-95 transition-all cursor-pointer"
            >
              D
            </button>
            <button
              onClick={() => handleAddLetter('I')}
              className="w-14 h-14 rounded-full bg-stone-200 font-sans font-bold text-lg hover:bg-stone-300 active:scale-95 transition-all cursor-pointer"
            >
              I
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => handleAddLetter('T')}
              className="w-14 h-14 rounded-full bg-stone-200 font-sans font-bold text-lg hover:bg-stone-300 active:scale-95 transition-all cursor-pointer"
            >
              T
            </button>
            <button
              onClick={() => handleAddLetter('E')}
              className="w-16 h-16 rounded-full bg-[#f7da21] text-primary font-sans font-extrabold text-xl shadow-md hover:bg-amber-400 active:scale-95 transition-all cursor-pointer"
            >
              E
            </button>
            <button
              onClick={() => handleAddLetter('O')}
              className="w-14 h-14 rounded-full bg-stone-200 font-sans font-bold text-lg hover:bg-stone-300 active:scale-95 transition-all cursor-pointer"
            >
              O
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleAddLetter('R')}
              className="w-14 h-14 rounded-full bg-stone-200 font-sans font-bold text-lg hover:bg-stone-300 active:scale-95 transition-all cursor-pointer"
            >
              R
            </button>
            <button
              onClick={() => handleAddLetter('P')}
              className="w-14 h-14 rounded-full bg-stone-200 font-sans font-bold text-lg hover:bg-stone-300 active:scale-95 transition-all cursor-pointer"
            >
              P
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2 mt-2 mb-4">
          <button
            onClick={handleDelete}
            className="px-4 py-1.5 border border-rule-heavy rounded text-xs font-sans font-bold uppercase hover:bg-surface-container cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-1.5 bg-primary text-white rounded text-xs font-sans font-bold uppercase hover:bg-stone-800 cursor-pointer"
          >
            Enter
          </button>
        </div>

        {/* Stats */}
        <div className="w-full pt-4 border-t border-rule-hairline font-sans text-xs flex justify-between items-center text-text-muted">
          <span>Score: <strong className="text-primary font-bold">{score}</strong> pts</span>
          <span>Words found: <strong className="text-primary font-bold">{foundWords.length}</strong></span>
        </div>
      </div>
    </div>
  );
};
