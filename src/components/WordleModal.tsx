import React, { useState, useEffect, useCallback } from 'react';

interface WordleModalProps {
  onClose: () => void;
}

const SOLUTION = 'PRESS'; // Editorial themed Wordle word!
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

export const WordleModal: React.FC<WordleModalProps> = ({ onClose }) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<'IN_PROGRESS' | 'WON' | 'LOST'>('IN_PROGRESS');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleChar = useCallback(
    (char: string) => {
      if (gameStatus !== 'IN_PROGRESS') return;
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(prev => prev + char.toUpperCase());
      }
    },
    [currentGuess, gameStatus]
  );

  const handleDelete = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS') return;
    setCurrentGuess(prev => prev.slice(0, -1));
  }, [gameStatus]);

  const handleEnter = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS') return;

    if (currentGuess.length !== WORD_LENGTH) {
      showToast('Not enough letters');
      return;
    }

    const nextGuesses = [...guesses, currentGuess];
    setGuesses(nextGuesses);
    setCurrentGuess('');

    if (currentGuess === SOLUTION) {
      setGameStatus('WON');
      showToast('Splendid! You solved today’s puzzle.');
    } else if (nextGuesses.length >= MAX_GUESSES) {
      setGameStatus('LOST');
      showToast(`The word was ${SOLUTION}`);
    }
  }, [currentGuess, gameStatus, guesses]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Enter') {
        handleEnter();
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleChar(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleChar, handleDelete, handleEnter, onClose]);

  const getLetterStatus = (letter: string, index: number, guess: string) => {
    if (guess[index] === SOLUTION[index]) {
      return 'bg-[#6aaa64] text-white border-[#6aaa64]'; // green
    }
    if (SOLUTION.includes(letter)) {
      return 'bg-[#c9b458] text-white border-[#c9b458]'; // yellow
    }
    return 'bg-[#787c7e] text-white border-[#787c7e]'; // gray
  };

  const getKeyboardKeyStatus = (key: string) => {
    let status = 'bg-stone-200 text-stone-900';
    for (const guess of guesses) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === key) {
          if (SOLUTION[i] === key) {
            return 'bg-[#6aaa64] text-white';
          }
          if (SOLUTION.includes(key) && status !== 'bg-[#6aaa64] text-white') {
            status = 'bg-[#c9b458] text-white';
          } else if (status === 'bg-stone-200 text-stone-900') {
            status = 'bg-[#787c7e] text-white';
          }
        }
      }
    }
    return status;
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
  ];

  const handleReset = () => {
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('IN_PROGRESS');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[500px] rounded-lg shadow-2xl p-6 border border-rule-hairline flex flex-col items-center relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Wordle Header */}
        <div className="text-center border-b border-rule-hairline w-full pb-3 mb-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 bg-[#6aaa64] text-white flex items-center justify-center font-bold text-xs rounded-sm">
              W
            </span>
            <h2 className="font-serif text-2xl font-bold tracking-tight">Wordle</h2>
          </div>
          <span className="text-[11px] font-sans text-text-muted">Puzzle #1214 • Editon for Oct 14, 2026</span>
        </div>

        {/* Toast Message */}
        {toastMessage && (
          <div className="absolute top-20 bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded shadow-lg z-20 animate-bounce">
            {toastMessage}
          </div>
        )}

        {/* Wordle Grid */}
        <div className="grid grid-rows-6 gap-1.5 mb-6">
          {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
            const guess = guesses[rowIndex];
            const isCurrentRow = rowIndex === guesses.length;

            return (
              <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                  let letter = '';
                  let cellStyle = 'border-2 border-stone-300 text-stone-900';

                  if (guess) {
                    letter = guess[colIndex];
                    cellStyle = getLetterStatus(letter, colIndex, guess);
                  } else if (isCurrentRow && currentGuess[colIndex]) {
                    letter = currentGuess[colIndex];
                    cellStyle = 'border-2 border-stone-800 text-stone-900 scale-105';
                  }

                  return (
                    <div
                      key={colIndex}
                      className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl sm:text-2xl font-bold uppercase transition-all duration-300 select-none ${cellStyle}`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* On-screen Keyboard */}
        <div className="w-full flex flex-col gap-1.5 mb-3">
          {keyboardRows.map((row, rIdx) => (
            <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
              {row.map(key => {
                const isWide = key === 'ENTER' || key === '⌫';
                const keyStatus = isWide ? 'bg-stone-300 text-stone-900' : getKeyboardKeyStatus(key);

                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (key === 'ENTER') handleEnter();
                      else if (key === '⌫') handleDelete();
                      else handleChar(key);
                    }}
                    className={`h-11 sm:h-12 font-sans font-bold text-xs sm:text-sm rounded active:scale-95 transition-all flex items-center justify-center cursor-pointer select-none ${
                      isWide ? 'px-3 text-[11px]' : 'w-8 sm:w-9'
                    } ${keyStatus}`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Game completion actions */}
        {gameStatus !== 'IN_PROGRESS' && (
          <div className="mt-2 text-center">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-action-blue hover:bg-[#446277] text-white text-xs font-bold uppercase rounded cursor-pointer transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
