import React, { useState } from 'react';
import { Plus, Minus, Save, X } from 'lucide-react';
import { Exercise, SetResult, ExerciseLog } from '../types';

interface ExerciseLoggerProps {
  exercise: Exercise;
  onSave: (log: ExerciseLog) => void;
  onCancel: () => void;
  previousLog?: ExerciseLog;
}

export const ExerciseLogger: React.FC<ExerciseLoggerProps> = ({ exercise, onSave, onCancel, previousLog }) => {
  // Parse target sets from string (e.g. "3") or default to 3
  const targetSets = parseInt(exercise.sets || '3') || 3;
  
  const [sets, setSets] = useState<SetResult[]>(() => {
    // If we have a previous log (e.g. from last week), maybe pre-fill? 
    // For now, let's just initialize with target sets and empty/default values
    return Array(targetSets).fill({ reps: 0, weight: 0 });
  });
  
  const [note, setNote] = useState('');

  const updateSet = (index: number, field: keyof SetResult, value: number) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: value };
    setSets(newSets);
  };

  const addSet = () => {
    setSets([...sets, { reps: 0, weight: 0 }]);
  };

  const removeSet = (index: number) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const log: ExerciseLog = {
      id: Date.now().toString(),
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      timestamp: Date.now(),
      sets: sets.filter(s => s.reps > 0), // Only save sets with data
      note
    };
    onSave(log);
  };

  return (
    <div className="mt-4 bg-slate-900 rounded-lg p-4 border border-slate-700 animate-in fade-in slide-in-from-top-2">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-bold text-brand-400 uppercase tracking-wider">Log Results</h4>
        <button onClick={onCancel} className="text-slate-500 hover:text-slate-300">
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-10 gap-2 text-xs text-slate-500 font-mono text-center mb-1">
          <div className="col-span-2 text-left pl-2">SET</div>
          <div className="col-span-3">REPS</div>
          <div className="col-span-3">LBS/KG</div>
          <div className="col-span-2"></div>
        </div>

        {sets.map((set, index) => (
          <div key={index} className="grid grid-cols-10 gap-2 items-center">
            <div className="col-span-2 pl-2 font-mono text-slate-300 font-bold">
              {index + 1}
            </div>
            <div className="col-span-3">
              <input
                type="number"
                className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-center text-white focus:border-brand-500 outline-none"
                placeholder="0"
                value={set.reps || ''}
                onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="col-span-3">
              <input
                type="number"
                className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-center text-white focus:border-brand-500 outline-none"
                placeholder="-"
                value={set.weight || ''}
                onChange={(e) => updateSet(index, 'weight', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="col-span-2 flex justify-center">
               <button 
                onClick={() => removeSet(index)}
                className="text-slate-600 hover:text-red-400 transition-colors"
                disabled={sets.length <= 1}
              >
                <Minus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-3 mb-4">
        <button 
          onClick={addSet}
          className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 transition-colors"
        >
          <Plus size={14} /> Add Set
        </button>
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Notes (e.g. form cues, variations used)..."
          className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:border-brand-500 outline-none resize-none h-16"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <Save size={18} /> Save Log
      </button>
    </div>
  );
};