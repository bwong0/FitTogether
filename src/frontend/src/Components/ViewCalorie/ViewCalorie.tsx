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
  const [intakeCalories, setIntakeCalories] = useState<CombinedCalories[]>([]);
  const [exerciseCalories, setExerciseCalories] = useState<CombinedCalories[]>(
    []
  );
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
  const [isPendingIntake, setIsPendingIntake] = useState(true);
  const [errorStateIntake, setErrorStateIntake] = useState(null);
  const [isPendingExercise, setIsPendingExercise] = useState(true);
  const [errorStateExercise, setErrorStateExercise] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();

    fetch(getUserIntakeCalorieUrl(props.userId, props.date, ""), {
      signal: abortCont.signal,
    })
      .then((res) => {
        if (res.ok !== true) {
          throw Error("Fetching Error");
        }
        return res.json();
      })
      .then((data) => {
        const preIntakeCalories: CombinedCalories[] = data;
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
        setIntakeCalories(preIntakeCalories);
        setIsPendingIntake(false);
        setErrorStateIntake(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Intake Fetch Aborted");
        } else {
          setIsPendingIntake(false);
          setErrorStateIntake(err.message);
        }
      });
    fetch(getUserExerciseCalorieUrl(props.userId, props.date, ""), {
      signal: abortCont.signal,
    })
      .then((res) => {
        if (res.ok !== true) {
          throw Error("Fetching Error");
        }
        return res.json();
      })
      .then((data) => {
        const preExerciseCalories: CombinedCalories[] = data;
        let calorieExerciseTotal = 0;

        preExerciseCalories.forEach((exercise) => {
          exercise.timestampParts = splitTimeStamp(exercise.timestamp);
          exercise.twelveHour = convert24to12(exercise.timestampParts[1]);
          calorieExerciseTotal += exercise.calories;
          exercise.type = "exercise";
        });
        setexerciseValues({ calorie: calorieExerciseTotal });
        setExerciseCalories(preExerciseCalories);
        setIsPendingExercise(false);
        setErrorStateExercise(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Exercise Fetch Aborted");
        } else {
          setIsPendingExercise(false);
          setErrorStateExercise(err.message);
        }
      });
    const preCombinedCalories: CombinedCalories[] = [
      ...intakeCalories,
      ...exerciseCalories,
    ];
    preCombinedCalories.sort((a, b) =>
      a.twelveHour.localeCompare(b.twelveHour)
    );
    setCombinedCalories(preCombinedCalories);
  }, []);
  return (
    <div className="ViewCalorie">
      {errorStateIntake && <div>{errorStateIntake}</div>}
      {errorStateExercise && <div>{errorStateExercise}</div>}
      {isPendingIntake && <div>Intake List Is Loading...</div>}
      {isPendingExercise && <div>Exercies List Is Loading...</div>}
      {combinedCalories && (
        <CombinedCaloriesView
          combinedCaloriesProp={combinedCalories}
          titleProp={props.monthDate}
          intakeProp={intakeValues}
          exeriseProp={exerciseValues}
        />
      )}
    </div>
  );
};

export default ViewCalorie;
