import { useState } from "react";
import "./CreateBodyWeight.css";
import { postUserBodyWeightUrl } from "../../Resources/Url";
import axios from "axios";
import {
  handleFloatUseStateSetterFromHTMLInputElement,
  handleIntUseStateSetterFromHTMLInputElement,
} from "../../Resources/GlobalFunction";
const CreateBodyWeight = () => {
  const [userId, setUserId] = useState<number | null>();
  const [bodyWeight, setBodyWeight] = useState<number | null>();
  const submitBodyWeightEntry = () => {
    const payload = { bodyWeight: bodyWeight };
    axios.post(postUserBodyWeightUrl(userId), payload).then((res) => {
      console.log(res);
    });
  };
  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputUserId = event.target.value;
    const newValue = parseInt(inputUserId);
    setUserId(isNaN(newValue) ? null : newValue);
  };
  const handleBodyWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputBodyWeight = event.target.value;
    const newValue = parseFloat(inputBodyWeight);
    setBodyWeight(isNaN(newValue) ? null : newValue);
  };
  return (
    <div className="CreateBodyWeight-Container">
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
        <label>BodyWeight Input</label>
        <input
          type="number"
          value={bodyWeight == null ? "" : bodyWeight}
          onChange={(e) =>
            handleFloatUseStateSetterFromHTMLInputElement(e, setBodyWeight)
          }
          step={0.01}
          required
        />
        <button type="submit" onClick={submitBodyWeightEntry}>
          Add Entry
        </button>
      </form>
      <p> {userId} </p>
      <p> {bodyWeight} </p>
    </div>
  );
};

export default CreateBodyWeight;
