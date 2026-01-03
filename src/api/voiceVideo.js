// API integration for Voice & Video features
const API_URL = 'http://localhost:8000/voice-video';

export async function uploadVoice(userId, file) {
  const formData = new FormData();
  formData.append('user_id', userId);
  formData.append('file', file);
  const res = await fetch(`${API_URL}/voice/upload/`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload voice');
  return await res.json();
}

export async function getVoiceMessages(userId) {
  const res = await fetch(`${API_URL}/voice/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch voice messages');
  return await res.json();
}

export async function startVideoSession(userId, topic) {
  const res = await fetch(`${API_URL}/video/start/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, topic }),
  });
  if (!res.ok) throw new Error('Failed to start video session');
  return await res.json();
}

export async function getVideoSessions(userId) {
  const res = await fetch(`${API_URL}/video/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch video sessions');
  return await res.json();
}
