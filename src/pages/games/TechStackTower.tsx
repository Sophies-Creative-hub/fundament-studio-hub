import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Layers } from 'lucide-react';

interface Block {
  id: number;
  width: number;
  x: number;
  color: string;
  name: string;
}

const COLORS = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-yellow-500', 'bg-accent'];
const NAMES = ['WordPress', 'Theme', 'Pagebuilder', 'WooCommerce', 'SEO Plugin', 'Caching', 'Security', 'Backup', 'Slider'];

export function TechStackTower() {
  const [blocks, setBlocks] = useState<Block[]>([{ id: 0, width: 200, x: 100, color: 'bg-border', name: 'Hosting' }]);
  const [movingBlock, setMovingBlock] = useState<Block | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState(1);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setBlocks([{ id: 0, width: 200, x: 100, color: 'bg-border', name: 'Hosting' }]);
    setMovingBlock({ id: 1, width: 200, x: 0, color: COLORS[0], name: NAMES[0] });
    setIsPlaying(true);
    setGameOver(false);
    setDirection(1);
  };

  useEffect(() => {
    let animationFrame: number;
    if (isPlaying && movingBlock && !gameOver) {
      const move = () => {
        setMovingBlock(prev => {
          if (!prev) return null;
          let newX = prev.x + (direction * (2 + blocks.length * 0.4)); // Speed increases slightly slower
          let newDir = direction;
          
          if (newX > 400 - prev.width) {
            newX = 400 - prev.width;
            newDir = -1;
            setDirection(-1);
          } else if (newX < 0) {
            newX = 0;
            newDir = 1;
            setDirection(1);
          }
          return { ...prev, x: newX };
        });
        animationFrame = requestAnimationFrame(move);
      };
      animationFrame = requestAnimationFrame(move);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, movingBlock, gameOver, direction, blocks.length]);

  const dropBlock = () => {
    if (!isPlaying || !movingBlock || gameOver) return;

    const topBlock = blocks[blocks.length - 1];
    const overlapStart = Math.max(topBlock.x, movingBlock.x);
    const overlapEnd = Math.min(topBlock.x + topBlock.width, movingBlock.x + movingBlock.width);
    const overlapWidth = overlapEnd - overlapStart;

    if (overlapWidth <= 0) {
      // Missed completely
      setGameOver(true);
      setIsPlaying(false);
    } else {
      // Stacked successfully
      const newBlock = { ...movingBlock, width: overlapWidth, x: overlapStart };
      const nextBlocks = [...blocks, newBlock];
      setBlocks(nextBlocks);
      
      const nextId = nextBlocks.length;
      setMovingBlock({
        id: nextId,
        width: overlapWidth,
        x: 0,
        color: COLORS[(nextId - 1) % COLORS.length],
        name: NAMES[(nextId - 1) % NAMES.length] || 'Plugin'
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8 bg-card p-4 rounded-2xl border border-border shadow-[2px_2px_0px_0px_#3E2723]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-dim">Stack Höhe</p>
          <p className="text-2xl font-display font-bold text-accent">{blocks.length - 1}</p>
        </div>
      </div>

      <div 
        className="relative w-full max-w-[400px] h-[500px] bg-card border-2 border-border rounded-3xl shadow-[4px_4px_0px_0px_#3E2723] overflow-hidden cursor-pointer flex flex-col justify-end items-center pb-4"
        onClick={dropBlock}
      >
        {!isPlaying && !gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/90 z-10">
            <Layers className="w-12 h-12 text-accent mb-4" />
            <h2 className="font-display text-3xl font-bold text-text mb-4">Tech-Stack Tower</h2>
            <p className="text-dim mb-6 text-center px-4">Klicke, um den Block fallen zu lassen. Baue einen stabilen Stack!</p>
            <button onClick={(e) => { e.stopPropagation(); startGame(); }} className="brutal-btn">Start</button>
          </div>
        ) : gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/90 z-10">
            <h2 className="font-display text-3xl font-bold text-red-500 mb-4">Eingestürzt!</h2>
            <p className="text-dim mb-6">Dein Stack war {blocks.length - 1} Blöcke hoch.</p>
            <button onClick={(e) => { e.stopPropagation(); startGame(); }} className="brutal-btn flex items-center gap-2">
              <RefreshCw className="w-5 h-5" /> Neustart
            </button>
          </div>
        ) : null}

        <div className="relative w-[400px] h-full">
          {/* Moving Block */}
          {movingBlock && !gameOver && (
            <div 
              className={`absolute h-10 border-2 border-border shadow-[2px_2px_0px_0px_#3E2723] flex items-center justify-center text-inv text-xs font-bold truncate px-2 ${movingBlock.color}`}
              style={{ 
                width: movingBlock.width, 
                left: movingBlock.x, 
                bottom: blocks.length * 40 + 20 
              }}
            >
              {movingBlock.name}
            </div>
          )}

          {/* Stacked Blocks */}
          {blocks.map((block, index) => (
            <div 
              key={block.id}
              className={`absolute h-10 border-2 border-border flex items-center justify-center text-inv text-xs font-bold truncate px-2 ${block.color} ${index === 0 ? 'text-text' : ''}`}
              style={{ 
                width: block.width, 
                left: block.x, 
                bottom: index * 40 
              }}
            >
              {block.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
