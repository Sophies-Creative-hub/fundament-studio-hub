import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RefreshCw } from 'lucide-react';

const INITIAL_CARDS = [
  { id: 1, title: 'Slider Revolution', desc: 'Sieht schick aus, lädt aber 2MB extra Skripte.', bloat: 40, utility: 10 },
  { id: 2, title: 'Elementor Pro', desc: 'Macht das Designen einfach, aber bläht den Code auf.', bloat: 35, utility: 40 },
  { id: 3, title: 'Caching Plugin', desc: 'Speichert Seiten statisch ab. Macht WordPress viel schneller.', bloat: -30, utility: 40 },
  { id: 4, title: '15 inaktive Plugins', desc: '"Vielleicht brauche ich die irgendwann noch..."', bloat: 25, utility: 0 },
  { id: 5, title: 'Optimierte WebP Bilder', desc: 'Kleine Dateigröße, gleiche Qualität.', bloat: -30, utility: 30 },
  { id: 6, title: 'WooCommerce für 1 Produkt', desc: 'Ein riesiges Shop-System für ein einziges E-Book.', bloat: 50, utility: 15 },
  { id: 7, title: 'Leichtes Theme (z.B. GeneratePress)', desc: 'Sauberer Code, extrem schnelle Ladezeiten.', bloat: -40, utility: 50 },
];

export function SwipeTheBloat() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [score, setScore] = useState({ performance: 100, features: 0 });
  const [gameOver, setGameOver] = useState(false);

  const handleSwipe = (keep: boolean) => {
    const currentCard = cards[0];
    
    if (keep) {
      setScore(s => ({
        performance: Math.max(0, Math.min(100, s.performance - currentCard.bloat)),
        features: s.features + currentCard.utility
      }));
    } else {
      setScore(s => ({
        performance: Math.max(0, Math.min(100, s.performance + (currentCard.bloat > 0 ? 10 : -10))),
        features: Math.max(0, s.features - (currentCard.utility / 2))
      }));
    }

    const nextCards = cards.slice(1);
    setCards(nextCards);
    
    if (nextCards.length === 0 || score.performance <= 0) {
      setGameOver(true);
    }
  };

  const restart = () => {
    setCards(INITIAL_CARDS.sort(() => Math.random() - 0.5));
    setScore({ performance: 100, features: 0 });
    setGameOver(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-2xl mx-auto flex flex-col items-center min-h-[80vh]">
      <div className="w-full flex justify-between items-center mb-8 bg-card p-4 rounded-2xl border border-border shadow-[2px_2px_0px_0px_#3E2723]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-dim">Performance</p>
          <p className={`text-2xl font-display font-bold ${score.performance < 30 ? 'text-red-500' : 'text-emerald-500'}`}>
            {score.performance}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-dim">Features</p>
          <p className="text-2xl font-display font-bold text-accent">{Math.round(score.features)}</p>
        </div>
      </div>

      {!gameOver && cards.length > 0 ? (
        <div className="relative w-full max-w-sm aspect-[3/4] flex-grow">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={cards[0].id}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              className="absolute inset-0 bg-card border-2 border-border rounded-3xl shadow-[4px_4px_0px_0px_#3E2723] p-8 flex flex-col justify-center items-center text-center"
            >
              <h2 className="font-display text-3xl font-bold text-text mb-4">{cards[0].title}</h2>
              <p className="text-dim mb-8">{cards[0].desc}</p>
              
              <div className="flex gap-4 w-full mt-auto">
                <button 
                  onClick={() => handleSwipe(false)}
                  className="flex-1 py-4 bg-red-100 text-red-600 border border-red-200 rounded-xl font-bold flex justify-center items-center hover:bg-red-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => handleSwipe(true)}
                  className="flex-1 py-4 bg-emerald-100 text-emerald-600 border border-emerald-200 rounded-xl font-bold flex justify-center items-center hover:bg-emerald-200 transition-colors"
                >
                  <Check className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="bg-card border-2 border-border rounded-3xl shadow-[4px_4px_0px_0px_#3E2723] p-8 text-center w-full max-w-sm">
          <h2 className="font-display text-3xl font-bold text-text mb-4">
            {score.performance <= 0 ? 'Server Crash!' : 'Fertig!'}
          </h2>
          <p className="text-dim mb-6">
            {score.performance <= 0 
              ? 'Du hast zu viel Bloat behalten. Die Seite lädt nicht mehr.' 
              : `Gute Balance! Performance: ${score.performance}%, Features: ${Math.round(score.features)}`}
          </p>
          <button onClick={restart} className="brutal-btn w-full flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5" /> Noch mal spielen
          </button>
        </div>
      )}
    </div>
  );
}
