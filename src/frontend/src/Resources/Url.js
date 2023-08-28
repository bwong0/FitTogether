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

export const postUserBodyWeightUrl = (userId) => {
  return "http://localhost:8000/api/bodyweight/create/" + userId;
};
