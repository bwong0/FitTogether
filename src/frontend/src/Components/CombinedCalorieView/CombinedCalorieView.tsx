import CombinedCalories from "../../Resources/Types/CombinedCalorie";
import "./CombinedCalorieView.css";

const CombinedCalorieView = (props: {
  combinedCaloriesProp: CombinedCalories[];
  titleProp: string;
  intakeProp: {
    calorie: number;
    protein: number;
    fat: number;
    carbohydrate: number;
  };
  exeriseProp: { calorie: number };
}) => {
  const combinedCalories = props.combinedCaloriesProp;
  return (
    <div className="combinedCalorie-list">
      <div className="intake-exercise-container">
        <div className="intakeValues">
          <h3>Intake:</h3>
          <p>Calories: {props.intakeProp.calorie}</p>
          <p>Proteins: {props.intakeProp.protein}</p>
          <p>Carbohydrates: {props.intakeProp.carbohydrate}</p>
          <p>Fats: {props.intakeProp.fat}</p>
        </div>
        <div className="exerciseValues">
          <h3>Exercise:</h3>
          <p>Calories: {props.exeriseProp.calorie}</p>
        </div>
      </div>

      {combinedCalories.map((calorie) => (
        <div className="combinedCalorie-container" key={calorie.id}>
          <div className="display-combinedCalorie-continer">
            <h2>{calorie.twelveHour}</h2>
            {calorie.type === "intake" && <p>{calorie.calories}</p>}
            {calorie.type === "exercise" && <p>{calorie.calories}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CombinedCalorieView;
