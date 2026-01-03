// Restaurant menu helper for healthy eating (placeholder logic)

/**
 * Suggest healthy menu options based on a sample menu and user dietary goals.
 * @param {Array} menuItems - [{ name, calories, isVegetarian, isVegan, isGlutenFree, description }]
 * @param {object} userGoals - { calorieLimit, avoid: ['fried', 'dessert'], prefer: ['grilled', 'salad'] }
 * @returns {Array} healthyOptions
 */
export function suggestHealthyOptions(menuItems, userGoals = {}) {
  const { calorieLimit = 600, avoid = [], prefer = [] } = userGoals;
  return menuItems.filter(item => {
    if (item.calories && item.calories > calorieLimit) return false;
    if (avoid.some(word => item.name.toLowerCase().includes(word) || (item.description && item.description.toLowerCase().includes(word)))) return false;
    if (prefer.length && !prefer.some(word => item.name.toLowerCase().includes(word) || (item.description && item.description.toLowerCase().includes(word)))) return false;
    return true;
  });
}

/**
 * Example usage: suggestHealthyOptions(menu, { calorieLimit: 500, avoid: ['fried'], prefer: ['salad', 'grilled'] })
 */


// --- Real API integration for restaurant menus (Yelp Fusion API) ---
// 1. Get a Yelp API key: https://www.yelp.com/developers/v3/manage_app
// 2. Add your API key below (never commit real keys to public repos)
const YELP_API_KEY = 'YOUR_YELP_API_KEY_HERE';

/**
 * Fetch restaurant menu using Yelp Fusion API (if available)
 * @param {string} restaurantName
 * @param {string} location (address, city, or 'user-location')
 * @returns {Promise<Array>} menuItems
 */
export async function fetchRestaurantMenu(restaurantName, location) {
  if (YELP_API_KEY === 'YOUR_YELP_API_KEY_HERE') {
    // Fallback to sample menu if no API key
    return [
      { name: 'Grilled Chicken Salad', calories: 350, isVegetarian: false, isVegan: false, isGlutenFree: true, description: 'Grilled chicken breast on greens.' },
      { name: 'Veggie Wrap', calories: 420, isVegetarian: true, isVegan: true, isGlutenFree: false, description: 'Fresh veggies in a whole wheat wrap.' },
      { name: 'Cheeseburger', calories: 800, isVegetarian: false, isVegan: false, isGlutenFree: false, description: 'Beef patty with cheese.' },
      { name: 'Fruit Parfait', calories: 200, isVegetarian: true, isVegan: false, isGlutenFree: true, description: 'Yogurt, fruit, and granola.' },
      { name: 'Fried Chicken Basket', calories: 950, isVegetarian: false, isVegan: false, isGlutenFree: false, description: 'Fried chicken with fries.' }
    ];
  }
  try {
    // 1. Search for the restaurant by name and location
    const searchUrl = `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(restaurantName)}&location=${encodeURIComponent(location)}&limit=1`;
    const searchResp = await fetch(searchUrl, {
      headers: { Authorization: `Bearer ${YELP_API_KEY}` }
    });
    const searchData = await searchResp.json();
    if (!searchData.businesses || !searchData.businesses.length) throw new Error('No restaurant found');
    const businessId = searchData.businesses[0].id;

    // 2. Get menu details (Yelp API does not provide full menu, but categories and popular items)
    const detailsUrl = `https://api.yelp.com/v3/businesses/${businessId}`;
    const detailsResp = await fetch(detailsUrl, {
      headers: { Authorization: `Bearer ${YELP_API_KEY}` }
    });
    const detailsData = await detailsResp.json();
    // Try to extract menu-like items from categories or highlights
    let menuItems = [];
    if (detailsData.categories) {
      menuItems = detailsData.categories.map(cat => ({
        name: cat.title,
        calories: undefined,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        description: cat.alias
      }));
    }
    // If Yelp adds menu API, update here
    if (!menuItems.length) throw new Error('No menu data');
    return menuItems;
  } catch (e) {
    // Fallback to sample menu on error
    return [
      { name: 'Grilled Chicken Salad', calories: 350, isVegetarian: false, isVegan: false, isGlutenFree: true, description: 'Grilled chicken breast on greens.' },
      { name: 'Veggie Wrap', calories: 420, isVegetarian: true, isVegan: true, isGlutenFree: false, description: 'Fresh veggies in a whole wheat wrap.' },
      { name: 'Cheeseburger', calories: 800, isVegetarian: false, isVegan: false, isGlutenFree: false, description: 'Beef patty with cheese.' },
      { name: 'Fruit Parfait', calories: 200, isVegetarian: true, isVegan: false, isGlutenFree: true, description: 'Yogurt, fruit, and granola.' },
      { name: 'Fried Chicken Basket', calories: 950, isVegetarian: false, isVegan: false, isGlutenFree: false, description: 'Fried chicken with fries.' }
    ];
  }
}
