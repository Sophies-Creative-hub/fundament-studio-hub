import { Link } from "react-router-dom";
import { Gamepad2, Ghost, Skull, Zap, Layers, MousePointerClick } from "lucide-react";

const games = [
  { id: "swipe-the-bloat", name: "Swipe the Bloat", icon: Layers, desc: "Tinder für Plugins. Behalten oder löschen?", color: "text-blue-500" },
  { id: "whack-a-bug", name: "Whack-a-Bug", icon: Ghost, desc: "Hau die Bugs weg, bevor der Kunde sie sieht!", color: "text-red-500" },
  { id: "popup-hoelle", name: "Die Popup-Hölle", icon: MousePointerClick, desc: "Schließe alle Popups und lies den Artikel.", color: "text-yellow-500" },
  { id: "lighthouse-sprint", name: "Lighthouse Sprint", icon: Zap, desc: "Spring über Render-Blocking Scripts!", color: "text-emerald-500" },
  { id: "tech-stack-tower", name: "Tech-Stack Tower", icon: Gamepad2, desc: "Staple deinen Stack, ohne dass er umfällt.", color: "text-purple-500" },
  { id: "bloat-invaders", name: "Bloat Invaders", icon: Skull, desc: "Schieß den Bloat ab, bevor er den Server erreicht.", color: "text-accent" },
];

export function GamesHub() {
  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-5xl mx-auto">
      <p className="font-display text-[0.65rem] font-bold tracking-[0.22em] uppercase text-accent mb-4">Arcade</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-text mb-3">Fundament Arcade</h1>
      <p className="text-dim text-base leading-relaxed max-w-2xl mb-8 md:mb-12">
        Gamification trifft auf Web-Performance. Lerne spielerisch, warum ein sauberes WordPress-Fundament wichtig ist. 
        Alle Spiele laufen komplett statisch in deinem Browser.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/arcade/${game.id}`}
            className="group brutal-card brutal-card-hover p-5 md:p-6 block flex flex-col h-full"
          >
            <div className={`w-12 h-12 rounded-xl bg-card border border-border shadow-[1px_1px_0px_0px_#3E2723] flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-inv transition-colors ${game.color}`}>
              <game.icon className="w-6 h-6" />
            </div>
            <h2 className="font-display text-lg font-bold text-text mb-2 group-hover:text-accent transition-colors">{game.name}</h2>
            <p className="text-sm text-dim leading-relaxed flex-grow">{game.desc}</p>
            <div className="mt-4 text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1">
              Spielen <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
