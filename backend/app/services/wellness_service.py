# --- Hydration Tracking ---
hydration_log = {}
def log_hydration_service(user_id: str, amount_oz: float):
	hydration_log.setdefault(user_id, []).append(amount_oz)
	total = sum(hydration_log[user_id])
	return {"user_id": user_id, "total_oz": total, "log": hydration_log[user_id]}

# --- Alcohol Tracking ---
alcohol_log = {}
def log_alcohol_service(user_id: str, drinks: int, drink_type: str = None):
	alcohol_log.setdefault(user_id, []).append({"drinks": drinks, "type": drink_type})
	total = sum(entry["drinks"] for entry in alcohol_log[user_id])
	return {"user_id": user_id, "total_drinks": total, "log": alcohol_log[user_id]}

# --- Nutrition Tracking ---
nutrition_log = {}
def log_nutrition_service(user_id: str, calories: int, meal_type: str = None, notes: str = None):
	nutrition_log.setdefault(user_id, []).append({"calories": calories, "meal_type": meal_type, "notes": notes})
	total = sum(entry["calories"] for entry in nutrition_log[user_id])
	return {"user_id": user_id, "total_calories": total, "log": nutrition_log[user_id]}

# --- Menu Preview & Suggestions ---
def menu_preview_service(menu_items):
	# Simple demo: flag healthy/unhealthy items
	healthy_keywords = ["salad", "grilled", "steamed", "veggie", "fruit", "baked"]
	preview = []
	for item in menu_items:
		is_healthy = any(word in item.lower() for word in healthy_keywords)
		preview.append({"item": item, "healthy": is_healthy})
	return {"preview": preview}

# --- Habit-Building & Progress Tracking ---
habit_log = {}
def track_habit_service(user_id: str, habit: str, action: str):
	habit_log.setdefault(user_id, {}).setdefault(habit, []).append(action)
	count = len(habit_log[user_id][habit])
	return {"user_id": user_id, "habit": habit, "count": count, "log": habit_log[user_id][habit]}