import { useEffect, useState } from "react";
import "./ViewCalorie.css";
import {
  getUserExerciseCalorieUrl,
  getUserIntakeCalorieUrl,
} from "../../Resources/Url";
import { convert24to12, splitTimeStamp } from "../../Resources/Types/DateYear";
import CombinedCalories from "../../Resources/Types/CombinedCalorie";
import CombinedCaloriesView from "../CombinedCalorieView/CombinedCalorieView";

const ViewCalorie = (props: {
  userId: number;
  date: string;
  monthDate: string;
}) => {
  const [combinedCalories, setCombinedCalories] = useState<CombinedCalories[]>(
    []
  );
  const [intakeValues, setintakeValues] = useState<{
    calorie: number;
    protein: number;
    carbohydrate: number;
    fat: number;
  }>({
    calorie: 0,
    protein: 0,
    carbohydrate: 0,
    fat: 0,
  });
  const [exerciseValues, setexerciseValues] = useState<{ calorie: number }>({
    calorie: 0,
  });
  const [isPending, setIsPending] = useState(true);
  const [errorState, setErrorState] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    const signal = abortCont.signal;

    const preIntakeCalories = fetch(
      getUserIntakeCalorieUrl(props.userId, props.date, ""),
      { signal }
    );
    const preExerciseCalories = fetch(
      getUserExerciseCalorieUrl(props.userId, props.date, ""),
      { signal }
    );

    Promise.all([preIntakeCalories, preExerciseCalories])
      .then((responses) =>
        Promise.all(
          responses.map((response) => {
            if (response.ok !== true) {
              throw Error("Fetching Error");
            }
            return response.json();
          })
        )
      )
      .then((data) => {
        const preIntakeCalories: CombinedCalories[] = data[0];
        let calorieIntakeTotal = 0;
        let proteinIntakeTotal = 0;
        let carbohydrateIntakeTotal = 0;
        let fatIntakeTotal = 0;
        preIntakeCalories.forEach((intake) => {
          intake.timestampParts = splitTimeStamp(intake.timestamp);
          intake.twelveHour = convert24to12(intake.timestampParts[1]);
          intake.type = "intake";
          calorieIntakeTotal += intake.calories;
          proteinIntakeTotal += intake.proteins;
          carbohydrateIntakeTotal += intake.carbohydrates;
          fatIntakeTotal += intake.fats;
        });
        setintakeValues({
          calorie: calorieIntakeTotal,
          protein: proteinIntakeTotal,
          carbohydrate: carbohydrateIntakeTotal,
          fat: fatIntakeTotal,
        });
        const preExerciseCalories: CombinedCalories[] = data[1];
        let calorieExerciseTotal = 0;
        preExerciseCalories.forEach((exercise) => {
          exercise.timestampParts = splitTimeStamp(exercise.timestamp);
          exercise.twelveHour = convert24to12(exercise.timestampParts[1]);
          calorieExerciseTotal += exercise.calories;
          exercise.type = "exercise";
        });
        console.log(preIntakeCalories);
        console.log(preExerciseCalories);
        setexerciseValues({ calorie: calorieExerciseTotal });
        setIsPending(false);
        setErrorState(null);
        console.log("merging");
        const preCombinedCalories: CombinedCalories[] = [
          ...preIntakeCalories,
          ...preExerciseCalories,
        ];
        preCombinedCalories.sort((a, b) =>
          a.twelveHour.localeCompare(b.twelveHour)
        );
        setCombinedCalories(preCombinedCalories);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch Abort");
        } else {
          setIsPending(false);
          setErrorState(err.message);
        }
      });
  }, []);
  return (
    <div className="ViewCalorie">
      {combinedCalories && (
        <CombinedCaloriesView
          combinedCaloriesProp={combinedCalories}
          titleProp={props.monthDate}
          intakeProp={intakeValues}
          exeriseProp={exerciseValues}
        />
      )}
      {errorState && <div>Error State: {errorState}</div>}
      {isPending && <div>List Is Loading...</div>}
    </div>
  );
};

export default ViewCalorie;
