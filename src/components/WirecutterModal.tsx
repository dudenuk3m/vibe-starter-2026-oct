import React from 'react';
import { WirecutterReview } from '../data/nytData';

interface WirecutterModalProps {
  review: WirecutterReview;
  onClose: () => void;
}

export const WirecutterModal: React.FC<WirecutterModalProps> = ({ review, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-0 md:p-4 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[850px] min-h-screen md:min-h-0 md:rounded-sm shadow-2xl overflow-hidden flex flex-col my-auto border border-rule-hairline">
        
        {/* Header */}
        <div className="sticky top-0 z-30 bg-canvas-white/95 backdrop-blur-md border-b border-rule-hairline px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-action-blue">
              Wirecutter
            </span>
            <span className="text-text-muted">•</span>
            <span className="font-sans text-xs text-text-muted uppercase">{review.badge}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 max-w-[760px] mx-auto w-full">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-action-blue block mb-2">
            Independent Buying Guide
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
            {review.title}
          </h1>

          <div className="flex items-center gap-2 text-xs font-sans text-text-muted pb-4 border-b border-rule-hairline mb-6">
            <span className="flex items-center gap-1 font-semibold text-primary">
              <span className="material-symbols-outlined text-[15px] text-action-blue">verified</span>
              {review.testedHours}
            </span>
          </div>

          <p className="font-serif text-[18px] text-on-surface leading-relaxed mb-6">
            {review.summary}
          </p>

          {/* Top Pick Card */}
          <div className="border-2 border-primary p-6 rounded mb-8 bg-surface-bright">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-primary text-white text-[11px] font-sans font-bold uppercase px-2.5 py-1 tracking-wider">
                Our Top Pick
              </span>
              <span className="font-mono text-xl font-bold text-primary">{review.topPick.price}</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-primary mb-2">
              {review.topPick.name}
            </h3>

            <p className="font-serif text-[15px] leading-relaxed text-on-surface-variant mb-4">
              {review.topPick.verdict}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-rule-hairline">
              <div>
                <h4 className="font-sans text-xs font-bold uppercase text-emerald-800 tracking-wider mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  Why We Love It
                </h4>
                <ul className="space-y-1.5 font-sans text-xs text-on-surface">
                  {review.topPick.pros.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-sans text-xs font-bold uppercase text-amber-800 tracking-wider mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">info</span>
                  Things to Keep in Mind
                </h4>
                <ul className="space-y-1.5 font-sans text-xs text-text-muted">
                  {review.topPick.cons.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Runner Up Card */}
          {review.runnerUp && (
            <div className="border border-rule-hairline p-5 rounded bg-surface-container-low mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-action-blue font-sans text-xs font-bold uppercase tracking-wider">
                  The Runner-Up / Great Value
                </span>
                <span className="font-mono font-bold text-primary">{review.runnerUp.price}</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-primary mb-1">
                {review.runnerUp.name}
              </h4>
              <p className="font-serif text-sm text-on-surface-variant">
                {review.runnerUp.verdict}
              </p>
            </div>
          )}

          {/* Testing Methodology */}
          <div className="pt-6 border-t border-rule-hairline font-serif text-sm text-text-muted">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-primary mb-2">
              How We Evaluated
            </h4>
            <p>
              Wirecutter testers do not accept free review samples from manufacturers without strict disclosure protocols. We purchase all consumer hardware anonymously through standard retail outlets and benchmark devices in controlled lab settings.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
