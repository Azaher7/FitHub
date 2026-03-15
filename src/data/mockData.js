// Mock user data
export const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  username: 'alexlifts',
  email: 'alex@example.com',
  bio: 'Chasing strength PRs one rep at a time.',
  fitnessGoal: 'Build Strength',
  profilePicture: null,
  joinDate: '2025-01-15',
  stats: {
    totalWorkouts: 47,
    thisWeek: 3,
    currentStreak: 5,
    longestStreak: 12,
    totalVolume: 284500,
    totalHours: 42,
    prs: 8,
  },
};

// Exercise library
export const exerciseLibrary = [
  { id: 'e1', name: 'Bench Press', category: 'Chest', equipment: 'Barbell' },
  { id: 'e2', name: 'Squat', category: 'Legs', equipment: 'Barbell' },
  { id: 'e3', name: 'Deadlift', category: 'Back', equipment: 'Barbell' },
  { id: 'e4', name: 'Overhead Press', category: 'Shoulders', equipment: 'Barbell' },
  { id: 'e5', name: 'Barbell Row', category: 'Back', equipment: 'Barbell' },
  { id: 'e6', name: 'Pull Up', category: 'Back', equipment: 'Bodyweight' },
  { id: 'e7', name: 'Dumbbell Curl', category: 'Arms', equipment: 'Dumbbell' },
  { id: 'e8', name: 'Tricep Pushdown', category: 'Arms', equipment: 'Cable' },
  { id: 'e9', name: 'Leg Press', category: 'Legs', equipment: 'Machine' },
  { id: 'e10', name: 'Lateral Raise', category: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'e11', name: 'Incline Dumbbell Press', category: 'Chest', equipment: 'Dumbbell' },
  { id: 'e12', name: 'Romanian Deadlift', category: 'Legs', equipment: 'Barbell' },
  { id: 'e13', name: 'Cable Fly', category: 'Chest', equipment: 'Cable' },
  { id: 'e14', name: 'Leg Curl', category: 'Legs', equipment: 'Machine' },
  { id: 'e15', name: 'Face Pull', category: 'Shoulders', equipment: 'Cable' },
];

// Workout templates
export const mockTemplates = [
  {
    id: 't1',
    name: 'Push Day',
    exercises: [
      { exerciseId: 'e1', exercise: exerciseLibrary[0], sets: 4, reps: 8 },
      { exerciseId: 'e4', exercise: exerciseLibrary[3], sets: 3, reps: 10 },
      { exerciseId: 'e11', exercise: exerciseLibrary[10], sets: 3, reps: 12 },
      { exerciseId: 'e10', exercise: exerciseLibrary[9], sets: 3, reps: 15 },
      { exerciseId: 'e8', exercise: exerciseLibrary[7], sets: 3, reps: 12 },
    ],
    lastUsed: '2025-03-10',
  },
  {
    id: 't2',
    name: 'Pull Day',
    exercises: [
      { exerciseId: 'e3', exercise: exerciseLibrary[2], sets: 4, reps: 5 },
      { exerciseId: 'e5', exercise: exerciseLibrary[4], sets: 4, reps: 8 },
      { exerciseId: 'e6', exercise: exerciseLibrary[5], sets: 3, reps: 8 },
      { exerciseId: 'e7', exercise: exerciseLibrary[6], sets: 3, reps: 12 },
      { exerciseId: 'e15', exercise: exerciseLibrary[14], sets: 3, reps: 15 },
    ],
    lastUsed: '2025-03-12',
  },
  {
    id: 't3',
    name: 'Leg Day',
    exercises: [
      { exerciseId: 'e2', exercise: exerciseLibrary[1], sets: 4, reps: 6 },
      { exerciseId: 'e9', exercise: exerciseLibrary[8], sets: 3, reps: 10 },
      { exerciseId: 'e12', exercise: exerciseLibrary[11], sets: 3, reps: 10 },
      { exerciseId: 'e14', exercise: exerciseLibrary[13], sets: 3, reps: 12 },
    ],
    lastUsed: '2025-03-08',
  },
];

// Workout history
export const mockWorkoutHistory = [
  {
    id: 'w1',
    templateName: 'Push Day',
    date: '2025-03-14',
    duration: 62,
    exercises: [
      {
        name: 'Bench Press',
        sets: [
          { reps: 8, weight: 185, completed: true },
          { reps: 8, weight: 185, completed: true },
          { reps: 7, weight: 185, completed: true },
          { reps: 6, weight: 185, completed: true },
        ],
      },
      {
        name: 'Overhead Press',
        sets: [
          { reps: 10, weight: 95, completed: true },
          { reps: 10, weight: 95, completed: true },
          { reps: 8, weight: 95, completed: true },
        ],
      },
      {
        name: 'Incline Dumbbell Press',
        sets: [
          { reps: 12, weight: 55, completed: true },
          { reps: 10, weight: 55, completed: true },
          { reps: 10, weight: 55, completed: true },
        ],
      },
    ],
  },
  {
    id: 'w2',
    templateName: 'Pull Day',
    date: '2025-03-12',
    duration: 55,
    exercises: [
      {
        name: 'Deadlift',
        sets: [
          { reps: 5, weight: 315, completed: true },
          { reps: 5, weight: 315, completed: true },
          { reps: 5, weight: 315, completed: true },
          { reps: 4, weight: 315, completed: true },
        ],
      },
      {
        name: 'Barbell Row',
        sets: [
          { reps: 8, weight: 155, completed: true },
          { reps: 8, weight: 155, completed: true },
          { reps: 8, weight: 155, completed: true },
          { reps: 7, weight: 155, completed: true },
        ],
      },
      {
        name: 'Pull Up',
        sets: [
          { reps: 8, weight: 0, completed: true },
          { reps: 7, weight: 0, completed: true },
          { reps: 6, weight: 0, completed: true },
        ],
      },
    ],
  },
  {
    id: 'w3',
    templateName: 'Leg Day',
    date: '2025-03-10',
    duration: 48,
    exercises: [
      {
        name: 'Squat',
        sets: [
          { reps: 6, weight: 225, completed: true },
          { reps: 6, weight: 225, completed: true },
          { reps: 5, weight: 225, completed: true },
          { reps: 5, weight: 225, completed: true },
        ],
      },
      {
        name: 'Leg Press',
        sets: [
          { reps: 10, weight: 360, completed: true },
          { reps: 10, weight: 360, completed: true },
          { reps: 10, weight: 360, completed: true },
        ],
      },
    ],
  },
  {
    id: 'w4',
    templateName: 'Push Day',
    date: '2025-03-08',
    duration: 58,
    exercises: [
      {
        name: 'Bench Press',
        sets: [
          { reps: 8, weight: 180, completed: true },
          { reps: 8, weight: 180, completed: true },
          { reps: 8, weight: 180, completed: true },
          { reps: 7, weight: 180, completed: true },
        ],
      },
    ],
  },
];
