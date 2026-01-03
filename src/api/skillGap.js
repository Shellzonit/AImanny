// API integration for Skill Gap Analyzer & Microlearning
const API_URL = 'http://localhost:8000/skill-gap';

export async function analyzeSkills(userId, targetRole) {
  const res = await fetch(`${API_URL}/analyze/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, target_role: targetRole })
  });
  if (!res.ok) throw new Error('Failed to analyze skills');
  return await res.json();
}

export async function getMicroLessons(skill) {
  const res = await fetch(`${API_URL}/lessons/${encodeURIComponent(skill)}`);
  if (!res.ok) throw new Error('Failed to fetch lessons');
  return await res.json();
}
