export const getUserBodyWeightUrl = (userId, startDate, endDate) => {
  return (
    "http://localhost:8000/api/bodyweight/user/" +
    userId +
    "?start=" +
    startDate +
    "&end=" +
    endDate
  );
};

export const getUserIntakeCalorieUrl = (userId, startDate, endDate) => {
  return (
    "http://localhost:8000/api/intakecalorie/user/" +
    userId +
    "?start=" +
    startDate +
    "&end=" +
    endDate
  );
};

export const getUserExerciseCalorieUrl = (userId, startDate, endDate) => {
  return (
    "http://localhost:8000/api/exercisecalorie/user/" +
    userId +
    "?start=" +
    startDate +
    "&end=" +
    endDate
  );
};

export const postUserBodyWeightUrl = (userId) => {
  return "http://localhost:8000/api/bodyweight/create/" + userId;
};

export const postUserIntakeCalorieUrl = (userId) => {
  return "http://localhost:8000/api/intakecalorie/create/" + userId;
};

export const postExerciseCalorieUrl = (userId) => {
  return "http://localhost:8000/api/exercisecalorie/create/" + userId;
};
