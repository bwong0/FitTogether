interface CombinedCalories {
  id: number;
  timestamp: string;
  userId: number;
  timestampParts: string[];
  twelveHour: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  meal: string;
  exerciseType: string;
  type: string;
}

export default CombinedCalories;
