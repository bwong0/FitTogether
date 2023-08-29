interface ExerciseCalorie {
  id: number;
  timestamp: string;
  userId: number;
  timestampParts: string[];
  twelveHour: string;
  exerciseType: string;
  calories: number;
  type: string;
}

export default ExerciseCalorie;
