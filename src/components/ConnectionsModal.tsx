import React, { useState } from 'react';

interface ConnectionsModalProps {
  onClose: () => void;
}

interface CategoryGroup {
  category: string;
  items: string[];
  color: string;
}

const CATEGORIES: CategoryGroup[] = [
  {
    category: 'TYPES OF JOURNALISM',
    items: ['INVESTIGATIVE', 'BROADSHEET', 'OPINION', 'TABLOID'],
    color: 'bg-[#f9df6d] text-stone-900', // Yellow (easy)
  },
  {
    category: 'NEWSPAPER SECTIONS',
    items: ['METRO', 'BUSINESS', 'SPORTS', 'CULTURE'],
    color: 'bg-[#a0c35a] text-stone-900', // Green
  },
  {
    category: 'THINGS ASSOCIATED WITH PRINTING',
    items: ['INK', 'PRESS', 'TYPEFACE', 'PLATES'],
    color: 'bg-[#b0c4de] text-stone-900', // Blue
  },
  {
    category: 'WORDS BEFORE "ROOM"',
    items: ['NEWS', 'PRESS', 'LIVING', 'WAITING'],
    color: 'bg-[#ba81c5] text-white', // Purple
  },
];

export const ConnectionsModal: React.FC<ConnectionsModalProps> = ({ onClose }) => {
  // Flatten initial items
  const [solvedCategories, setSolvedCategories] = useState<CategoryGroup[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [mistakesRemaining, setMistakesRemaining] = useState(4);
  const [unsolvedWords, setUnsolvedWords] = useState<string[]>(() => {
    const all = [
      'INVESTIGATIVE', 'BROADSHEET', 'OPINION', 'TABLOID',
      'METRO', 'BUSINESS', 'SPORTS', 'CULTURE',
      'INK', 'PRESS', 'TYPEFACE', 'PLATES',
      'NEWS', 'PRESS', 'LIVING', 'WAITING',
    ];
    // Remove duplicates or rename if needed: wait, in CATEGORIES we have PRESS twice. Let's make items unique:
    // Category 3: INK, ROLLER, TYPEFACE, PLATES
    // Category 4: NEWS, BRIEFING, LIVING, WAITING
    return [
      'INVESTIGATIVE', 'METRO', 'INK', 'NEWS',
      'BROADSHEET', 'BUSINESS', 'ROLLER', 'BRIEFING',
      'OPINION', 'SPORTS', 'TYPEFACE', 'LIVING',
      'TABLOID', 'CULTURE', 'PLATES', 'WAITING',
    ].sort(() => Math.random() - 0.5);
  });
  const [message, setMessage] = useState<string | null>(null);

  const realCategories: CategoryGroup[] = [
    { category: 'TYPES OF JOURNALISM', items: ['INVESTIGATIVE', 'BROADSHEET', 'OPINION', 'TABLOID'], color: 'bg-[#f9df6d] text-stone-900' },
    { category: 'NEWSPAPER SECTIONS', items: ['METRO', 'BUSINESS', 'SPORTS', 'CULTURE'], color: 'bg-[#a0c35a] text-stone-900' },
    { category: 'PRINTING ARTIFACTS', items: ['INK', 'ROLLER', 'TYPEFACE', 'PLATES'], color: 'bg-[#b0c4de] text-stone-900' },
    { category: 'WORDS BEFORE "ROOM"', items: ['NEWS', 'BRIEFING', 'LIVING', 'WAITING'], color: 'bg-[#ba81c5] text-white' },
  ];

  const handleSelect = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) return;

    // Check if selectedWords match any unsolved category
    const matchedCategory = realCategories.find(cat => {
      if (solvedCategories.some(sc => sc.category === cat.category)) return false;
      return cat.items.every(item => selectedWords.includes(item));
    });

    if (matchedCategory) {
      setSolvedCategories([...solvedCategories, matchedCategory]);
      setUnsolvedWords(unsolvedWords.filter(w => !matchedCategory.items.includes(w)));
      setSelectedWords([]);
      setMessage('Category Solved!');
      setTimeout(() => setMessage(null), 1500);
    } else {
      setMistakesRemaining(prev => Math.max(0, prev - 1));
      setMessage('Not quite right');
      setTimeout(() => setMessage(null), 1500);
    }
  };

  const handleShuffle = () => {
    setUnsolvedWords([...unsolvedWords].sort(() => Math.random() - 0.5));
  };

  const handleDeselectAll = () => {
    setSelectedWords([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[540px] rounded-lg shadow-2xl p-6 border border-rule-hairline flex flex-col items-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="text-center border-b border-rule-hairline w-full pb-3 mb-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 bg-[#b4a8ff] text-white flex items-center justify-center font-bold text-xs rounded-sm">
              C
            </span>
            <h2 className="font-serif text-2xl font-bold tracking-tight">Connections</h2>
          </div>
          <span className="text-[11px] font-sans text-text-muted">Create four groups of four!</span>
        </div>

        {message && (
          <div className="mb-3 px-3 py-1 bg-stone-900 text-white font-sans text-xs rounded animate-bounce">
            {message}
          </div>
        )}

        {/* Solved Categories */}
        <div className="w-full space-y-2 mb-3">
          {solvedCategories.map(cat => (
            <div key={cat.category} className={`p-3 rounded text-center font-sans ${cat.color}`}>
              <div className="font-bold text-xs uppercase">{cat.category}</div>
              <div className="text-xs tracking-wider">{cat.items.join(', ')}</div>
            </div>
          ))}
        </div>

        {/* Unsolved Words Grid (4 columns) */}
        {unsolvedWords.length > 0 && (
          <div className="grid grid-cols-4 gap-2 w-full mb-6">
            {unsolvedWords.map(word => {
              const isSelected = selectedWords.includes(word);
              return (
                <button
                  key={word}
                  onClick={() => handleSelect(word)}
                  className={`h-16 rounded font-sans font-bold text-[11px] sm:text-xs uppercase flex items-center justify-center text-center p-1 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-stone-800 text-white scale-[0.98]'
                      : 'bg-stone-200 text-stone-900 hover:bg-stone-300'
                  }`}
                >
                  {word}
                </button>
              );
            })}
          </div>
        )}

        {/* Mistakes remaining */}
        <div className="flex items-center gap-1.5 mb-4 text-xs font-sans text-text-muted">
          <span>Mistakes remaining:</span>
          <div className="flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < mistakesRemaining ? 'bg-stone-700' : 'bg-stone-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="px-4 py-2 border border-rule-heavy rounded text-xs font-sans font-bold uppercase hover:bg-surface-container cursor-pointer"
          >
            Shuffle
          </button>
          <button
            onClick={handleDeselectAll}
            className="px-4 py-2 border border-rule-heavy rounded text-xs font-sans font-bold uppercase hover:bg-surface-container cursor-pointer"
          >
            Deselect All
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedWords.length !== 4}
            className={`px-5 py-2 rounded text-xs font-sans font-bold uppercase cursor-pointer transition-colors ${
              selectedWords.length === 4
                ? 'bg-primary text-white hover:bg-stone-800'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
