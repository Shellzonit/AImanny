// AI-powered interview attire and company culture advisor (placeholder logic)

/**
 * Suggest interview attire based on company type and role.
 * @param {string} companyType - e.g. 'startup', 'corporate', 'tech', 'finance', 'creative', etc.
 * @param {string} role - e.g. 'engineer', 'designer', 'manager'
 * @returns {string} attire advice
 */
export function getAttireAdvice(companyType, role) {
  if (companyType === 'finance' || companyType === 'corporate') {
    return 'Wear formal business attire: suit, tie, dress shirt, and dress shoes. Conservative colors are best.';
  }
  if (companyType === 'tech' && role === 'engineer') {
    return 'Business casual is usually appropriate: collared shirt or blouse, slacks or neat jeans, and closed-toe shoes.';
  }
  if (companyType === 'creative') {
    return 'Smart casual with a touch of personality is welcome. Show your style, but keep it professional.';
  }
  return 'When in doubt, business casual is a safe choice. Make sure your clothes are clean, pressed, and fit well.';
}

/**
 * Provide a brief about company culture based on company name (placeholder logic).
 * @param {string} companyName
 * @returns {string} culture advice
 */
export function getCompanyCulture(companyName) {
  // In production, this would call an API or use a database
  const knownCultures = {
    'Google': 'Google is known for its innovative, open, and collaborative culture. Expect flexibility, creativity, and a focus on impact.',
    'Goldman Sachs': 'Goldman Sachs has a formal, high-performance, and competitive culture. Professionalism and drive are highly valued.',
    'Meta': 'Meta (Facebook) values openness, fast iteration, and bold ideas. The environment is fast-paced and data-driven.',
    'Pixar': 'Pixar fosters creativity, teamwork, and storytelling. The culture is supportive and values artistic expression.'
  };
  return knownCultures[companyName] || 'Research the company on Glassdoor, LinkedIn, and their website for insights into their culture. Look for values, work environment, and employee reviews.';
}
