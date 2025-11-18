import React, { useState, useCallback } from 'react';
import { ZigguratExperience } from './components/ZigguratExperience';
import { UIControls } from './components/UIControls';
import { AppState, INITIAL_STATE } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const handleStateChange = useCallback((updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleReset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <ZigguratExperience 
          sunAzimuth={state.sunAzimuth}
          sunElevation={state.sunElevation}
          windSpeed={state.windSpeed}
          showHumans={state.showHumans}
          onResetCamera={handleReset} // Passing reset trigger merely as a dependency/signal if needed, though camera reset is usually handled via ref in the component
        />
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6">
        <header className="pointer-events-auto">
          <h1 className="text-4xl font-bold text-white/90 tracking-tight drop-shadow-md font-serif">
            ZIGGURAT OF UR
          </h1>
          <p className="text-amber-100/70 text-sm mt-1 tracking-wider uppercase">
            Cinematic Reconstruction Environment
          </p>
        </header>

        <aside className="pointer-events-auto w-full max-w-xs bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-2xl self-end sm:self-auto">
          <UIControls 
            state={state} 
            onChange={handleStateChange} 
            onReset={handleReset}
          />
        </aside>
      </div>
    </div>
  );
};

export default App;
