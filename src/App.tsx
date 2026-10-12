import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { positions, Position } from './data/positions';
import PositionIllustration from './components/PositionIllustration';

function App() {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [history, setHistory] = useState<Position[]>([]);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [isSpinning, setIsSpinning] = useState(false);

  const getRandomPosition = useCallback(() => {
    setIsSpinning(true);

    // Quick shuffle animation
    let count = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * positions.length);
      setCurrentPosition(positions[randomIdx]);
      count++;
      if (count > 10) {
        clearInterval(interval);

        // Pick final position (avoid repeats if possible)
        let available = positions.filter(p => !usedIds.has(p.id));
        if (available.length === 0) {
          setUsedIds(new Set());
          available = positions;
        }
        const chosen = available[Math.floor(Math.random() * available.length)];
        setCurrentPosition(chosen);
        setUsedIds(prev => new Set([...prev, chosen.id]));
        setHistory(prev => [chosen, ...prev].slice(0, 5));
        setIsSpinning(false);
      }
    }, 80);
  }, [usedIds]);

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < difficulty ? 'text-red-400' : 'text-gray-700'}>
        ★
      </span>
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Face to Face': 'bg-red-900/40 text-red-300 border-red-800',
      'On Top': 'bg-pink-900/40 text-pink-300 border-pink-800',
      'From Behind': 'bg-rose-900/40 text-rose-300 border-rose-800',
      'Side by Side': 'bg-orange-900/40 text-orange-300 border-orange-800',
      'Standing': 'bg-amber-900/40 text-amber-300 border-amber-800',
      'Seated': 'bg-yellow-900/40 text-yellow-300 border-yellow-800',
      'Advanced': 'bg-purple-900/40 text-purple-300 border-purple-800',
    };
    return colors[category] || 'bg-gray-900/40 text-gray-300 border-gray-800';
  };

  return (
    <div className="min-h-screen bg-black text-red-100 flex flex-col items-center px-4 py-6 overflow-x-hidden">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Position Roulette
        </h1>
        <p className="text-red-400/70 text-sm mt-1">70 positions • Random picker</p>
      </header>

      {/* Main Card */}
      <div className="w-full max-w-md flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {currentPosition ? (
            <motion.div
              key={currentPosition.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-b from-gray-900/80 to-black border border-red-900/30 rounded-2xl p-5 mb-4 backdrop-blur-sm"
            >
              {/* Category badge */}
              <div className="flex justify-between items-center mb-3">
                <span className={`text-xs px-3 py-1 rounded-full border ${getCategoryColor(currentPosition.category)}`}>
                  {currentPosition.category}
                </span>
                <div className="flex items-center gap-1 text-sm">
                  {getDifficultyStars(currentPosition.difficulty)}
                </div>
              </div>

              {/* Illustration */}
              <div className="bg-black/50 rounded-xl p-3 mb-4 border border-gray-800/50">
                <PositionIllustration
                  positionId={currentPosition.id}
                  className="w-full h-auto max-h-48"
                />
              </div>

              {/* Position Name */}
              <h2 className="text-2xl font-bold text-red-300 mb-2 text-center">
                {currentPosition.name}
              </h2>

              {/* Description */}
              <p className="text-red-200/70 text-center text-sm mb-4">
                {currentPosition.description}
              </p>

              {/* Instructions */}
              <div className="bg-red-950/20 rounded-xl p-4 border border-red-900/20">
                <h3 className="text-red-400 font-semibold text-sm mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  How to get into position:
                </h3>
                <ol className="space-y-2">
                  {currentPosition.instructions.map((step, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-900/50 text-red-300 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-red-100/80 pt-0.5">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex items-center justify-center py-12"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🎲</div>
                <p className="text-red-400/60 text-lg">Press the button to pick a random position</p>
                <p className="text-red-400/40 text-sm mt-2">70 unique positions available</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Random Button */}
        <motion.button
          onClick={getRandomPosition}
          disabled={isSpinning}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-200 mb-4 ${
            isSpinning
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:from-red-500 hover:to-pink-500 active:scale-95'
          }`}
        >
          {isSpinning ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Shuffling...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              🎲 Random Position
            </span>
          )}
        </motion.button>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-2">
            <p className="text-red-400/50 text-xs mb-2 uppercase tracking-wider">Recent picks</p>
            <div className="flex flex-wrap gap-2">
              {history.map((pos, idx) => (
                <motion.span
                  key={`${pos.id}-${idx}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-xs px-3 py-1.5 rounded-full border cursor-default transition-all ${
                    idx === 0
                      ? 'bg-red-900/30 border-red-700/50 text-red-300'
                      : 'bg-gray-900/50 border-gray-700/30 text-gray-400'
                  }`}
                >
                  {pos.name}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-red-400/30 text-xs">
        <p>For consenting adults only • 18+</p>
      </footer>
    </div>
  );
}

export default App;
