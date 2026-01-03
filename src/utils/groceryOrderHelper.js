// Helper for grocery ordering via Instacart or Walmart (scaffold)

/**
 * Generate a grocery order link for Instacart or Walmart based on a list of items.
 * @param {Array<string>} items - List of grocery items
 * @param {string} provider - 'instacart' | 'walmart'
 * @returns {string} URL to order page
 */
export function getGroceryOrderLink(items, provider = 'instacart') {
  const query = encodeURIComponent(items.join(', '));
  if (provider === 'walmart') {
    // Walmart search URL
    return `https://www.walmart.com/search?q=${query}`;
  }
  // Instacart search URL (will show results for the first item)
  return `https://www.instacart.com/store/search_v3/${encodeURIComponent(items[0] || '')}`;
}

// Example usage:
// getGroceryOrderLink(['spinach', 'chicken breast', 'almonds'], 'instacart')
