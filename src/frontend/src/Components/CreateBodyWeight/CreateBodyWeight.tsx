import { useState } from "react";
import "./CreateBodyWeight.css";
import { postUserBodyWeightUrl } from "../../Resources/Url";
import axios from "axios";
const CreateBodyWeight = () => {
  const [userId, setUserId] = useState<number|null>()
  const [bodyWeight, setBodyWeight] = useState<number|null>();
  const submitBodyWeightEntry = () => {
    const payload = { bodyWeight: bodyWeight };
    console.log(userId)
    console.log(bodyWeight)
    // axios.post(postUserBodyWeightUrl(userIdtValue),payload);
    
  };

  return (
    <div className="CreateBodyWeight-Container">
      <form>
        <label>User Id</label>
        <input type="number" value={userId == null ? "" : userId} onChange={(e) => setUserId(parseInt(e.target.value))} required />
        <label>BodyWeight Input</label>
        <input type="number" value={bodyWeight == null ? "" : bodyWeight} onChange={(e) => setBodyWeight(parseFloat(e.target.value))} step={0.01} required />
        <button type="button" onClick={submitBodyWeightEntry}>Add Entry</button>
      </form>
    </div>
  );
};

export default CreateBodyWeight;
