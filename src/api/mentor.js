// Mentor API integration (using fetch)
const API_BASE = 'http://localhost:8000'; // Update if needed

export async function createOrUpdateMentorProfile(userId, profile) {
  const res = await fetch(`${API_BASE}/mentor/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, ...profile })
  });
  return res.json();
}

export async function getMentorProfile(userId) {
  const res = await fetch(`${API_BASE}/mentor/profile/${userId}`);
  return res.json();
}

export async function matchMentor(interests, goals) {
  const res = await fetch(`${API_BASE}/mentor/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: 0, interests, goals }) // user_id: 0 placeholder
  });
  return res.json();
}

export async function assignMentor(userId, mentorId) {
  const res = await fetch(`${API_BASE}/mentor/assign?user_id=${userId}&mentor_id=${mentorId}`, {
    method: 'POST'
  });
  return res.json();
}

export async function getMentees(mentorId) {
  const res = await fetch(`${API_BASE}/mentor/mentees/${mentorId}`);
  return res.json();
}
