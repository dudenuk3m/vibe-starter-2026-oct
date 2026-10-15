import React, { useState } from 'react';

interface MiniCrosswordModalProps {
  onClose: () => void;
}

// 5x5 Mini Crossword Grid
// Clues:
// ACROSS:
// 1. Newspaper scoop (STORY)
// 6. Morning beverage (COFFEE) - let's make a true 5x5 grid:
// 1. PRESS (1-5)
// 2. RADIO (6-10)
// 3. EDITs (11-15)
// 4. PAPER
// 5. ESSAY

export const MiniCrosswordModal: React.FC<MiniCrosswordModalProps> = ({ onClose }) => {
  const solution = [
    ['P', 'R', 'E', 'S', 'S'],
    ['R', 'A', 'D', 'I', 'O'],
    ['I', 'D', 'I', 'O', 'M'],
    ['N', 'A', 'T', 'I', 'V'],
    ['T', 'R', 'O', 'P', 'E'],
  ];

  const clues = {
    across: [
      { num: 1, text: 'The Fourth Estate, collectively' },
      { num: 2, text: 'Broadcast medium older than TV' },
      { num: 3, text: 'Figurative linguistic phrase' },
      { num: 4, text: 'Local flora or fauna origin (Var.)' },
      { num: 5, text: 'Commonly recurring storytelling motif' },
    ],
    down: [
      { num: 1, text: 'Produce hard copies on paper' },
      { num: 2, text: 'Scanning detection tech' },
      { num: 3, text: 'Publishing modification' },
      { num: 4, text: 'Mediterranean culinary oil source (Var.)' },
      { num: 5, text: 'Move quickly on ice' },
    ],
  };

  const [grid, setGrid] = useState<string[][]>([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);

  const [selectedCell, setSelectedCell] = useState<[number, number]>([0, 0]);
  const [solved, setSolved] = useState(false);

  const handleCellChange = (r: number, c: number, char: string) => {
    const val = char.slice(-1).toUpperCase();
    const newGrid = grid.map((row, rIdx) =>
      row.map((col, cIdx) => (rIdx === r && cIdx === c ? val : col))
    );
    setGrid(newGrid);

    // Auto move next in row
    if (val && c < 4) {
      setSelectedCell([r, c + 1]);
    }

    // Check if fully solved
    let isCorrect = true;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (newGrid[i][j] !== solution[i][j]) {
          isCorrect = false;
        }
      }
    }
    if (isCorrect) {
      setSolved(true);
    }
  };

  const handleSolveReveal = () => {
    setGrid(solution);
    setSolved(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[580px] rounded shadow-2xl border border-rule-hairline p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="w-5 h-5 bg-action-blue text-white flex items-center justify-center font-bold text-xs rounded-sm">
            M
          </span>
          <h2 className="font-serif text-2xl font-bold">The Mini Crossword</h2>
        </div>
        <span className="text-[11px] font-sans text-text-muted block mb-4">5×5 Daily Quick Puzzle</span>

        {solved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded mb-4 font-sans text-xs text-center font-bold">
            🎉 Congratulations! You completed The Mini Crossword!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 5x5 Grid */}
          <div className="md:col-span-6 flex flex-col items-center">
            <div className="grid grid-cols-5 gap-1 bg-stone-900 p-1 rounded-sm shadow-md">
              {grid.map((row, r) =>
                row.map((cell, c) => {
                  const isSelected = selectedCell[0] === r && selectedCell[1] === c;
                  return (
                    <div key={`${r}-${c}`} className="relative w-11 h-11 bg-white">
                      {c === 0 && (
                        <span className="absolute top-0.5 left-0.5 text-[9px] font-sans text-text-muted font-bold select-none">
                          {r + 1}
                        </span>
                      )}
                      <input
                        type="text"
                        maxLength={1}
                        value={cell}
                        onChange={e => handleCellChange(r, c, e.target.value)}
                        onFocus={() => setSelectedCell([r, c])}
                        className={`w-full h-full text-center font-sans font-bold text-lg uppercase focus:outline-none ${
                          isSelected ? 'bg-amber-100' : 'bg-white'
                        }`}
                      />
                    </div>
                  );
                })
              )}
            </div>

            <button
              onClick={handleSolveReveal}
              className="mt-4 text-xs font-sans text-action-blue hover:underline cursor-pointer"
            >
              Reveal Puzzle Solution
            </button>
          </div>

          {/* Clues */}
          <div className="md:col-span-6 font-sans text-xs space-y-4">
            <div>
              <h4 className="font-bold uppercase tracking-wider text-primary border-b border-rule-hairline pb-1 mb-1.5">
                Across
              </h4>
              <ul className="space-y-1 text-on-surface">
                {clues.across.map(c => (
                  <li key={c.num} className="leading-snug">
                    <strong className="text-primary">{c.num}.</strong> {c.text}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider text-primary border-b border-rule-hairline pb-1 mb-1.5">
                Down
              </h4>
              <ul className="space-y-1 text-text-muted">
                {clues.down.map(c => (
                  <li key={c.num} className="leading-snug">
                    <strong className="text-primary">{c.num}.</strong> {c.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
