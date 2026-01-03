// AI-powered wellness coach for tracking and advice (placeholder logic)

const unhealthyCopingTriggers = [
  'excessive alcohol',
  'binge eating',
  'skipping meals',
  'not sleeping',
  'isolation',
  'doomscrolling',
  'self-criticism',
  'substance misuse',
  'anger outbursts',
  'avoidance',
];

const positiveCopingSkills = {
  active: [
    'Go for a brisk walk or exercise',
    'Practice deep breathing or meditation',
    'Talk to a friend or support person',
    'Write in a journal',
    'Do a creative activity (art, music, etc.)',
    'Tidy up your space',
    'Cook a healthy meal',
    'Volunteer or help someone else',
  ],
  passive: [
    'Listen to calming music',
    'Watch a favorite movie or show',
    'Read a book',
    'Take a warm bath',
    'Enjoy a cup of tea',
    'Sit quietly and observe your thoughts',
    'Spend time in nature',
  ]
};

export function checkUnhealthyCoping(input) {
  const found = unhealthyCopingTriggers.filter(trigger => input.toLowerCase().includes(trigger));
  return found.length > 0 ? `Warning: Detected possible unhealthy coping: ${found.join(', ')}. Consider positive alternatives below.` : '';
}

export function getPositiveCopingSkill(type = 'active') {
  const skills = positiveCopingSkills[type] || positiveCopingSkills.active;
  return skills[Math.floor(Math.random() * skills.length)];
}

export function getHydrationAdvice(waterCups) {
  if (waterCups < 4) return 'Try to drink more water today. Aim for 6-8 cups for most adults.';
  if (waterCups < 8) return 'Good job! Stay hydrated and keep sipping water throughout the day.';
  return 'Excellent hydration! Your body and mind thank you.';
}

export function getAlcoholAdvice(drinks) {
  if (drinks === 0) return 'Great job avoiding alcohol today!';
  if (drinks <= 2) return 'Moderate alcohol consumption. Remember to drink water and know your limits.';
  return 'Caution: High alcohol intake can harm your health. Consider cutting back and using positive coping skills.';
}

export function getSleepAdvice(hours) {
  if (hours < 6) return 'Try to get more sleep tonight. Most adults need 7-9 hours for optimal health.';
  if (hours < 8) return 'Decent sleep! Aim for a bit more rest if you can.';
  return 'Great sleep! Your body and mind are recharged.';
}

export function getHealthyEatingAdvice(meals, fruitsVeggies) {
  if (meals < 3) return 'Try to eat regular meals to keep your energy steady.';
  if (fruitsVeggies < 2) return 'Add more fruits and veggies for a nutrition boost!';
  return 'Nice job eating balanced meals and including fruits/veggies!';
}
