// API integration for AI Ethics & Impact Explorer
const API_URL = 'http://localhost:8000/ai-ethics';

export async function listScenarios() {
  const res = await fetch(`${API_URL}/scenarios/`);
  if (!res.ok) throw new Error('Failed to fetch scenarios');
  return await res.json();
}


export async function listResources() {
  const res = await fetch(`${API_URL}/resources/`);
  if (!res.ok) throw new Error('Failed to fetch resources');
  return await res.json();
}

export async function getScenario(scenarioId) {
  const res = await fetch(`${API_URL}/scenario/${scenarioId}`);
  if (!res.ok) throw new Error('Failed to fetch scenario');
  return await res.json();
}

export async function respondScenario(scenarioId, userId, choice, reflection = '') {
  const res = await fetch(`${API_URL}/scenario/${scenarioId}/respond/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, choice, reflection })
  });
  if (!res.ok) throw new Error('Failed to submit response');
  return await res.json();
}

export async function getUserResponses(userId) {
  const res = await fetch(`${API_URL}/responses/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch responses');
  return await res.json();
}
