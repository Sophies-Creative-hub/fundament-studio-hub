import { Link } from "react-router-dom";
import { CheckSquare, Layers, SlidersHorizontal, ShieldAlert, UserCircle, Network, HeartPulse, Gamepad2 } from "lucide-react";

const tools = [
  { name: "Fundament Tracker", href: "/fundament-tracker", icon: CheckSquare, desc: "Wie stabil ist dein digitales Fundament? 10-Punkte Check." },
  { name: "Tech Stack", href: "/tech-stack", icon: Layers, desc: "Mein Tech-Stack — und warum ich ihn nutze." },
  { name: "Vorher / Nachher", href: "/vorher-nachher", icon: SlidersHorizontal, desc: "Was sich wirklich ändert. Zahlen statt nur Optik." },
  { name: "Wartungsrisiko", href: "/wartungsrisiko", icon: ShieldAlert, desc: "Wie sicher ist deine Website gerade? 5-Minuten Risiko-Check." },
  { name: "Website Typ", href: "/website-typ", icon: UserCircle, desc: "Welcher Website-Typ bist du? Finde es heraus." },
  { name: "System Map", href: "/system-map", icon: Network, desc: "Wie hängt alles zusammen? Interaktive Visualisierung." },
  { name: "Gesundheit", href: "/gesundheit", icon: HeartPulse, desc: "Wie gesund ist deine Website? Core Web Vitals & mehr." },
  { name: "Arcade", href: "/arcade", icon: Gamepad2, desc: "Gamification trifft auf Web-Performance. 6 Mini-Games." },
];

export function Home() {
  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-5xl mx-auto">
      <p className="font-display text-[0.65rem] font-bold tracking-[0.22em] uppercase text-accent mb-4">Übersicht</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-text mb-3">Alle Diagnose-Tools</h1>
      <p className="text-dim text-base leading-relaxed max-w-2xl mb-8 md:mb-12">
        Hier findest du alle interaktiven Checks und Tools, um den Status deiner aktuellen Website zu analysieren und das Potenzial für Verbesserungen aufzudecken.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            to={tool.href}
            className="group brutal-card brutal-card-hover p-5 md:p-6 block"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-card border border-border shadow-[2px_2px_0px_0px_#3E2723] flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-inv transition-colors text-text">
                <tool.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-text mb-1 group-hover:text-accent transition-colors">{tool.name}</h2>
                <p className="text-sm text-dim leading-relaxed">{tool.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
