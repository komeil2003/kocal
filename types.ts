export enum ExerciseType {
    WARMUP = 'Warm-Up',
    MAIN = 'Main Workout',
    COOLDOWN = 'Cool-Down',
    REST = 'Rest'
  }
  
  export interface Exercise {
    id: string;
    name: string;
    sets?: string;
    reps?: string;
    duration?: string;
    note?: string; // Captures "Why", "Form", "Tempo", "Crucial"
    tag?: string; // Short tag like "Hypertrophy" or "Mobility"
  }
  
  export interface DailyPlan {
    day: number;
    title: string;
    focus: string;
    description?: string;
    exercises: Exercise[];
    isRestDay: boolean;
  }
  
  export interface ProgramData {
    warmup: Exercise[];
    cooldown: Exercise[];
    schedule: DailyPlan[];
  }

  export interface SetResult {
    reps: number;
    weight?: number;
  }

  export interface ExerciseLog {
    id: string;
    exerciseId: string;
    exerciseName: string;
    timestamp: number;
    sets: SetResult[];
    note?: string;
  }