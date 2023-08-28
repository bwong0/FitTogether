import { useState } from "react";
import "./CreateBodyWeight.css";
import { postUserBodyWeightUrl } from "../../Resources/Url";
const CreateBodyWeight = () => {
  const submitBodyWeightEntry = () => {
    const userIdInput = document.getElementById(
      "userIdInput"
    ) as HTMLInputElement;
    const bodyWeightInput = document.getElementById(
      "bodyWeightInput"
    ) as HTMLInputElement;
    if (userIdInput !== null && bodyWeightInput !== null) {
      const userIdtValue = bodyWeightInput.value;
      const bodyWeightValue = bodyWeightInput.value;
      const payload = { bodyWeight: bodyWeightValue };
      console.log(userIdtValue);
      console.log(payload);
    } else {
    }
  };

  return (
    <div className="CreateBodyWeight-Container">
      <form>
        <label>User Id</label>
        <input type="number" id="userIdInput" required />
        <label>BodyWeight Input</label>
        <input type="number" id="bodyWeightInput" step={0.01} required />
        <button onClick={CreateBodyWeight}>Add Entry</button>
      </form>
    </div>
  );
};

export default CreateBodyWeight;
