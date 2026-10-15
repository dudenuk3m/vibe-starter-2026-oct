import React, { useState } from 'react';

interface ConfidentialTipModalProps {
  onClose: () => void;
}

export const ConfidentialTipModal: React.FC<ConfidentialTipModalProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [tipDetails, setTipDetails] = useState('');
  const [desk, setDesk] = useState('Investigations');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipDetails.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[560px] rounded shadow-2xl border border-rule-hairline p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-breaking-red block mb-1">
          Confidential Source Desk
        </span>
        <h2 className="font-serif text-2xl font-bold text-primary mb-2">Got a Confidential Tip?</h2>
        <p className="font-sans text-xs text-text-muted mb-6">
          The New York Times welcomes news tips from whistleblowers, public servants, and industry insiders. We protect our sources rigorously.
        </p>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded text-center">
            <span className="material-symbols-outlined text-emerald-600 text-3xl mb-2">lock</span>
            <h3 className="font-serif text-lg font-bold text-emerald-900 mb-1">
              Encrypted Submission Received
            </h3>
            <p className="font-sans text-xs text-emerald-800 mb-4">
              Your submission has been securely routed to the {desk} investigative desk. No IP address or device metadata was logged.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-emerald-700 text-white font-sans text-xs font-bold uppercase rounded cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-primary mb-1">
                Target Investigative Desk
              </label>
              <select
                value={desk}
                onChange={e => setDesk(e.target.value)}
                className="w-full bg-surface-container-low border border-rule-hairline p-2 text-xs font-sans rounded focus:outline-none focus:border-action-blue"
              >
                <option value="Investigations">Investigations & Special Projects</option>
                <option value="Washington Bureau">Washington Bureau (White House / Congress)</option>
                <option value="National Security">National Security & Intelligence</option>
                <option value="Business & Finance">Business & Corporate Integrity</option>
                <option value="Technology">Technology & Artificial Intelligence</option>
              </select>
            </div>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-primary mb-1">
                Tip Information or Document Description
              </label>
              <textarea
                value={tipDetails}
                onChange={e => setTipDetails(e.target.value)}
                rows={4}
                required
                placeholder="Describe the matter with as much specific factual evidence, dates, and names as possible..."
                className="w-full bg-surface-container-low border border-rule-hairline p-2.5 text-xs font-sans rounded focus:outline-none focus:border-action-blue resize-none"
              />
            </div>

            <div className="p-3 bg-stone-100 rounded text-[11px] font-sans text-text-muted space-y-1">
              <div className="font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">shield</span> Alternative High-Security Channels:
              </div>
              <div>• <strong>Signal:</strong> +1 (202) 555-0199 (Encrypted end-to-end)</div>
              <div>• <strong>SecureDrop:</strong> Accessible via the Tor browser for complete anonymity</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-rule-hairline text-xs font-sans uppercase font-bold text-text-muted hover:text-primary rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-action-blue hover:bg-[#446277] text-white text-xs font-sans uppercase font-bold rounded cursor-pointer transition-colors"
              >
                Submit Secure Tip
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
