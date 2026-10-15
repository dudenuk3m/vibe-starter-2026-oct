import React, { useState } from 'react';

interface PollsModalProps {
  onClose: () => void;
}

export const PollsModal: React.FC<PollsModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'senate' | 'house' | 'presidential'>('senate');

  const senateRaces = [
    { state: 'Texas', candidateA: 'Colin Allred / Talarico (D)', pctA: 48.4, candidateB: 'Ted Cruz / Incumbent (R)', pctB: 48.1, margin: '+0.3% D', status: 'Tossup' },
    { state: 'Ohio', candidateA: 'Sherrod Brown (D)', pctA: 47.9, candidateB: 'Bernie Moreno (R)', pctB: 48.2, margin: '+0.3% R', status: 'Tossup' },
    { state: 'Montana', candidateA: 'Jon Tester (D)', pctA: 46.5, candidateB: 'Tim Sheehy (R)', pctB: 48.8, margin: '+2.3% R', status: 'Lean R' },
    { state: 'Arizona', candidateA: 'Ruben Gallego (D)', pctA: 50.1, candidateB: 'Kari Lake (R)', pctB: 46.4, margin: '+3.7% D', status: 'Lean D' },
    { state: 'Nevada', candidateA: 'Jacky Rosen (D)', pctA: 49.3, candidateB: 'Sam Brown (R)', pctB: 45.8, margin: '+3.5% D', status: 'Lean D' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[650px] rounded shadow-2xl border border-rule-hairline p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-action-blue block mb-1">
          The New York Times / Siena College Poll
        </span>
        <h2 className="font-serif text-2xl font-bold text-primary mb-2">2026 Midterm Election Polling</h2>
        <p className="font-sans text-xs text-text-muted mb-4">
          Probabilistic polling aggregates calibrated hourly across likely registered voters nationwide. Margin of error ±2.8%.
        </p>

        {/* Tab switcher */}
        <div className="flex border-b border-rule-hairline gap-4 mb-4 font-sans text-xs font-bold">
          <button
            onClick={() => setActiveTab('senate')}
            className={`pb-2 uppercase transition-colors cursor-pointer ${
              activeTab === 'senate' ? 'border-b-2 border-primary text-primary' : 'text-text-muted hover:text-primary'
            }`}
          >
            Senate Battlegrounds
          </button>
          <button
            onClick={() => setActiveTab('house')}
            className={`pb-2 uppercase transition-colors cursor-pointer ${
              activeTab === 'house' ? 'border-b-2 border-primary text-primary' : 'text-text-muted hover:text-primary'
            }`}
          >
            House Generic Ballot
          </button>
          <button
            onClick={() => setActiveTab('presidential')}
            className={`pb-2 uppercase transition-colors cursor-pointer ${
              activeTab === 'presidential' ? 'border-b-2 border-primary text-primary' : 'text-text-muted hover:text-primary'
            }`}
          >
            Approval Rating
          </button>
        </div>

        {activeTab === 'senate' && (
          <div className="space-y-3">
            {senateRaces.map(race => (
              <div key={race.state} className="p-3 bg-surface-bright border border-rule-hairline rounded font-sans text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-primary text-sm font-serif">{race.state}</span>
                  <span className="font-bold px-2 py-0.5 bg-stone-200 text-stone-800 rounded text-[10px]">
                    {race.status} ({race.margin})
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface">{race.candidateA}</span>
                    <span className="font-mono font-bold text-blue-700">{race.pctA}%</span>
                  </div>
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full" style={{ width: `${race.pctA}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-on-surface">{race.candidateB}</span>
                    <span className="font-mono font-bold text-red-700">{race.pctB}%</span>
                  </div>
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full" style={{ width: `${race.pctB}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'house' && (
          <div className="p-4 bg-surface-bright border border-rule-hairline rounded text-center">
            <h3 className="font-serif text-lg font-bold text-primary mb-2">Generic Congressional Ballot</h3>
            <div className="flex justify-center items-center gap-6 my-4 font-mono text-2xl font-bold">
              <span className="text-blue-700">Democrats 48.2%</span>
              <span className="text-text-muted text-base font-normal">vs</span>
              <span className="text-red-700">Republicans 46.4%</span>
            </div>
            <p className="font-sans text-xs text-text-muted">
              Democrats hold a +1.8% edge nationally, driven by suburban districts in the Midwest and Pacific Northwest.
            </p>
          </div>
        )}

        {activeTab === 'presidential' && (
          <div className="p-4 bg-surface-bright border border-rule-hairline rounded text-center">
            <h3 className="font-serif text-lg font-bold text-primary mb-2">Presidential Job Approval</h3>
            <div className="flex justify-center items-center gap-6 my-4 font-mono text-2xl font-bold">
              <span className="text-emerald-700">Approve 42.4%</span>
              <span className="text-text-muted text-base font-normal">vs</span>
              <span className="text-breaking-red">Disapprove 53.1%</span>
            </div>
            <p className="font-sans text-xs text-text-muted">
              Net approval sits at -10.7%, with inflation concerns and overseas conflicts cited as top drivers of disapproval.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
