import "./CreateExerciseCalorie.css";
import { useState } from "react";
import { postExerciseCalorieUrl } from "../../Resources/Url";
import axios from "axios";
import {
  handleIntUseStateSetterFromHTMLInputElement,
  handleStringUseStateSetterFromHTMLInputElement,
} from "../../Resources/GlobalFunction";

const CreateExerciseCalorie = () => {
  const [userId, setUserId] = useState<number | null>();
  const [exerciseCalorie, setExerciseCalorie] = useState<number | null>();
  const [exerciseType, setExerciseType] = useState<string>("");
  const submitExerciseCalorie = () => {
    const payload = { calories: exerciseCalorie, exerciseType: exerciseType };
    axios.post(postExerciseCalorieUrl(userId), payload).then((res) => {
      console.log(res);
    });
  };
  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputUserId = event.target.value;
    const newValue = parseInt(inputUserId);
    setUserId(isNaN(newValue) ? null : newValue);
  };
  const handleExerciseCalorieChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputExerciseCalorie = event.target.value;
    const newValue = parseInt(inputExerciseCalorie);
    setExerciseCalorie(isNaN(newValue) ? null : newValue);
  };
  const handleExerciseTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputExerciseType = event.target.value;
    setExerciseType(inputExerciseType);
  };
  return (
    <div className="CreateExerciseInput-Container">
      <form>
        <label>User Id</label>
        <input
          type="number"
          value={userId == null ? "" : userId}
          onChange={(e) =>
            handleIntUseStateSetterFromHTMLInputElement(e, setUserId)
          }
          required
        />
        <label>Calories Burnt</label>
        <input
          type="number"
          value={exerciseCalorie == null ? "" : exerciseCalorie}
          onChange={(e) =>
            handleIntUseStateSetterFromHTMLInputElement(e, setExerciseCalorie)
          }
          step={0.01}
          required
        />
        <label>Exercise Type</label>
        <input
          type="number"
          value={exerciseType}
          onChange={(e) =>
            handleStringUseStateSetterFromHTMLInputElement(e, setExerciseType)
          }
          required
        />
        <button type="submit" onClick={submitExerciseCalorie}>
          Add Entry
        </button>
      </form>
      <p> {userId} </p>
      <p> {exerciseCalorie} </p>
      <p> {exerciseType} </p>
    </div>
  );
};

export default CreateExerciseCalorie;
