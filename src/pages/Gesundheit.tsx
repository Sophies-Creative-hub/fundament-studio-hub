import { motion } from "motion/react";
import { Activity, FastForward, MousePointerClick, Move, Zap } from "lucide-react";

const vitals = [
  {
    name: "First Contentful Paint",
    short: "FCP",
    desc: "Wann wird das erste Text- oder Bildelement auf dem Bildschirm gezeichnet?",
    icon: FastForward
  },
  {
    name: "Largest Contentful Paint",
    short: "LCP",
    desc: "Wie lange dauert es, bis das größte Element (meist ein Hero-Bild oder Textblock) sichtbar ist?",
    icon: Zap
  },
  {
    name: "Total Blocking Time",
    short: "TBT",
    desc: "Wie lange ist die Seite durch Skripte blockiert und kann nicht auf Eingaben reagieren?",
    icon: MousePointerClick
  },
  {
    name: "Cumulative Layout Shift",
    short: "CLS",
    desc: "Verschieben sich Elemente unerwartet, während die Seite lädt?",
    icon: Move
  },
  {
    name: "Speed Index",
    short: "SI",
    desc: "Wie schnell füllt sich die Seite visuell mit Inhalten?",
    icon: Activity
  }
];

export function Gesundheit() {
  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-4xl mx-auto">
      <p className="font-display text-[0.65rem] font-bold tracking-[0.22em] uppercase text-accent mb-4">Gesundheit</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-text mb-3">Wie gesund ist deine Website?</h1>
      <p className="text-dim text-base leading-relaxed mb-8 md:mb-12 max-w-2xl">
        Die Leistungsbewertung wird direkt aus diesen Messwerten berechnet. Eine optimierte Seite erreicht hier Bestwerte.
      </p>

      {/* Score Scale */}
      <div className="brutal-card p-6 sm:p-8 mb-8">
        <h2 className="font-display font-bold text-xl text-text mb-6 text-center">PageSpeed Leistungsbewertung</h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="font-mono text-sm font-bold text-red-600">0–49</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-500"></div>
            <span className="font-mono text-sm font-bold text-amber-600">50–89</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
            <span className="font-mono text-sm font-bold text-emerald-600">90–100</span>
          </div>
        </div>
      </div>

      {/* Metrics List */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-text mb-4 px-2">Messwerte (Ansicht maximieren)</h3>
        {vitals.map((vital, index) => {
          const Icon = vital.icon;
          return (
            <motion.div 
              key={vital.name}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 brutal-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-inv border border-border shadow-[1px_1px_0px_0px_#3E2723] flex items-center justify-center shrink-0 mt-1 sm:mt-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-display font-bold text-text">{vital.name}</h4>
                    <span className="text-[10px] font-mono bg-bg px-1.5 py-0.5 rounded text-dim border border-border">{vital.short}</span>
                  </div>
                  <p className="text-sm text-dim">{vital.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
