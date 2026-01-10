from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# --- Hydration Tracking ---
class HydrationInput(BaseModel):
    user_id: str
    amount_oz: float

@router.post("/hydration/log")
def log_hydration(data: HydrationInput):
    from app.services.wellness_service import log_hydration_service
    return log_hydration_service(data.user_id, data.amount_oz)

# --- Alcohol Tracking ---
class AlcoholInput(BaseModel):
    user_id: str
    drinks: int
    drink_type: Optional[str] = None

@router.post("/alcohol/log")
def log_alcohol(data: AlcoholInput):
    from app.services.wellness_service import log_alcohol_service
    return log_alcohol_service(data.user_id, data.drinks, data.drink_type)

# --- Nutrition Tracking ---
class NutritionInput(BaseModel):
    user_id: str
    calories: int
    meal_type: Optional[str] = None
    notes: Optional[str] = None

@router.post("/nutrition/log")
def log_nutrition(data: NutritionInput):
    from app.services.wellness_service import log_nutrition_service
    return log_nutrition_service(data.user_id, data.calories, data.meal_type, data.notes)

# --- Menu Preview & Suggestions ---
class MenuPreviewInput(BaseModel):
    menu_items: List[str]

@router.post("/menu/preview")
def menu_preview(data: MenuPreviewInput):
    from app.services.wellness_service import menu_preview_service
    return menu_preview_service(data.menu_items)

# --- Habit-Building & Progress Tracking ---
class HabitInput(BaseModel):
    user_id: str
    habit: str
    action: str  # e.g., "log", "complete"

@router.post("/habit/track")
def track_habit(data: HabitInput):
    from app.services.wellness_service import track_habit_service
    return track_habit_service(data.user_id, data.habit, data.action)
