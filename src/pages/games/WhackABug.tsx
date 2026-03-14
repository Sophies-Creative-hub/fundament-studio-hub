import { useState, useEffect, useCallback } from 'react';
import { Bug, Hammer, RefreshCw } from 'lucide-react';

export function WhackABug() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeBug, setActiveBug] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameOver(false);
  };

  const whack = (index: number) => {
    if (!isPlaying) return;
    if (index === activeBug) {
      setScore(s => s + 1);
      setActiveBug(null);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setGameOver(true);
      setActiveBug(null);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    let bugTimer: NodeJS.Timeout;
    if (isPlaying) {
      const spawnBug = () => {
        const randomCell = Math.floor(Math.random() * 9);
        setActiveBug(randomCell);
        
        // Bugs appear faster as time goes down, but start slower
        const delay = Math.max(800, Math.random() * 1200 + (timeLeft * 30));
        bugTimer = setTimeout(spawnBug, delay);
      };
      spawnBug();
    }
    return () => clearTimeout(bugTimer);
  }, [isPlaying, timeLeft]);

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8 bg-card p-4 rounded-2xl border border-border shadow-[2px_2px_0px_0px_#3E2723]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-dim">Zeit</p>
          <p className={`text-2xl font-display font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-text'}`}>
            {timeLeft}s
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-dim">Bugs gefixt</p>
          <p className="text-2xl font-display font-bold text-accent">{score}</p>
        </div>
      </div>

      {!isPlaying && !gameOver ? (
        <div className="bg-card border-2 border-border rounded-3xl shadow-[4px_4px_0px_0px_#3E2723] p-8 text-center w-full max-w-sm">
          <Hammer className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h2 className="font-display text-3xl font-bold text-text mb-4">Whack-a-Bug</h2>
          <p className="text-dim mb-6">Erledige so viele Plugin-Konflikte und Theme-Bugs wie möglich in 30 Sekunden!</p>
          <button onClick={startGame} className="brutal-btn w-full">Start</button>
        </div>
      ) : gameOver ? (
        <div className="bg-card border-2 border-border rounded-3xl shadow-[4px_4px_0px_0px_#3E2723] p-8 text-center w-full max-w-sm">
          <h2 className="font-display text-3xl font-bold text-text mb-4">Zeit abgelaufen!</h2>
          <p className="text-dim mb-6">Du hast <strong className="text-accent text-xl">{score}</strong> Bugs gefixt.</p>
          <button onClick={startGame} className="brutal-btn w-full flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5" /> Noch mal spielen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-md aspect-square bg-card p-4 rounded-2xl border border-border shadow-[2px_2px_0px_0px_#3E2723]">
          {Array.from({ length: 9 }).map((_, i) => (
            <button
              key={i}
              onClick={() => whack(i)}
              className={`relative rounded-xl border border-border overflow-hidden transition-colors ${
                activeBug === i ? 'bg-red-100 cursor-crosshair' : 'bg-bg'
              }`}
            >
              {activeBug === i && (
                <Bug className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-red-500 animate-bounce" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
