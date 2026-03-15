/**
 * Shared helper functions used across multiple pages.
 *
 * Centralised here to avoid duplication and keep behaviour consistent.
 */

/**
 * Returns a greeting based on the current time of day.
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Returns a human-readable relative date string.
 *
 * Examples: "Today", "Yesterday", "3d ago", "2w ago", "Mar 5"
 */
export function getRelativeDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Returns a relative timestamp with minute/hour granularity for recent times.
 *
 * Examples: "Just now", "5m ago", "3h ago", "2d ago", "Mar 5"
 */
export function timeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMins = Math.floor((now - date) / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  return getRelativeDate(timestamp);
}

/**
 * Calculates total volume (reps × weight) for a single workout.
 */
export function getWorkoutVolume(workout) {
  return workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.reps * set.weight, 0),
    0,
  );
}

/**
 * Calculates total number of sets across all exercises in a workout.
 */
export function getWorkoutSets(workout) {
  return workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
}

/**
 * Returns the index of the "best" set (highest single-set volume).
 * Returns null when every set has zero volume.
 */
export function getBestSetIndex(sets) {
  let bestIndex = null;
  let bestVolume = 0;

  sets.forEach((set, i) => {
    const vol = set.reps * set.weight;
    if (vol > bestVolume) {
      bestVolume = vol;
      bestIndex = i;
    }
  });

  return bestIndex;
}

/**
 * Formats seconds into a timer string.
 *
 * Examples: "1:05", "1:23:05"
 */
export function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Returns a Set of weekday indices (0=Mon … 6=Sun) that had a workout this week.
 */
export function getWeekActivity(workouts) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  const activeDays = new Set();
  workouts.forEach(w => {
    const d = new Date(w.date);
    if (d >= monday) {
      activeDays.add((d.getDay() + 6) % 7);
    }
  });
  return activeDays;
}
