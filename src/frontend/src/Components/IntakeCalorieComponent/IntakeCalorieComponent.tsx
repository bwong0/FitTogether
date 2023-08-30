import "./IntakeCalorieComponent.css";
const IntakeCalorieComponent = (props: {
  timestamp: string;
  calorie: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  meal: string;
}) => {
  return (
    <div className="IntakeCalorieComponent">
      <div className="Intake-title-container">
        {props.meal ? (
          <h3>
            {props.timestamp} - &#123;{props.meal}&#125;
          </h3>
        ) : (
          <h3>{props.timestamp}</h3>
        )}
      </div>
      <div className="Intake-parent-container">
        <div className="Intake-left-container">
          <p>calories: {props.calorie}</p>
          <p>protein: {props.protein}g</p>
        </div>
        <div className="Intake-right-container">
          <p>carbohydrates: {props.carbohydrate}g</p>
          <p>fats: {props.fat}g</p>
        </div>
      </div>
    </div>
  );
};

export default IntakeCalorieComponent;
