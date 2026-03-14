import { useState, useEffect, useRef } from 'react';
import { Skull, RefreshCw } from 'lucide-react';

interface Entity {
  id: number;
  x: number;
  y: number;
  alive: boolean;
}

export function BloatInvaders() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(50);
  const [bullets, setBullets] = useState<{id: number, x: number, y: number}[]>([]);
  const [enemies, setEnemies] = useState<Entity[]>([]);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setPlayerX(50);
    setBullets([]);
    
    // Spawn initial enemies
    const initialEnemies = [];
    for(let row = 0; row < 2; row++) {
      for(let col = 0; col < 5; col++) {
        initialEnemies.push({
          id: row * 10 + col,
          x: 20 + col * 15,
          y: 10 + row * 15,
          alive: true
        });
      }
    }
    setEnemies(initialEnemies);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      if (e.key === 'ArrowLeft') setPlayerX(x => Math.max(5, x - 5));
      if (e.key === 'ArrowRight') setPlayerX(x => Math.min(95, x + 5));
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        setBullets(b => [...b, { id: Date.now(), x: playerX, y: 85 }]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver, playerX]);

  useEffect(() => {
    let gameLoop: NodeJS.Timeout;
    if (isPlaying && !gameOver) {
      gameLoop = setInterval(() => {
        // Move bullets up
        setBullets(prev => prev.map(b => ({ ...b, y: b.y - 5 })).filter(b => b.y > 0));
        
        // Move enemies down slowly
        setEnemies(prev => {
          const next = prev.map(e => ({ ...e, y: e.y + 0.1 }));
          // Check if enemies reached bottom
          if (next.some(e => e.alive && e.y > 80)) {
            setGameOver(true);
            setIsPlaying(false);
          }
          return next;
        });

        // Collision detection
        setBullets(currentBullets => {
          let nextBullets = [...currentBullets];
          setEnemies(currentEnemies => {
            let nextEnemies = [...currentEnemies];
            
            nextBullets.forEach((b, bIdx) => {
              nextEnemies.forEach((e, eIdx) => {
                if (e.alive && Math.abs(b.x - e.x) < 5 && Math.abs(b.y - e.y) < 5) {
                  nextEnemies[eIdx].alive = false;
                  nextBullets[bIdx].y = -100; // mark for removal
                  setScore(s => s + 10);
                }
              });
            });
            
            // Check win condition
            if (nextEnemies.every(e => !e.alive)) {
              setGameOver(true);
              setIsPlaying(false);
            }
            
            return nextEnemies;
          });
          return nextBullets.filter(b => b.y > 0);
        });
        
      }, 50);
    }
    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver]);

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-3xl mx-auto flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8 bg-card p-4 rounded-2xl border border-border shadow-[2px_2px_0px_0px_#3E2723]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-dim">Score</p>
          <p className="text-2xl font-display font-bold text-accent">{score}</p>
        </div>
      </div>

      <div 
        ref={gameAreaRef}
        className="relative w-full max-w-[600px] aspect-square bg-card border-2 border-border rounded-3xl shadow-[4px_4px_0px_0px_#3E2723] overflow-hidden"
      >
        {!isPlaying && !gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/90 z-10">
            <Skull className="w-12 h-12 text-accent mb-4" />
            <h2 className="font-display text-3xl font-bold text-text mb-4">Bloat Invaders</h2>
            <p className="text-dim mb-6 text-center px-4">Pfeiltasten zum Bewegen. Leertaste zum Schießen.</p>
            <button onClick={startGame} className="brutal-btn">Start</button>
          </div>
        ) : gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/90 z-10">
            <h2 className="font-display text-3xl font-bold text-text mb-4">
              {enemies.every(e => !e.alive) ? 'Gewonnen!' : 'Server Crash!'}
            </h2>
            <p className="text-dim mb-6">Dein Score: <strong className="text-accent">{score}</strong></p>
            <button onClick={startGame} className="brutal-btn flex items-center gap-2">
              <RefreshCw className="w-5 h-5" /> Neustart
            </button>
          </div>
        ) : null}

        {/* Player */}
        <div 
          className="absolute bottom-4 w-16 h-12 bg-accent border-2 border-border shadow-[2px_2px_0px_0px_#3E2723] rounded-t-xl flex items-center justify-center text-inv font-bold transition-all duration-75"
          style={{ left: `calc(${playerX}% - 32px)` }}
        >
          Hosting
        </div>

        {/* Bullets */}
        {bullets.map(b => (
          <div 
            key={b.id}
            className="absolute w-2 h-4 bg-emerald-500 rounded-full"
            style={{ left: `calc(${b.x}% - 4px)`, top: `${b.y}%` }}
          />
        ))}

        {/* Enemies */}
        {enemies.map(e => e.alive && (
          <div 
            key={e.id}
            className="absolute w-10 h-8 bg-red-500 border border-border flex items-center justify-center text-inv text-xs font-bold rounded"
            style={{ left: `calc(${e.x}% - 20px)`, top: `${e.y}%` }}
          >
            Spam
          </div>
        ))}
      </div>
    </div>
  );
}
