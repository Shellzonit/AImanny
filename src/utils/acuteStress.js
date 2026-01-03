// Acute stress monitor and destressing measures (placeholder logic)

const stressQuestions = [
  'How stressed do you feel right now? (1-10)',
  'Are you experiencing any of the following: racing heart, trouble breathing, sweating, or feeling panicked?',
  'Have you had trouble sleeping or eating due to stress?',
  'Are you able to focus on daily tasks?'
];

const destressMeasures = [
  'Pause and take 5 slow, deep breaths.',
  'Try a 2-minute body scan meditation.',
  'Step outside for fresh air and gentle movement.',
  'Splash cool water on your face or wrists.',
  'Listen to calming music or nature sounds.',
  'Write down your worries, then set them aside for now.',
  'Reach out to a friend or support person.'
];

export function getStressQuestions() {
  return stressQuestions;
}

export function getDestressMeasure() {
  return destressMeasures[Math.floor(Math.random() * destressMeasures.length)];
}

export const wellnessDisclaimer =
  'Disclaimer: This app provides general wellness tips and stress management suggestions. It does not replace medical advice, diagnosis, or treatment. For medical, dietary, or mental health concerns, please consult a qualified healthcare or mental health professional.';
