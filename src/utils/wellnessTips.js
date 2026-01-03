// AI-powered wellness tips (placeholder logic)

const tips = [
  'Take a 5-minute mindful breathing break every hour.',
  'Drink a glass of water when you wake up and before each meal.',
  'Aim for at least 7 hours of sleep each night for optimal health.',
  'Try a 10-minute walk outside to boost your mood and creativity.',
  'Write down three things you are grateful for today.',
  'Stretch your body for 2 minutes after long periods of sitting.',
  'Eat a colorful fruit or vegetable with every meal.',
  'Limit screen time before bed to improve sleep quality.',
  'Practice a short guided meditation to reduce stress.',
  'Connect with a friend or loved one for social support.'
];

export function getRandomWellnessTip() {
  return tips[Math.floor(Math.random() * tips.length)];
}
