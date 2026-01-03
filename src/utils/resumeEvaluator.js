// Simple resume evaluator and job matcher (placeholder logic)

const jobDatabase = [
  { title: 'AI Data Analyst', keywords: ['data', 'analysis', 'python', 'sql'] },
  { title: 'Prompt Engineer', keywords: ['prompt', 'language', 'ai', 'llm'] },
  { title: 'AI Product Manager', keywords: ['product', 'manager', 'ai', 'strategy'] },
  { title: 'AI Support Specialist', keywords: ['support', 'customer', 'ai', 'help'] },
  { title: 'AI Trainer', keywords: ['training', 'teach', 'ai', 'curriculum'] },
];

export function evaluateResume(resumeText) {
  let feedback = 'Your resume looks good!';
  let bestMatch = null;
  let maxMatches = 0;

  // Job matching logic
  for (const job of jobDatabase) {
    const matches = job.keywords.filter(k => resumeText.toLowerCase().includes(k)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = job.title;
    }
  }

  if (bestMatch) {
    feedback = `Your resume matches best with: ${bestMatch}`;
  } else {
    feedback = 'No strong job match found. Try adding more relevant skills or experience.';
  }

  // Basic grammar checks
  const grammarIssues = [];
  // Check for repeated words (e.g., 'the the')
  const repeatedWordPattern = /\b(\w+) \1\b/gi;
  if (repeatedWordPattern.test(resumeText)) {
    grammarIssues.push('Repeated words detected (e.g., "the the").');
  }
  // Check for sentences not starting with a capital letter
  const sentences = resumeText.split(/[.!?]\s+/);
  for (const sentence of sentences) {
    if (sentence.length > 1 && sentence[0] === sentence[0].toLowerCase()) {
      grammarIssues.push('Some sentences do not start with a capital letter.');
      break;
    }
  }
  // Check for common mistakes (e.g., 'i' instead of 'I')
  if (/\bi\b/.test(resumeText)) {
    grammarIssues.push('Use "I" instead of "i" when referring to yourself.');
  }

  if (grammarIssues.length > 0) {
    feedback += '\nGrammar suggestions:\n- ' + grammarIssues.join('\n- ');
  }

  return { feedback, bestMatch, grammarIssues };
}
