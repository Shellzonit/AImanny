// API integration for Microlearning lessons and progress
const API_URL = 'http://localhost:8000/microlearning';

export async function getLessons(skill) {
  const res = await fetch(`${API_URL}/lessons/${encodeURIComponent(skill)}`);
  if (!res.ok) throw new Error('Failed to fetch lessons');
  return await res.json();
}

export async function updateProgress(userId, lessonId, completed, score = 0) {
  const res = await fetch(`${API_URL}/progress/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, lesson_id: lessonId, completed, score })
  });
  if (!res.ok) throw new Error('Failed to update progress');
  return await res.json();
}

export async function getUserProgress(userId) {
  const res = await fetch(`${API_URL}/progress/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch user progress');
  return await res.json();
}
