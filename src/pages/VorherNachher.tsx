import { useState } from "react";

export function VorherNachher() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-5xl mx-auto">
      <p className="font-display text-[0.65rem] font-bold tracking-[0.22em] uppercase text-accent mb-4">Vorher / Nachher</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-text mb-3">Der Unterschied wird sichtbar.</h1>
      <p className="text-dim text-base leading-relaxed mb-8 max-w-2xl">
        Zieh den Slider, um den Unterschied zwischen einer überladenen Standard-Website und einem optimierten Fundament zu sehen.
      </p>

      {/* Slider Container */}
      <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden select-none mb-12 brutal-card">
        
        {/* After (Optimized) - Bottom Layer */}
        <div className="absolute inset-0 bg-emerald-950 flex flex-col items-center justify-center p-6 sm:p-12 text-center">
          <div className="w-[280px] sm:w-[400px]">
            <h3 className="text-emerald-400 font-display text-3xl sm:text-5xl font-bold mb-4">Optimiert</h3>
            <div className="space-y-4 text-emerald-200/80 text-sm sm:text-base">
              <div className="flex justify-between border-b border-emerald-800/50 pb-2">
                <span>Ladezeit</span><span className="font-bold text-emerald-400">0.8s</span>
              </div>
              <div className="flex justify-between border-b border-emerald-800/50 pb-2">
                <span>PageSpeed Score</span><span className="font-bold text-emerald-400">100 / 100</span>
              </div>
              <div className="flex justify-between border-b border-emerald-800/50 pb-2">
                <span>DOM-Größe</span><span className="font-bold text-emerald-400">150 KB</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Plugins</span><span className="font-bold text-emerald-400">6</span>
              </div>
            </div>
          </div>
        </div>

        {/* Before (Bloated) - Top Layer (Clipped) */}
        <div 
          className="absolute inset-0 bg-red-950 flex flex-col items-center justify-center p-6 sm:p-12 text-center border-r-2 border-border"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          <div className="w-[280px] sm:w-[400px]">
            <h3 className="text-red-400 font-display text-3xl sm:text-5xl font-bold mb-4">Überladen</h3>
            <div className="space-y-4 text-red-200/80 text-sm sm:text-base">
              <div className="flex justify-between border-b border-red-800/50 pb-2">
                <span>Ladezeit</span><span className="font-bold text-red-400">4.5s</span>
              </div>
              <div className="flex justify-between border-b border-red-800/50 pb-2">
                <span>PageSpeed Score</span><span className="font-bold text-red-400">35 / 100</span>
              </div>
              <div className="flex justify-between border-b border-red-800/50 pb-2">
                <span>DOM-Größe</span><span className="font-bold text-red-400">2.4 MB</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Plugins</span><span className="font-bold text-red-400">34</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-border pointer-events-none"
          style={{ left: `calc(${sliderPos}% - 2px)` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent border border-border rounded-full flex items-center justify-center shadow-[1px_1px_0px_0px_#3E2723]">
            <svg className="w-5 h-5 text-inv" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
            </svg>
          </div>
        </div>

        {/* Invisible Range Input */}
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderPos} 
          onChange={(e) => setSliderPos(Number(e.target.value))} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10" 
        />
      </div>
    </div>
  );
}
