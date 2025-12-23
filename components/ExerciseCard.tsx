import React, { useState } from 'react';
import { Info, CheckCircle2, Circle, ClipboardList } from 'lucide-react';
import { Exercise, ExerciseLog } from '../types';
import { ExerciseLogger } from './ExerciseLogger';

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted: boolean;
  onToggle: () => void;
  onSaveLog: (log: ExerciseLog) => void;
  lastLog?: ExerciseLog;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, isCompleted, onToggle, onSaveLog, lastLog }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden transition-all duration-300 border rounded-xl 
      ${isCompleted 
        ? 'bg-slate-900/50 border-brand-900/30' 
        : 'bg-slate-800 border-slate-700 hover:border-brand-500/50'}`}
    >
      <div className="p-4 flex flex-row items-start gap-4">
        {/* Checkbox Area */}
        <button 
          onClick={onToggle}
          className="mt-1 flex-shrink-0 text-slate-500 hover:text-brand-500 transition-colors"
        >
          {isCompleted 
            ? <CheckCircle2 size={24} className="text-brand-500" /> 
            : <Circle size={24} />}
        </button>

        {/* Content Area */}
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className={`font-bold text-lg ${isCompleted ? 'text-slate-500 line-through' : 'text-white'}`}>
              {exercise.name}
            </h3>
            {exercise.tag && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                {exercise.tag}
              </span>
            )}
          </div>

          <div className="flex gap-4 mt-1 text-sm text-slate-400 font-mono">
            {exercise.sets && <span>{exercise.sets} Sets</span>}
            {exercise.reps && <span>{exercise.reps} Reps</span>}
            {exercise.duration && <span>{exercise.duration}</span>}
          </div>

          {/* Last Log Summary (if available) */}
          {lastLog && !isLogging && (
            <div className="mt-2 text-xs text-brand-400/80 font-mono flex items-center gap-1">
               Last: {lastLog.sets.reduce((acc, s) => acc + s.reps, 0)} reps
               <span className="text-slate-600">•</span>
               {new Date(lastLog.timestamp).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
            </div>
          )}

          {/* Actions Bar */}
          <div className="flex items-center gap-4 mt-3">
             {exercise.note && (
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white font-medium transition-colors"
              >
                <Info size={14} />
                {showInfo ? 'Hide Tips' : 'Tips'}
              </button>
             )}
             
             {!isLogging && (
               <button 
                 onClick={() => setIsLogging(true)}
                 className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors"
               >
                 <ClipboardList size={14} />
                 Log Stats
               </button>
             )}
          </div>
          
          {/* Expandable Info */}
          {showInfo && exercise.note && (
            <div className="mt-2 p-3 bg-slate-900/80 rounded-lg text-sm text-slate-300 border-l-2 border-brand-500 animate-in fade-in slide-in-from-top-1">
              <p>{exercise.note}</p>
            </div>
          )}

          {/* Logger Interface */}
          {isLogging && (
            <ExerciseLogger 
              exercise={exercise} 
              onSave={(log) => {
                onSaveLog(log);
                setIsLogging(false);
                if (!isCompleted) onToggle(); // Auto-check if not checked
              }} 
              onCancel={() => setIsLogging(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};