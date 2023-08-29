import React, { useEffect, useState } from "react";
import "./CreateIntakeCalorie.css";
import { postUserIntakeCalorieUrl } from "../../Resources/Url";
import axios from "axios";
import {
  handleFloatUseStateSetterFromHTMLInputElement,
  handleIntUseStateSetterFromHTMLInputElement,
  handleStringUseStateSetterFromHTMLInputElement,
} from "../../Resources/GlobalFunction";

const CreateIntakeCalorie = () => {
  const [userId, setUserId] = useState<number | null>();
  const [intakeCalorie, setIntakeCalorie] = useState<number | null>();
  const [intakeProtein, setIntakeProtein] = useState<number | null>();
  const [intakeCarbohydrate, setIntakeCarbohydrate] = useState<number | null>();
  const [intakeFat, setIntakeFat] = useState<number | null>();
  const [intakeType, setIntakeType] = useState<string>("");
  const submitIntakeCalorie = () => {
    const payload = {
      calories: intakeCalorie,
      meal: intakeType,
      proteins: intakeProtein,
      carbohydrates: intakeCarbohydrate,
      fats: intakeCarbohydrate,
    };
    axios.post(postUserIntakeCalorieUrl(userId), payload).then((res) => {
      console.log(res);
    });
  };
  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputUserId = event.target.value;
    const newValue = parseInt(inputUserId);
    setUserId(isNaN(newValue) ? null : newValue);
  };
  const handleIntakeCalorieChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputIntakeCalorie = event.target.value;
    const newValue = parseInt(inputIntakeCalorie);
    setIntakeCalorie(isNaN(newValue) ? null : newValue);
  };
  const handleIntakeTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputIntakeType = event.target.value;
    setIntakeType(inputIntakeType);
  };

  return (
    <div className="CreateIntakeInput-Container">
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
        <label>Calories</label>
        <input
          type="number"
          value={intakeCalorie == null ? "" : intakeCalorie}
          onChange={(e) =>
            handleIntUseStateSetterFromHTMLInputElement(e, setIntakeCalorie)
          }
          required
        />
        <label>Proteins</label>
        <input
          type="number"
          value={intakeProtein == null ? "" : intakeProtein}
          onChange={(e) =>
            handleFloatUseStateSetterFromHTMLInputElement(e, setIntakeProtein)
          }
          step={0.1}
          required
        />
        <label>Carbohydrates</label>
        <input
          type="number"
          value={intakeCarbohydrate == null ? "" : intakeCarbohydrate}
          onChange={(e) =>
            handleFloatUseStateSetterFromHTMLInputElement(
              e,
              setIntakeCarbohydrate
            )
          }
          step={0.1}
          required
        />
        <label>Fats</label>
        <input
          type="number"
          value={intakeFat == null ? "" : intakeFat}
          onChange={(e) =>
            handleFloatUseStateSetterFromHTMLInputElement(e, setIntakeFat)
          }
          step={0.1}
          required
        />
        <label>Meal</label>
        <input
          type="text"
          value={intakeType}
          onChange={(e) =>
            handleStringUseStateSetterFromHTMLInputElement(e, setIntakeType)
          }
          required
        />
        <button type="submit" onClick={submitIntakeCalorie}>
          Add Entry
        </button>
      </form>
      <p> {userId} </p>
      <p> {intakeCalorie} </p>
      <p> {intakeType} </p>
      <p> {intakeProtein} </p>
      <p> {intakeCarbohydrate} </p>
      <p> {intakeFat} </p>
    </div>
  );
};

export default CreateIntakeCalorie;
