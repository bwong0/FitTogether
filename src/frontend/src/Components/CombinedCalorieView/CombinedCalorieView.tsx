import CombinedCalories from "../../Resources/Types/CombinedCalorie";
import ExerciseCalorieComponent from "../ExerciseCalorieComponent/ExerciseCalorieComponent";
import IntakeCalorieComponent from "../IntakeCalorieComponent/IntakeCalorieComponent";
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
      <div className="titleBanner-container">
        <h2>{props.titleProp}</h2>
      </div>

      <div className="intake-exercise-container">
        <div className="intakeValues">
          <h3>Intake:</h3>
          <p>Calories: {props.intakeProp.calorie}</p>
          <p>Proteins: {props.intakeProp.protein}g</p>
          <p>Carbohydrates: {props.intakeProp.carbohydrate}g</p>
          <p>Fats: {props.intakeProp.fat}g</p>
        </div>
        <div className="exerciseValues">
          <h3>Exercise:</h3>
          <p>Calories: {props.exeriseProp.calorie}</p>
        </div>
      </div>

      {combinedCalories.map((calorie) => (
        <div className="combinedCalorie-container" key={calorie.id}>
          <div className="display-combinedCalorie-continer">
            {calorie.type === "intake" && (
              <IntakeCalorieComponent
                timestamp={calorie.twelveHour}
                calorie={calorie.calories}
                meal={calorie.meal}
                carbohydrate={calorie.carbohydrates}
                fat={calorie.fats}
                protein={calorie.proteins}
              />
            )}
            {calorie.type === "exercise" && (
              <ExerciseCalorieComponent
                timestamp={calorie.twelveHour}
                calories={calorie.calories}
                exerciseType={calorie.exerciseType}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CombinedCalorieView;
