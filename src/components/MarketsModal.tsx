import React from 'react';

interface MarketsModalProps {
  onClose: () => void;
}

export const MarketsModal: React.FC<MarketsModalProps> = ({ onClose }) => {
  const marketIndices = [
    { name: 'S&P 500', value: '5,862.14', change: '+24.62', pct: '+0.42%', positive: true },
    { name: 'Dow Jones', value: '43,065.22', change: '+132.88', pct: '+0.31%', positive: true },
    { name: 'Nasdaq Composite', value: '18,485.40', change: '+118.90', pct: '+0.65%', positive: true },
    { name: 'Russell 2000', value: '2,274.50', change: '-4.20', pct: '-0.18%', positive: false },
    { name: '10-Yr U.S. Note', value: '4.12%', change: '+0.03', pct: '+0.73%', positive: false },
    { name: 'Brent Crude', value: '$78.42', change: '+0.88', pct: '+1.13%', positive: true },
    { name: 'Gold (oz)', value: '$2,684.50', change: '+12.40', pct: '+0.46%', positive: true },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-canvas-white text-on-surface w-full max-w-[600px] rounded shadow-2xl border border-rule-hairline p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Weather Snapshot */}
        <div className="mb-6 pb-6 border-b border-rule-hairline">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-action-blue">
              Local Weather
            </span>
            <span className="text-xs font-sans text-text-muted">New York, NY</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[42px] text-amber-500">partly_cloudy_day</span>
            <div>
              <div className="text-3xl font-serif font-bold text-primary">68°F</div>
              <div className="text-xs font-sans text-text-muted">
                Partly Cloudy • High 72°F / Low 54°F • Humidity 58% • Wind 9 mph
              </div>
            </div>
          </div>
        </div>

        {/* Financial Markets */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-action-blue flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-breaking-red animate-pulse"></span>
              Live Financial Markets
            </span>
            <span className="text-[11px] font-sans text-text-muted">NYSE / NASDAQ • 15m Delayed</span>
          </div>

          <div className="divide-y divide-rule-hairline">
            {marketIndices.map(m => (
              <div key={m.name} className="py-2.5 flex items-center justify-between font-sans text-xs">
                <div>
                  <span className="font-bold text-primary block">{m.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-sm text-primary block">{m.value}</span>
                  <span
                    className={`font-mono text-xs font-semibold ${
                      m.positive ? 'text-emerald-700' : 'text-breaking-red'
                    }`}
                  >
                    {m.change} ({m.pct})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
