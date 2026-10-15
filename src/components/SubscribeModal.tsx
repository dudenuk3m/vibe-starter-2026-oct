import React, { useState } from 'react';

interface SubscribeModalProps {
  onClose: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'all-access'>('all-access');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[620px] rounded shadow-2xl border border-rule-hairline p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="text-center mb-6">
          <span className="font-masthead-gothic text-3xl block text-primary mb-2">The New York Times</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Independent journalism for curious minds.
          </h2>
          <p className="font-sans text-xs text-text-muted mt-2">
            Cancel or pause anytime. Offer valid for new subscribers.
          </p>
        </div>

        {subscribed ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded text-center">
            <span className="material-symbols-outlined text-emerald-600 text-4xl mb-2">verified</span>
            <h3 className="font-serif text-xl font-bold text-emerald-900 mb-1">
              Welcome to The New York Times
            </h3>
            <p className="font-sans text-xs text-emerald-700 mb-4">
              Your subscription is active. Enjoy unlimited access across News, Cooking, Games, Wirecutter, and The Athletic.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-xs font-bold uppercase rounded cursor-pointer transition-colors"
            >
              Continue Reading
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* All Access Plan */}
              <div
                onClick={() => setSelectedPlan('all-access')}
                className={`p-4 border-2 rounded cursor-pointer transition-all ${
                  selectedPlan === 'all-access'
                    ? 'border-primary bg-surface-bright shadow-xs'
                    : 'border-rule-hairline hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-sans font-extrabold uppercase bg-breaking-red text-white px-2 py-0.5 rounded-xs">
                    Most Popular
                  </span>
                  <span className="font-mono text-sm font-bold">$1/week</span>
                </div>
                <h4 className="font-serif font-bold text-base text-primary">All Access</h4>
                <p className="font-sans text-[11px] text-text-muted mt-1 mb-3">
                  Billed as $4 every 4 weeks for the first year.
                </p>
                <ul className="space-y-1.5 font-sans text-xs text-on-surface">
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>Unlimited News & Investigations</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>NYT Cooking recipes & pantry tools</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>Full Wordle, Spelling Bee & Crosswords</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>Wirecutter independent reviews</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>The Athletic sports journalism</span>
                  </li>
                </ul>
              </div>

              {/* News Only Plan */}
              <div
                onClick={() => setSelectedPlan('basic')}
                className={`p-4 border-2 rounded cursor-pointer transition-all ${
                  selectedPlan === 'basic'
                    ? 'border-primary bg-surface-bright shadow-xs'
                    : 'border-rule-hairline hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-sans font-bold uppercase text-text-muted">
                    Standard
                  </span>
                  <span className="font-mono text-sm font-bold">$0.75/week</span>
                </div>
                <h4 className="font-serif font-bold text-base text-primary">News Only</h4>
                <p className="font-sans text-[11px] text-text-muted mt-1 mb-3">
                  Essential daily reporting and Washington analysis.
                </p>
                <ul className="space-y-1.5 font-sans text-xs text-on-surface">
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>Unlimited News & Investigations</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>Subscriber-only newsletters</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-text-muted line-through">
                    <span>Cooking & Recipes</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-text-muted line-through">
                    <span>Games & Crosswords</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setSubscribed(true)}
              className="w-full py-3 bg-action-blue hover:bg-[#446277] text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Start Subscription for $1/week
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
