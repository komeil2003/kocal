import { ProgramData, ExerciseType } from './types';

export const WARMUP_ROUTINE = [
  { id: 'w1', name: 'Wrist Rolls & Waves', duration: '1 min', note: 'Vital for Handstand health.', tag: 'Joint Health' },
  { id: 'w2', name: 'Cat-Cow Stretch', duration: '1 min', tag: 'Spine' },
  { id: 'w3', name: 'Scapular Shrugs', sets: '2', reps: '10', note: 'Do in push-up position.', tag: 'Activation' },
  { id: 'w4', name: 'Arm Circles', duration: '1 min', note: 'Large and small circles.', tag: 'Mobility' },
  { id: 'w5', name: 'Passive Dead Hang', duration: '30 sec', tag: 'Decompression' },
  { id: 'w6', name: 'Jumping Jacks', duration: '2 mins', note: 'Raise body temp.', tag: 'Cardio' },
];

export const COOLDOWN_ROUTINE = [
  { id: 'c1', name: 'Passive Hang', duration: '30 sec', tag: 'Decompression' },
  { id: 'c2', name: 'Chest Opener (Wall)', duration: '1 min/side', tag: 'Flexibility' },
  { id: 'c3', name: 'Lat Stretch', duration: '1 min/side', tag: 'Flexibility' },
  { id: 'c4', name: 'Deep Squat Hold', duration: '1 min', note: 'Open hips.', tag: 'Mobility' },
  { id: 'c5', name: 'Child’s Pose', duration: '1 min', tag: 'Relaxation' },
];

export const PROGRAM_SCHEDULE = [
  {
    day: 1,
    title: 'Push A',
    focus: 'Strength & Handstand Prep',
    isRestDay: false,
    exercises: [
      { id: 'd1-1', name: 'Pike Push-ups', sets: '3', reps: '5–8', note: 'Direct strength for Handstand. Keep legs straight.', tag: 'Strength' },
      { id: 'd1-2', name: 'Classic Push-ups', sets: '3', reps: '12–15', note: 'Core tight. Do not let lower back sag.', tag: 'Volume' },
      { id: 'd1-3', name: 'Parallel Bar Dips', sets: '3', reps: '6–8', note: 'Tempo: 3s down, 1s up. Hypertrophy focus.', tag: 'Hypertrophy' },
      { id: 'd1-4', name: 'Plank to Downward Dog', sets: '3', reps: '10', note: 'Shoulder mobility + Core.', tag: 'Mobility' },
      { id: 'd1-5', name: 'Hollow Body Hold', sets: '3', reps: '20–30s', note: 'Crucial: Press lower back into floor.', tag: 'Core' },
    ]
  },
  {
    day: 2,
    title: 'Pull A',
    focus: 'Strength & Thickness',
    isRestDay: false,
    exercises: [
      { id: 'd2-1', name: 'Pull-up Negatives', sets: '4', reps: '3–4', note: 'Jump up, lower in 5-8s. Better than struggling with 1 rep.', tag: 'Eccentric' },
      { id: 'd2-2', name: 'Australian Pull-ups (Rows)', sets: '3', reps: '10–12', note: 'Target: Back thickness.', tag: 'Hypertrophy' },
      { id: 'd2-3', name: 'Scapular Pull-ups', sets: '3', reps: '10', note: 'Learn to start pull with lats, not biceps.', tag: 'Technique' },
      { id: 'd2-4', name: 'Chin-up Hold (Static)', sets: '3', reps: '15–20s', note: 'Hold chin over bar. Squeeze biceps hard.', tag: 'Isometric' },
    ]
  },
  {
    day: 3,
    title: 'Legs',
    focus: 'Unilateral Stability & Knee Health',
    isRestDay: false,
    exercises: [
      { id: 'd3-1', name: 'Bodyweight Squats', sets: '3', reps: '15', note: 'Tempo: Slow and controlled.', tag: 'Volume' },
      { id: 'd3-2', name: 'Bulgarian Split Squats', sets: '3', reps: '8/leg', note: 'Superior to Wall Sits for long legs. Use chair behind.', tag: 'Unilateral' },
      { id: 'd3-3', name: 'Reverse Lunges', sets: '3', reps: '10/leg', tag: 'Stability' },
      { id: 'd3-4', name: 'Glute Bridges', sets: '3', reps: '15', tag: 'Glutes' },
      { id: 'd3-5', name: 'Calf Raises', sets: '3', reps: '20', tag: 'Isolation' },
    ]
  },
  {
    day: 4,
    title: 'Active Recovery',
    focus: 'Mobility & Nutrition Check',
    isRestDay: true,
    description: "Did you eat enough protein these past 3 days? Go for a 30 min walk + Light Stretching.",
    exercises: []
  },
  {
    day: 5,
    title: 'Push B',
    focus: 'Hypertrophy & Triceps (L-Sit)',
    isRestDay: false,
    exercises: [
      { id: 'd5-1', name: 'Decline Push-ups', sets: '3', reps: '10–12', note: 'Feet on chair. Target: Upper Chest.', tag: 'Aesthetics' },
      { id: 'd5-2', name: 'Bench Dips', sets: '3', reps: '12–15', note: 'Target: Tricep isolation.', tag: 'Isolation' },
      { id: 'd5-3', name: 'Diamond Push-ups', sets: '3', reps: '8–10', note: 'Massive Tricep builder required for L-sit.', tag: 'Strength' },
      { id: 'd5-4', name: 'L-Sit Compression Drills', sets: '3', reps: '10', note: 'Sit on floor, legs straight. Lift legs using abs/hip flexors.', tag: 'Skill' },
    ]
  },
  {
    day: 6,
    title: 'Pull B',
    focus: 'Endurance & Grip',
    isRestDay: false,
    exercises: [
      { id: 'd6-1', name: 'Chin-ups', sets: '3', reps: 'Max', note: 'Hits biceps harder than pull-ups. Or do negatives.', tag: 'Compound' },
      { id: 'd6-2', name: 'Wide Grip Australian Pull-ups', sets: '3', reps: '10–12', note: 'Target: Rear Delts and posture.', tag: 'Posture' },
      { id: 'd6-3', name: 'Active Dead Hang', sets: '3', reps: 'Max Time', note: 'Grip strength is foundation of pulling.', tag: 'Grip' },
      { id: 'd6-4', name: 'Hanging Knee Raises', sets: '3', reps: '10–12', note: 'Control the swing. Focus on abs.', tag: 'Core' },
    ]
  },
  {
    day: 7,
    title: 'Full Rest',
    focus: 'Deep Recovery',
    isRestDay: true,
    description: "Sleep 8+ hours. This is when your muscles grow. Do absolutely nothing intense.",
    exercises: []
  }
];

export const NUTRITION_TIP = "ECTOMORPH RULE: You MUST eat. This workout is useless without a caloric surplus. High protein immediately after training.";