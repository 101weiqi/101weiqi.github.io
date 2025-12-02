
import React, { useRef, useMemo } from 'react';
import { GoEngine } from '../lib/goEngine';
import { StoneColor, BoardMarker } from '../types';

interface GoBoardProps {
  engine: GoEngine;
  onMove?: (x: number, y: number) => void;
  interactive?: boolean;
  showCoords?: boolean;
  markers?: BoardMarker[];
  showMoveNumbers?: boolean;
}

export const GoBoard: React.FC<GoBoardProps> = ({ 
  engine, 
  onMove, 
  interactive = true,
  showCoords = true,
  markers = [],
  showMoveNumbers = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Configuration
  const gridSize = engine.size;
  const margin = 1.5; 
  const totalUnits = (gridSize - 1) + 2 * margin;

  const starPoints = useMemo(() => {
    if (gridSize === 19) {
      return [
        {x: 3, y: 3}, {x: 9, y: 3}, {x: 15, y: 3},
        {x: 3, y: 9}, {x: 9, y: 9}, {x: 15, y: 9},
        {x: 3, y: 15}, {x: 9, y: 15}, {x: 15, y: 15},
      ];
    }
    if (gridSize === 13) return [{x: 3, y: 3}, {x: 9, y: 3}, {x: 6, y: 6}, {x: 3, y: 9}, {x: 9, y: 9}];
    if (gridSize === 9) return [{x: 2, y: 2}, {x: 6, y: 2}, {x: 4, y: 4}, {x: 2, y: 6}, {x: 6, y: 6}];
    return [];
  }, [gridSize]);

  const xLabels = useMemo(() => Array.from({ length: gridSize }, (_, i) => {
    const charCode = 'A'.charCodeAt(0) + i;
    const char = String.fromCharCode(charCode >= 'I'.charCodeAt(0) ? charCode + 1 : charCode); 
    return char;
  }), [gridSize]);
  
  const yLabels = useMemo(() => Array.from({ length: gridSize }, (_, i) => gridSize - i), [gridSize]);

  const moveNumberMap = useMemo(() => {
    if (!showMoveNumbers) return new Map();
    const map = new Map<string, number>();
    // We map only the moves present in the engine state (which might be a subset due to playback)
    engine.moves.forEach((m) => {
        map.set(`${m.x},${m.y}`, m.moveNumber);
    });
    return map;
  }, [engine.moves, showMoveNumbers]);

  const handleClick = (e: React.MouseEvent) => {
    if (!interactive || !onMove) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scale = totalUnits / rect.width;
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;
    const gridX = Math.round(svgX * scale - margin);
    const gridY = Math.round(svgY * scale - margin);
    
    if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize) {
      const dist = Math.sqrt(Math.pow(gridX - (svgX * scale - margin), 2) + Math.pow(gridY - (svgY * scale - margin), 2));
      if (dist < 0.45) onMove(gridX, gridY);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square rounded-sm shadow-xl overflow-hidden bg-[#DCB35C] select-none touch-none"
      style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply wood-texture"></div>

      <svg 
        viewBox={`0 0 ${totalUnits} ${totalUnits}`} 
        className="w-full h-full relative z-10 block"
        onClick={handleClick}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
      >
        <defs>
            <filter id="stoneShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="0.05" />
                <feOffset dx="0.06" dy="0.06" result="offsetblur" />
                <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="blackGrad" cx="35%" cy="35%" r="65%" fx="20%" fy="20%">
                <stop offset="0%" stopColor="#666" />
                <stop offset="40%" stopColor="#333" />
                <stop offset="100%" stopColor="#0a0a0a" />
            </radialGradient>
            <radialGradient id="whiteGrad" cx="35%" cy="35%" r="65%" fx="20%" fy="20%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="90%" stopColor="#e6e6e6" />
                <stop offset="100%" stopColor="#d4d4d4" />
            </radialGradient>
        </defs>

        {showCoords && (
          <g className="font-sans font-bold fill-stone-800" style={{ fontSize: '0.45px', userSelect: 'none' }}>
             {xLabels.map((label, i) => (
               <React.Fragment key={`x-${i}`}>
                 <text x={margin + i} y={margin * 0.6} textAnchor="middle" alignmentBaseline="middle">{label}</text>
                 <text x={margin + i} y={totalUnits - margin * 0.5} textAnchor="middle" alignmentBaseline="middle">{label}</text>
               </React.Fragment>
             ))}
             {yLabels.map((label, i) => (
               <React.Fragment key={`y-${i}`}>
                 <text x={margin * 0.5} y={margin + i} textAnchor="middle" alignmentBaseline="middle">{label}</text>
                 <text x={totalUnits - margin * 0.5} y={margin + i} textAnchor="middle" alignmentBaseline="middle">{label}</text>
               </React.Fragment>
             ))}
          </g>
        )}

        <g stroke="#000" strokeWidth="0.035" strokeLinecap="square" className="pointer-events-none">
           {Array.from({ length: gridSize }).map((_, i) => (
             <React.Fragment key={i}>
                <line x1={margin} y1={margin + i} x2={totalUnits - margin} y2={margin + i} />
                <line x1={margin + i} y1={margin} x2={margin + i} y2={totalUnits - margin} />
             </React.Fragment>
           ))}
           {starPoints.map((p, i) => (
              <circle key={i} cx={margin + p.x} cy={margin + p.y} r={0.12} fill="#000" stroke="none" />
           ))}
        </g>

        {/* Engine Stones */}
        <g className="pointer-events-none">
           {engine.grid.map((row, y) => 
              row.map((color, x) => {
                 if (color === StoneColor.EMPTY) return null;
                 const isBlack = color === StoneColor.BLACK;
                 const moveNum = showMoveNumbers ? moveNumberMap.get(`${x},${y}`) : null;
                 const lastMove = engine.moves.length > 0 ? engine.moves[engine.moves.length - 1] : null;
                 const isLastMove = lastMove && lastMove.x === x && lastMove.y === y;
                 
                 return (
                   <g key={`${x}-${y}`} transform={`translate(${margin + x}, ${margin + y})`}>
                       <circle r={0.48} fill={isBlack ? "url(#blackGrad)" : "url(#whiteGrad)"} filter="url(#stoneShadow)" />
                       {isLastMove && !moveNum && (
                         <circle r={0.25} fill="none" stroke={isBlack ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"} strokeWidth="0.06" />
                       )}
                       {moveNum && (
                           <text dy="0.15" textAnchor="middle" fontSize="0.35" fill={isBlack ? "#fff" : "#000"} fontWeight="bold" fontFamily="sans-serif">{moveNum}</text>
                       )}
                   </g>
                 );
              })
           )}
        </g>
        
        {/* Markers & Setup Stones Layer (Renders on TOP) */}
        <g className="pointer-events-none">
            {markers.map((m, i) => {
                const cx = margin + m.x;
                const cy = margin + m.y;
                const r = 0.48;
                const fillColor = "#ef4444"; 
                const strokeWidth = 0.02;
                const s = 0.7;
                
                return (
                    <g key={`marker-${i}`} transform={`translate(${cx}, ${cy})`}>
                        {m.type === 'stone_black' && (
                           <circle r={0.48} fill="url(#blackGrad)" filter="url(#stoneShadow)" opacity="0.95" />
                        )}
                        {m.type === 'stone_white' && (
                           <circle r={0.48} fill="url(#whiteGrad)" filter="url(#stoneShadow)" opacity="0.95" />
                        )}
                        {m.type === 'triangle' && (
                            <polygon points={`0,${-r*s} ${-r*s*0.866},${r*s*0.5} ${r*s*0.866},${r*s*0.5}`} fill={fillColor} stroke="white" strokeWidth={strokeWidth} />
                        )}
                        {m.type === 'square' && (
                            <rect x={-r*s*0.7} y={-r*s*0.7} width={r*s*1.4} height={r*s*1.4} fill={fillColor} stroke="white" strokeWidth={strokeWidth} />
                        )}
                        {m.type === 'circle' && (
                            <circle r={r*s*0.6} fill={fillColor} stroke="white" strokeWidth={strokeWidth} />
                        )}
                        {m.type === 'x' && (
                            <g stroke={fillColor} strokeWidth={0.1} strokeLinecap="round">
                                <line x1={-r*0.5} y1={-r*0.5} x2={r*0.5} y2={r*0.5} />
                                <line x1={r*0.5} y1={-r*0.5} x2={-r*0.5} y2={r*0.5} />
                            </g>
                        )}
                        {(m.type === 'label' || m.type === 'number') && (
                            <text dy="0.18" textAnchor="middle" fontSize="0.55" fill={fillColor} fontWeight="bold" stroke="white" strokeWidth="0.02" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}>
                              {m.label}
                            </text>
                        )}
                    </g>
                );
            })}
        </g>
      </svg>
    </div>
  );
};
