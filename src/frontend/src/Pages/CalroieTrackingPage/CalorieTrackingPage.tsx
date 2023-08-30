import ViewCalorie from "../../Components/ViewCalorie/ViewCalorie";
import getMonthDay, { getTodayDate } from "../../Resources/Types/DateYear";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useEffect, useState } from "react";
import "./CalorieTrackingPage.css";
import CreateIntakeCalorie from "../../Components/CreateIntakeCalorie/CreateIntakeCalorie";
import CreateExerciseCalorie from "../../Components/CreateExerciseCalorie/CreateExerciseCalorie";

const CalorieTrackingPage = () => {
  const [alignment, setAlignment] = useState("Intake");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  return (
    <div className="CalorieTrackingPage-Container">
      <div className="Create-Calorie-Container">
        <div className="toggle-container">
          <ToggleButtonGroup
            fullWidth
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton
              value="Intake"
              style={{
                fontFamily: "Quicksand",
                backgroundColor: alignment === "Intake" ? "red" : "gray",
                color: "white",
              }}
            >
              Intake
            </ToggleButton>
            <ToggleButton
              value="Exercise"
              style={{
                fontFamily: "Quicksand",
                backgroundColor: alignment === "Exercise" ? "green" : "gray",
                color: "white",
              }}
            >
              Exercise
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="create-contianer">
          {alignment === "Intake" && <CreateIntakeCalorie />}
          {alignment === "Exercise" && <CreateExerciseCalorie />}
        </div>
      </div>
      <div className="View-Calorie-Container">
        <ViewCalorie
          userId={3}
          date={getTodayDate()}
          monthDate={getMonthDay()}
        />
      </div>
    </div>
  );
};

export default CalorieTrackingPage;
