
import React, { useState, useEffect } from 'react';
import { GoBoard } from '../components/GoBoard';
import { GoEngine } from '../lib/goEngine';
import { StoneColor, BoardMarker, MarkerType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Triangle, Square, Circle, X as XIcon, Type, MousePointer2, 
  Trash2, RotateCcw, Hash, Play, Settings2,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SkipBack, SkipForward
} from 'lucide-react';

type Tool = 'move' | 'triangle' | 'square' | 'circle' | 'x' | 'label' | 'number';
type PlayMode = 'alternating' | 'alternating_white_first' | 'black_only' | 'white_only';

export const DemoBoard: React.FC = () => {
  const { t } = useLanguage();
  
  // Game State
  const [masterEngine, setMasterEngine] = useState(new GoEngine(19)); // Contains full history
  const [currentStep, setCurrentStep] = useState(0); // Current viewing index (0 = empty)
  const [displayEngine, setDisplayEngine] = useState(new GoEngine(19)); // Engine at currentStep
  
  // Markers State: Map step number to list of markers
  const [markersMap, setMarkersMap] = useState<Record<number, BoardMarker[]>>({});

  // UI State
  const [activeTool, setActiveTool] = useState<Tool>('move');
  const [playMode, setPlayMode] = useState<PlayMode>('alternating');
  const [showMoveNumbers, setShowMoveNumbers] = useState(false);
  
  // Sequence counters for labels
  const [labelSeq, setLabelSeq] = useState('A');
  const [numSeq, setNumSeq] = useState(1);

  // Sync display engine when step changes
  useEffect(() => {
    // Generate the board state for the current timeline position
    const newDisplay = masterEngine.jumpToMove(currentStep);
    setDisplayEngine(newDisplay);
  }, [currentStep, masterEngine]);

  const handleBoardClick = (x: number, y: number) => {
    // Markers Logic
    // If tool is a shape, OR playMode is Black/White Only (Setup Mode)
    if (activeTool !== 'move' || playMode === 'black_only' || playMode === 'white_only') {
      const currentMarkers = markersMap[currentStep] || [];
      let markerType: MarkerType | undefined;
      let label: string | undefined;

      // Determine Marker Type
      if (playMode === 'black_only') markerType = 'stone_black';
      else if (playMode === 'white_only') markerType = 'stone_white';
      else markerType = activeTool as MarkerType;

      // Toggle Marker
      const existingIndex = currentMarkers.findIndex(m => m.x === x && m.y === y);
      let newMarkers = [...currentMarkers];
      
      if (existingIndex >= 0) {
        newMarkers.splice(existingIndex, 1); // Remove if exists
      } else {
        // Add new marker
        if (activeTool === 'label') {
          label = labelSeq;
          setLabelSeq(String.fromCharCode(labelSeq.charCodeAt(0) + 1));
        } else if (activeTool === 'number') {
          label = numSeq.toString();
          setNumSeq(numSeq + 1);
        }
        newMarkers.push({ x, y, type: markerType!, label });
      }

      setMarkersMap({ ...markersMap, [currentStep]: newMarkers });
      return;
    }

    // Move Logic (Alternating Play)
    if (activeTool === 'move') {
      // If we are in the past, we must branch or truncate. 
      // For this demo, we truncate future history to enforce a linear timeline.
      let engineToUse: GoEngine;
      if (currentStep < masterEngine.moves.length) {
         // Create a fresh engine state up to currentStep
         engineToUse = masterEngine.jumpToMove(currentStep);
      } else {
         engineToUse = masterEngine.clone();
      }

      // Determine Color
      let nextColor = engineToUse.getCurrentTurn();
      if (playMode === 'alternating_white_first') {
         // Force simple alternating starting with White
         nextColor = engineToUse.moves.length % 2 === 0 ? StoneColor.WHITE : StoneColor.BLACK;
      }

      const result = engineToUse.placeStone(x, y, nextColor);
      if (result.success) {
        setMasterEngine(engineToUse);
        setCurrentStep(engineToUse.moves.length);
        // Clear markers for the new step to ensure clean slate
        setMarkersMap({ ...markersMap, [engineToUse.moves.length]: [] });
      }
    }
  };

  const jumpTo = (step: number) => {
    const target = Math.max(0, Math.min(step, masterEngine.moves.length));
    setCurrentStep(target);
  };

  const clearBoard = () => {
    if(window.confirm(t('demo.clear') + '?')) {
      setMasterEngine(new GoEngine(19));
      setCurrentStep(0);
      setMarkersMap({});
      setLabelSeq('A');
      setNumSeq(1);
    }
  };

  const ToolButton = ({ tool, icon: Icon }: { tool: Tool, icon: any }) => (
    <button
      onClick={() => { setActiveTool(tool); if(tool !== 'move') setPlayMode('alternating'); }}
      className={`p-2 rounded-lg flex items-center justify-center transition-all ${
        activeTool === tool && (playMode === 'alternating' || playMode === 'alternating_white_first')
        ? 'bg-blue-600 text-white shadow-md scale-105' 
        : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
      }`}
    >
      <Icon size={20} />
    </button>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full relative">
      
      {/* 1. Main Board Area */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center overflow-y-auto pb-32 lg:pb-0">
        <div className="w-full max-w-[650px] shadow-2xl rounded-sm">
          <GoBoard 
            engine={displayEngine} 
            onMove={handleBoardClick} 
            interactive={true} 
            markers={markersMap[currentStep] || []}
            showMoveNumbers={showMoveNumbers}
          />
        </div>

        {/* Playback Controls (Responsive) */}
        <div className="w-full max-w-[650px] mt-4 bg-stone-800 text-white p-2 rounded-xl flex justify-between items-center shadow-lg">
             <button onClick={() => jumpTo(0)} className="p-2 hover:bg-stone-700 rounded transition"><SkipBack size={20} /></button>
             <button onClick={() => jumpTo(currentStep - 10)} className="p-2 hover:bg-stone-700 rounded transition"><ChevronsLeft size={20} /></button>
             <button onClick={() => jumpTo(currentStep - 1)} className="p-2 hover:bg-stone-700 rounded transition"><ChevronLeft size={24} /></button>
             
             <div className="font-mono font-bold text-lg min-w-[60px] text-center select-none">
               {currentStep} <span className="text-stone-500 text-sm">/ {masterEngine.moves.length}</span>
             </div>
             
             <button onClick={() => jumpTo(currentStep + 1)} className="p-2 hover:bg-stone-700 rounded transition"><ChevronRight size={24} /></button>
             <button onClick={() => jumpTo(currentStep + 10)} className="p-2 hover:bg-stone-700 rounded transition"><ChevronsRight size={20} /></button>
             <button onClick={() => jumpTo(masterEngine.moves.length)} className="p-2 hover:bg-stone-700 rounded transition"><SkipForward size={20} /></button>
        </div>
      </div>

      {/* 2. Tools Panel (Desktop: Right Sidebar, Mobile: Fixed Bottom Sheet) */}
      <div className={`
        fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-stone-200 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-30
        lg:static lg:w-72 lg:h-full lg:bg-transparent lg:border-none lg:shadow-none lg:p-0 lg:flex lg:flex-col lg:gap-3
        overflow-x-auto lg:overflow-visible flex flex-row lg:flex-col gap-3 items-center lg:items-stretch
      `}>
        
        {/* Mode Selector */}
        <div className="flex-shrink-0 bg-white p-2 lg:p-3 rounded-xl shadow-sm border border-stone-200 min-w-[200px] lg:min-w-0">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Settings2 size={12} /> {t('demo.mode')}
          </h3>
          <div className="grid grid-cols-2 gap-2">
             <button 
                onClick={() => { setPlayMode('alternating'); setActiveTool('move'); }}
                className={`text-xs p-2 rounded border font-bold text-center transition-colors ${playMode === 'alternating' ? 'bg-stone-800 text-white border-stone-800' : 'bg-stone-50 text-stone-600 border-stone-200'}`}
             >
               {t('demo.alternating')}
             </button>
             <button 
                onClick={() => { setPlayMode('alternating_white_first'); setActiveTool('move'); }}
                className={`text-xs p-2 rounded border font-bold text-center transition-colors ${playMode === 'alternating_white_first' ? 'bg-stone-800 text-white border-stone-800' : 'bg-stone-50 text-stone-600 border-stone-200'}`}
             >
               W &rarr; B
             </button>
             <button 
                onClick={() => { setPlayMode('black_only'); setActiveTool('move'); }}
                className={`text-xs p-2 rounded border font-bold flex items-center justify-center gap-1 transition-colors ${playMode === 'black_only' ? 'bg-black text-white border-black' : 'bg-stone-50 text-stone-600 border-stone-200'}`}
             >
               <div className="w-2 h-2 rounded-full bg-black border border-stone-500"></div> {t('demo.black')}
             </button>
             <button 
                onClick={() => { setPlayMode('white_only'); setActiveTool('move'); }}
                className={`text-xs p-2 rounded border font-bold flex items-center justify-center gap-1 transition-colors ${playMode === 'white_only' ? 'bg-stone-200 text-stone-900 border-stone-300' : 'bg-stone-50 text-stone-600 border-stone-200'}`}
             >
               <div className="w-2 h-2 rounded-full bg-white border border-stone-400"></div> {t('demo.white')}
             </button>
          </div>
        </div>

        {/* Marker Tools */}
        <div className="flex-shrink-0 bg-stone-100 p-2 rounded-xl flex lg:grid lg:grid-cols-4 gap-2 overflow-x-auto">
             <ToolButton tool="move" icon={MousePointer2} />
             <ToolButton tool="triangle" icon={Triangle} />
             <ToolButton tool="square" icon={Square} />
             <ToolButton tool="circle" icon={Circle} />
             <ToolButton tool="x" icon={XIcon} />
             <ToolButton tool="label" icon={Type} />
             <ToolButton tool="number" icon={Hash} />
             <button
              onClick={() => setMarkersMap({ ...markersMap, [currentStep]: [] })}
              className="p-2 rounded-lg bg-white text-red-500 hover:bg-red-50 border border-stone-200 flex items-center justify-center transition-colors"
              title="Clear Markers"
            >
              <Trash2 size={20} />
            </button>
        </div>

        {/* Extra Actions */}
        <div className="flex-shrink-0 flex flex-col lg:flex-row gap-2 min-w-[120px] lg:min-w-0">
           <button 
             onClick={clearBoard}
             className="flex-1 py-3 lg:py-2 bg-red-100 hover:bg-red-200 rounded-xl font-bold text-red-600 flex items-center justify-center gap-2 text-sm transition-colors"
           >
             <RotateCcw size={16} /> <span className="lg:hidden xl:inline">{t('demo.reset')}</span>
           </button>
           <button 
             onClick={() => setShowMoveNumbers(!showMoveNumbers)}
             className={`flex-1 py-3 lg:py-2 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-colors ${showMoveNumbers ? 'bg-blue-600 text-white' : 'bg-stone-200 text-stone-700'}`}
           >
             <Hash size={16} /> <span className="lg:hidden xl:inline">#</span>
           </button>
        </div>

      </div>
    </div>
  );
};
