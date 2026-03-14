import { useState, useEffect } from 'react';
import { X, RefreshCw } from 'lucide-react';

interface Popup {
  id: number;
  x: number;
  y: number;
  title: string;
  zIndex: number;
}

const POPUP_TITLES = [
  "Premium Theme kaufen!",
  "Wir nutzen Cookies",
  "WooCommerce Update verfügbar",
  "10% Rabatt auf dieses Plugin!",
  "Bitte deaktiviere deinen Adblocker",
  "Nimm an unserer Umfrage teil",
  "Chatte jetzt mit uns!",
  "PHP Version veraltet",
];

export function PopupHoelle() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [won, setWon] = useState(false);
  const [time, setTime] = useState(0);

  const startGame = () => {
    setPopups([]);
    setIsPlaying(true);
    setWon(false);
    setTime(0);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !won) {
      timer = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, won]);

  useEffect(() => {
    let spawner: NodeJS.Timeout;
    if (isPlaying && !won) {
      const spawn = () => {
        setPopups(prev => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 60 + 10, // 10% to 70%
            y: Math.random() * 60 + 10,
            title: POPUP_TITLES[Math.floor(Math.random() * POPUP_TITLES.length)],
            zIndex: prev.length + 10,
          }
        ]);
        spawner = setTimeout(spawn, Math.max(300, 2000 - time * 100)); // Gets faster
      };
      spawn();
    }
    return () => clearTimeout(spawner);
  }, [isPlaying, won, time]);

  const closePopup = (id: number) => {
    setPopups(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-4xl mx-auto relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden border border-border bg-card rounded-2xl shadow-[2px_2px_0px_0px_#3E2723]">
      
      {!isPlaying && !won ? (
        <div className="text-center z-50 bg-card p-8 rounded-2xl border border-border shadow-[4px_4px_0px_0px_#3E2723]">
          <h2 className="font-display text-3xl font-bold text-text mb-4">Die Popup-Hölle</h2>
          <p className="text-dim mb-6 max-w-sm">Schließe alle nervigen Popups und klicke auf "Artikel lesen", bevor der Bildschirm voll ist.</p>
          <button onClick={startGame} className="brutal-btn w-full">Start</button>
        </div>
      ) : won ? (
        <div className="text-center z-50 bg-card p-8 rounded-2xl border border-border shadow-[4px_4px_0px_0px_#3E2723]">
          <h2 className="font-display text-3xl font-bold text-emerald-600 mb-4">Geschafft!</h2>
          <p className="text-dim mb-6">Du hast den Artikel nach {time} Sekunden erreicht.</p>
          <button onClick={startGame} className="brutal-btn w-full flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5" /> Noch mal
          </button>
        </div>
      ) : (
        <>
          <div className="absolute top-4 right-4 font-bold text-accent z-0">Zeit: {time}s</div>
          
          {/* The Goal */}
          <button 
            onClick={() => {
              if (popups.length === 0) setWon(true);
            }}
            className={`px-8 py-4 text-xl font-bold rounded-xl border-2 transition-all ${
              popups.length === 0 
                ? 'bg-emerald-500 text-inv border-border shadow-[4px_4px_0px_0px_#3E2723] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#3E2723] cursor-pointer' 
                : 'bg-bg text-dim border-dim/30 cursor-not-allowed'
            }`}
          >
            Artikel lesen
          </button>

          <button 
            onClick={() => { setIsPlaying(false); setPopups([]); setTime(0); }} 
            className="absolute bottom-4 right-4 px-4 py-2 bg-card text-dim border border-border rounded-lg hover:bg-border/50 transition-colors z-0"
          >
            Abbrechen
          </button>

          {/* Popups */}
          {popups.map(popup => (
            <div 
              key={popup.id}
              className="absolute bg-card border-2 border-border shadow-[4px_4px_0px_0px_#3E2723] rounded-lg p-4 min-w-[200px] animate-in fade-in zoom-in duration-200"
              style={{ 
                left: `${popup.x}%`, 
                top: `${popup.y}%`,
                zIndex: popup.zIndex 
              }}
            >
              <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
                <span className="font-bold text-sm">{popup.title}</span>
                <button 
                  onClick={() => closePopup(popup.id)}
                  className="w-6 h-6 bg-red-500 text-inv rounded flex items-center justify-center border border-border hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="h-16 bg-bg rounded border border-border/30"></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
