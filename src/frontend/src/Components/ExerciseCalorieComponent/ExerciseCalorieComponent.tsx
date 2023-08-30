import "./ExerciseCalorieComponent.css";
const ExerciseCalorieComponent = (props: {
  timestamp: string;
  exerciseType: string;
  calories: number;
}) => {
  return (
    <div className="ExerciseCalorieComponent">
      <div className="Exercise-title-container">
        {props.exerciseType ? (
          <h3>
            {props.timestamp} - &#123;{props.exerciseType}&#125;
          </h3>
        ) : (
          <h3>{props.timestamp}</h3>
        )}
      </div>
      <div className="Exercise-calorie-container">
        <p>calories: {props.calories}</p>
      </div>
    </div>
  );
};

export default ExerciseCalorieComponent;
