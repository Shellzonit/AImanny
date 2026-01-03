// API integration for advanced LLM-powered chatbot
const API_URL = 'http://localhost:8000/chatbot';

export async function sendMessage(userId, message) {
  const res = await fetch(`${API_URL}/message/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, message })
  });
  if (!res.ok) throw new Error('Failed to get reply');
  return await res.json();
}
