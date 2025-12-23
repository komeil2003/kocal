import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Calendar, 
  ChevronRight, 
  Flame, 
  Wind, 
  Trophy, 
  ArrowLeft,
  Utensils,
  Moon,
  LineChart,
  History
} from 'lucide-react';
import { WARMUP_ROUTINE, COOLDOWN_ROUTINE, PROGRAM_SCHEDULE, NUTRITION_TIP } from './constants';
import { ExerciseCard } from './components/ExerciseCard';
import { Timer } from './components/Timer';
import { ProgressChart } from './components/ProgressChart';
import { DailyPlan, Exercise, ExerciseLog } from './types';

// Types for navigation state
type ViewState = 'DASHBOARD' | 'WORKOUT_DETAIL' | 'PROGRESS';
type WorkoutPhase = 'WARMUP' | 'MAIN' | 'COOLDOWN';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [selectedDayId, setSelectedDayId] = useState<number>(1);
  const [workoutPhase, setWorkoutPhase] = useState<WorkoutPhase>('WARMUP');
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  
  // New State for Logs
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);

  const currentDayPlan = PROGRAM_SCHEDULE.find(d => d.day === selectedDayId);

  // Load completed items and logs from local storage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('exerciseLogs');
    if (savedLogs) {
      setExerciseLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save logs whenever they change
  useEffect(() => {
    if (exerciseLogs.length > 0) {
      localStorage.setItem('exerciseLogs', JSON.stringify(exerciseLogs));
    }
  }, [exerciseLogs]);

  const toggleExercise = (id: string) => {
    const newSet = new Set(completedExercises);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCompletedExercises(newSet);
  };

  const handleSaveLog = (log: ExerciseLog) => {
    setExerciseLogs(prev => [...prev, log]);
  };

  const getProgress = (exercises: Exercise[]) => {
    if (exercises.length === 0) return 0;
    const completedCount = exercises.filter(e => completedExercises.has(e.id)).length;
    return Math.round((completedCount / exercises.length) * 100);
  };

  const handleStartDay = (dayId: number) => {
    setSelectedDayId(dayId);
    setWorkoutPhase('WARMUP');
    setView('WORKOUT_DETAIL');
  };

  const getActiveExercises = () => {
    if (!currentDayPlan) return [];
    if (currentDayPlan.isRestDay) return [];

    switch (workoutPhase) {
      case 'WARMUP': return WARMUP_ROUTINE;
      case 'MAIN': return currentDayPlan.exercises;
      case 'COOLDOWN': return COOLDOWN_ROUTINE;
      default: return [];
    }
  };

  const getLastLog = (exerciseId: string) => {
    const logs = exerciseLogs.filter(l => l.exerciseId === exerciseId);
    if (logs.length === 0) return undefined;
    return logs.sort((a, b) => b.timestamp - a.timestamp)[0];
  };

  const activeExercises = getActiveExercises();
  const phaseProgress = getProgress(activeExercises);

  // --- RENDER HELPERS ---

  const renderDashboard = () => (
    <div className="max-w-md mx-auto p-4 space-y-6 pb-20">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
            HYBRID PRO
          </h1>
          <p className="text-slate-400 text-xs tracking-widest uppercase">Expert Optimized</p>
        </div>
        <button 
          onClick={() => setView('PROGRESS')}
          className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 hover:border-brand-500 hover:text-brand-500 transition-all text-slate-400"
        >
          <LineChart size={20} />
        </button>
      </header>

      {/* Nutrition Banner */}
      <div className="bg-gradient-to-br from-brand-900 to-slate-900 rounded-xl p-5 border border-brand-800/50 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Utensils size={64} />
        </div>
        <h3 className="text-brand-400 font-bold mb-1 flex items-center gap-2">
          <Utensils size={16} /> Nutrition Rule
        </h3>
        <p className="text-slate-200 text-sm leading-relaxed">
          {NUTRITION_TIP}
        </p>
      </div>

      {/* Weekly Schedule */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Calendar size={20} className="text-brand-500" /> 
          This Week
        </h2>
        <div className="grid gap-3">
          {PROGRAM_SCHEDULE.map((day) => (
            <button
              key={day.day}
              onClick={() => handleStartDay(day.day)}
              className={`group flex items-center p-4 rounded-xl border transition-all duration-200 text-left
                ${day.isRestDay 
                  ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' 
                  : 'bg-slate-800 border-slate-700 hover:border-brand-500/50 hover:shadow-brand-500/10 hover:shadow-lg'
                }
              `}
            >
              <div className={`
                flex-shrink-0 w-12 h-12 rounded-lg flex flex-col items-center justify-center mr-4 font-bold border
                ${day.isRestDay 
                  ? 'bg-slate-800 border-slate-700 text-slate-500' 
                  : 'bg-brand-500/10 border-brand-500/20 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors'
                }
              `}>
                <span className="text-[10px] uppercase">Day</span>
                <span className="text-xl leading-none">{day.day}</span>
              </div>
              
              <div className="flex-grow">
                <h3 className={`font-bold ${day.isRestDay ? 'text-slate-400' : 'text-slate-100'}`}>
                  {day.title}
                </h3>
                <p className="text-xs text-slate-500 truncate max-w-[200px]">
                  {day.focus}
                </p>
              </div>

              {!day.isRestDay && (
                 <ChevronRight size={20} className="text-slate-600 group-hover:text-brand-500 transition-colors" />
              )}
              {day.isRestDay && (
                 <Moon size={18} className="text-slate-700" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProgressView = () => {
    // Get unique exercises that have logs
    const loggedExerciseIds = Array.from(new Set(exerciseLogs.map(l => l.exerciseId)));
    
    return (
      <div className="max-w-md mx-auto min-h-screen bg-slate-950 flex flex-col">
        <header className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 p-4">
           <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('DASHBOARD')}
              className="p-2 -ml-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <History size={20} className="text-brand-500" /> Progress History
            </h1>
          </div>
        </header>

        <main className="p-4 space-y-6 flex-grow">
           {loggedExerciseIds.length === 0 ? (
             <div className="text-center py-20 text-slate-500">
               <div className="mb-4 flex justify-center"><ClipboardList size={48} className="opacity-20" /></div>
               <p>No workout logs yet.</p>
               <p className="text-xs mt-2">Complete a workout and log your stats to see charts here.</p>
             </div>
           ) : (
             loggedExerciseIds.map(exId => {
               const exLogs = exerciseLogs.filter(l => l.exerciseId === exId);
               const name = exLogs[0]?.exerciseName || 'Unknown Exercise';
               
               return (
                 <div key={exId} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                   <h3 className="text-slate-200 font-bold mb-4 flex justify-between items-center">
                     {name}
                     <span className="text-xs font-normal text-slate-500 bg-slate-800 px-2 py-1 rounded-full">{exLogs.length} Logs</span>
                   </h3>
                   <div className="h-40 w-full">
                     <ProgressChart logs={exLogs} width={350} height={160} />
                   </div>
                   <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 font-mono">
                     Latest: {new Date(exLogs[exLogs.length - 1].timestamp).toLocaleDateString()} — {exLogs[exLogs.length - 1].sets.reduce((a,b) => a + b.reps, 0)} total reps
                   </div>
                 </div>
               );
             })
           )}
        </main>
      </div>
    );
  };

  const renderWorkoutDetail = () => {
    if (!currentDayPlan) return null;

    // Handle Rest Days View
    if (currentDayPlan.isRestDay) {
      return (
        <div className="max-w-md mx-auto p-6 h-screen flex flex-col justify-center items-center text-center space-y-6">
           <button 
            onClick={() => setView('DASHBOARD')}
            className="absolute top-6 left-6 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-300" />
          </button>
          
          <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Moon size={40} className="text-brand-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{currentDayPlan.title}</h1>
            <h2 className="text-xl text-brand-500 mb-6">{currentDayPlan.focus}</h2>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <p className="text-slate-300 leading-relaxed text-lg">
                {currentDayPlan.description}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Handle Active Workout View
    return (
      <div className="max-w-md mx-auto min-h-screen flex flex-col bg-slate-950">
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => setView('DASHBOARD')}
              className="flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} className="mr-1" /> Back
            </button>
            <span className="font-bold text-slate-200">Day {currentDayPlan.day}: {currentDayPlan.title}</span>
            <div className="w-8" /> {/* Spacer for centering */}
          </div>

          {/* Phase Tabs */}
          <div className="flex p-1 bg-slate-900 rounded-lg">
            {(['WARMUP', 'MAIN', 'COOLDOWN'] as WorkoutPhase[]).map((p) => (
              <button
                key={p}
                onClick={() => setWorkoutPhase(p)}
                className={`flex-1 text-xs font-bold py-2 rounded-md transition-all flex items-center justify-center gap-1
                  ${workoutPhase === p 
                    ? 'bg-slate-800 text-brand-500 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-300'
                  }
                `}
              >
                {p === 'WARMUP' && <Flame size={12} />}
                {p === 'MAIN' && <Dumbbell size={12} />}
                {p === 'COOLDOWN' && <Wind size={12} />}
                {p}
              </button>
            ))}
          </div>
          
          {/* Progress Bar for Current Phase */}
          <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-500 transition-all duration-500 ease-out"
              style={{ width: `${phaseProgress}%` }}
            />
          </div>
        </header>

        {/* Exercises List */}
        <main className="flex-grow p-4 space-y-4 pb-24">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-white capitalize">
              {workoutPhase === 'MAIN' ? 'Workout Routine' : `${workoutPhase} Routine`}
            </h2>
            <Timer />
          </div>

          {activeExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isCompleted={completedExercises.has(exercise.id)}
              onToggle={() => toggleExercise(exercise.id)}
              onSaveLog={handleSaveLog}
              lastLog={getLastLog(exercise.id)}
            />
          ))}

          {activeExercises.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              No exercises for this phase.
            </div>
          )}

          {/* Phase Navigation Footer */}
          <div className="pt-8">
            <button
              onClick={() => {
                if (workoutPhase === 'WARMUP') setWorkoutPhase('MAIN');
                else if (workoutPhase === 'MAIN') setWorkoutPhase('COOLDOWN');
                else setView('DASHBOARD');
              }}
              className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-900/20 transition-all flex items-center justify-center gap-2"
            >
              {workoutPhase === 'COOLDOWN' ? 'Finish Workout' : 'Next Phase'} 
              <ChevronRight size={20} />
            </button>
          </div>
        </main>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-brand-500/30">
      {view === 'DASHBOARD' && renderDashboard()}
      {view === 'PROGRESS' && renderProgressView()}
      {view === 'WORKOUT_DETAIL' && renderWorkoutDetail()}
    </div>
  );
};

export default App;
// Helper component for empty state icon
const ClipboardList = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
    <path d="M9 8h6" />
  </svg>
);