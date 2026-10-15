import React, { useState, useEffect } from 'react';
import { Recipe } from '../data/nytData';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      // chime
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const startQuickTimer = (mins: number) => {
    setTimerSeconds(mins * 60);
    setTimerActive(true);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-0 md:p-4 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[850px] min-h-screen md:min-h-0 md:rounded-sm shadow-2xl overflow-hidden flex flex-col my-auto border border-rule-hairline">
        
        {/* Top Header */}
        <div className="sticky top-0 z-30 bg-canvas-white/95 backdrop-blur-md border-b border-rule-hairline px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-breaking-red">
              NYT Cooking
            </span>
            <span className="text-text-muted">•</span>
            <span className="font-serif text-sm italic">{recipe.yield}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Recipe Content */}
        <div className="p-6 md:p-10 max-w-[760px] mx-auto w-full">
          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">
            {recipe.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-text-muted pb-4 border-b border-rule-hairline mb-6">
            <span className="font-semibold text-primary">By {recipe.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-amber-500">star</span>
              <strong className="text-primary">{recipe.rating}</strong> ({recipe.ratingCount.toLocaleString()} ratings)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">schedule</span>
              {recipe.time}
            </span>
          </div>

          {/* Hero Image */}
          <div className="relative mb-6 rounded overflow-hidden shadow-sm bg-surface-container">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-80 object-cover"
            />
          </div>

          <p className="font-serif text-[17px] leading-relaxed text-on-surface mb-6">
            {recipe.description}
          </p>

          {/* Chef Note */}
          {recipe.chefNote && (
            <div className="bg-opinion-cream p-4 border border-rule-hairline rounded mb-8">
              <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-primary mb-1">
                Cook's Note
              </h4>
              <p className="font-serif italic text-sm text-on-surface-variant">
                “{recipe.chefNote}”
              </p>
            </div>
          )}

          {/* Cooking Kitchen Timer Widget */}
          <div className="bg-surface-bright border border-rule-hairline p-4 rounded mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-action-blue text-[26px]">timer</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider font-sans block text-primary">
                  Kitchen Timer
                </span>
                <span className="font-mono text-2xl font-bold text-primary">
                  {formatTimer(timerSeconds)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => startQuickTimer(5)}
                className="px-2.5 py-1 text-xs border border-rule-hairline rounded bg-white hover:bg-surface-container font-sans cursor-pointer"
              >
                +5 Min
              </button>
              <button
                onClick={() => startQuickTimer(20)}
                className="px-2.5 py-1 text-xs border border-rule-hairline rounded bg-white hover:bg-surface-container font-sans cursor-pointer"
              >
                +20 Min
              </button>
              {timerSeconds > 0 && (
                <button
                  onClick={() => setTimerActive(!timerActive)}
                  className="px-3 py-1 text-xs bg-action-blue text-white rounded font-sans cursor-pointer font-bold"
                >
                  {timerActive ? 'Pause' : 'Resume'}
                </button>
              )}
              {timerSeconds > 0 && (
                <button
                  onClick={() => {
                    setTimerSeconds(0);
                    setTimerActive(false);
                  }}
                  className="px-2 py-1 text-xs text-text-muted hover:text-breaking-red font-sans cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Ingredients & Prep */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Ingredients column */}
            <div className="md:col-span-5 border-r md:pr-6 border-rule-hairline">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-bold text-primary">Ingredients</h3>
                <div className="flex items-center gap-1 text-xs font-sans">
                  <span className="text-text-muted">Scale:</span>
                  <button
                    onClick={() => setServingsMultiplier(1)}
                    className={`px-1.5 py-0.5 rounded ${servingsMultiplier === 1 ? 'font-bold bg-stone-200' : 'text-text-muted'}`}
                  >
                    1x
                  </button>
                  <button
                    onClick={() => setServingsMultiplier(2)}
                    className={`px-1.5 py-0.5 rounded ${servingsMultiplier === 2 ? 'font-bold bg-stone-200' : 'text-text-muted'}`}
                  >
                    2x
                  </button>
                </div>
              </div>

              <p className="text-[11px] font-sans text-text-muted mb-3 italic">
                Check items off as you prep
              </p>

              <ul className="space-y-2.5 font-sans text-sm">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = !!checkedIngredients[idx];
                  return (
                    <li
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`flex items-start gap-2.5 p-1 rounded cursor-pointer transition-colors hover:bg-surface-container-low ${
                        isChecked ? 'line-through text-text-muted opacity-60' : 'text-on-surface'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-1 cursor-pointer accent-action-blue"
                      />
                      <span>
                        <strong className="font-semibold">{ing.amount}</strong> {ing.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Preparation column */}
            <div className="md:col-span-7">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Preparation</h3>
              <ol className="space-y-6 font-serif text-[16px] leading-relaxed">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="font-sans font-bold text-sm text-text-muted w-6 shrink-0 mt-0.5">
                      Step {idx + 1}
                    </span>
                    <p className="text-on-surface">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
