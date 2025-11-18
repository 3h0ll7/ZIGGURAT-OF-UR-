import React from 'react';
import { AppState } from '../types';

interface UIControlsProps {
  state: AppState;
  onChange: (updates: Partial<AppState>) => void;
  onReset: () => void;
}

export const UIControls: React.FC<UIControlsProps> = ({ state, onChange, onReset }) => {
  return (
    <div className="space-y-6 text-white/90 font-sans">
      
      {/* Lighting Controls */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs uppercase tracking-widest text-amber-500 font-semibold">
          <span>Solar Position</span>
          <span>{state.sunElevation.toFixed(0)}° / {state.sunAzimuth.toFixed(0)}°</span>
        </div>
        
        <div className="space-y-1">
          <label className="text-xs text-gray-400 block">Elevation (Time of Day)</label>
          <input
            type="range"
            min="0"
            max="90"
            step="1"
            value={state.sunElevation}
            onChange={(e) => onChange({ sunElevation: Number(e.target.value) })}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-400 block">Azimuth (Direction)</label>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={state.sunAzimuth}
            onChange={(e) => onChange({ sunAzimuth: Number(e.target.value) })}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400"
          />
        </div>
      </div>

      <hr className="border-white/10" />

      {/* Atmosphere Controls */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs uppercase tracking-widest text-amber-500 font-semibold">
          <span>Atmosphere</span>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-400 block">Wind Speed (Sand Drift)</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={state.windSpeed}
            onChange={(e) => onChange({ windSpeed: Number(e.target.value) })}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400"
          />
        </div>
      </div>

      <hr className="border-white/10" />

      {/* Scene Options */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Archaeologists (Scale)</span>
        <button
          onClick={() => onChange({ showHumans: !state.showHumans })}
          className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none ${
            state.showHumans ? 'bg-amber-600' : 'bg-gray-700'
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
              state.showHumans ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Footer Actions */}
      <div className="pt-2">
        <button
          onClick={onReset}
          className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs uppercase tracking-widest transition-colors"
        >
          Reset View & Defaults
        </button>
      </div>

    </div>
  );
};
