interface IntakeCalorie {
  id: number;
  timestamp: string;
  userId: number;
  timestampParts: string[];
  twelveHour: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  note: string;
  type: string;
}

export default IntakeCalorie;
