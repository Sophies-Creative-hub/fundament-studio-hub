import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Zap } from 'lucide-react';

export function LighthouseSprint() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  
  const playerRef = useRef<HTMLDivElement>(null);
  const obstacleRef = useRef<HTMLDivElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setGameOver(false);
    setIsJumping(false);
  };

  const jump = () => {
    if (!isPlaying || isJumping) return;
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 700); // match CSS animation duration
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isJumping]);

  useEffect(() => {
    let gameLoop: NodeJS.Timeout;
    if (isPlaying && !gameOver) {
      gameLoop = setInterval(() => {
        const player = playerRef.current;
        const obstacle = obstacleRef.current;
        
        if (player && obstacle) {
          const pRect = player.getBoundingClientRect();
          const oRect = obstacle.getBoundingClientRect();
          
          // Simple collision detection with a bit of leeway
          if (
            pRect.right - 10 > oRect.left &&
            pRect.left + 10 < oRect.right &&
            pRect.bottom - 10 > oRect.top
          ) {
            setGameOver(true);
            setIsPlaying(false);
          } else {
            setScore(s => s + 1);
          }
        }
      }, 50);
    }
    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver]);

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-4xl mx-auto flex flex-col items-center">
      <style>{`
        @keyframes jump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-140px); }
        }
        @keyframes moveObstacle {
          0% { right: -50px; }
          100% { right: 100%; }
        }
        .animate-jump { animation: jump 0.7s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-obstacle { animation: moveObstacle 1.5s linear infinite; }
      `}</style>
      
      <div className="w-full flex justify-between items-center mb-8 bg-card p-4 rounded-2xl border border-border shadow-[2px_2px_0px_0px_#3E2723]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-dim">Lighthouse Score</p>
          <p className="text-2xl font-display font-bold text-emerald-500">{Math.min(100, Math.floor(score / 10))}</p>
        </div>
      </div>

      <div 
        ref={gameAreaRef}
        onClick={jump}
        className="relative w-full h-64 bg-card border-2 border-border rounded-3xl shadow-[4px_4px_0px_0px_#3E2723] overflow-hidden cursor-pointer"
      >
        {!isPlaying && !gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/90 z-10">
            <Zap className="w-12 h-12 text-accent mb-4" />
            <h2 className="font-display text-3xl font-bold text-text mb-4">Lighthouse Sprint</h2>
            <p className="text-dim mb-6">Klicke oder drücke Leertaste zum Springen.</p>
            <button onClick={(e) => { e.stopPropagation(); startGame(); }} className="brutal-btn">Start</button>
          </div>
        ) : gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/90 z-10">
            <h2 className="font-display text-3xl font-bold text-red-500 mb-4">Crash!</h2>
            <p className="text-dim mb-6">Dein Score: <strong className="text-accent">{Math.min(100, Math.floor(score / 10))}</strong></p>
            <button onClick={(e) => { e.stopPropagation(); startGame(); }} className="brutal-btn flex items-center gap-2">
              <RefreshCw className="w-5 h-5" /> Neustart
            </button>
          </div>
        ) : null}

        {/* Ground */}
        <div className="absolute bottom-0 w-full h-4 bg-border"></div>

        {/* Player */}
        <div 
          ref={playerRef}
          className={`absolute bottom-4 left-10 w-12 h-12 bg-accent border border-border shadow-[1px_1px_0px_0px_#3E2723] rounded-lg flex items-center justify-center text-inv font-bold ${isJumping ? 'animate-jump' : ''}`}
        >
          WP
        </div>

        {/* Obstacle */}
        {isPlaying && (
          <div 
            ref={obstacleRef}
            className="absolute bottom-4 w-10 h-16 bg-red-500 border border-border shadow-[1px_1px_0px_0px_#3E2723] animate-obstacle flex items-center justify-center text-inv text-xs font-bold writing-vertical-rl"
            style={{ animationDuration: `${Math.max(1.2, 3.0 - score / 200)}s` }}
          >
            Plugin
          </div>
        )}
      </div>
    </div>
  );
}
