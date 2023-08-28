import React, { useEffect, useState } from "react";
import axios from "axios";

import "./HomePage.css";
import BodyWeightList from "../BodyWeight/BodyWeight";
import BodyWeights from "../../Resources/Types/BodyWeight";
import { getUserBodyWeightUrl } from "../../Resources/Url.js";
import getMonthDay, {
  convert24to12,
  getTodayDate,
  splitTimeStamp,
} from "../../Resources/Types/DateYear";

const HomePage = () => {
  const [bodyWeights, setBodyWeights] = useState<BodyWeights[]>([]);
  const [dayAvgBodyWeight, setDayAvgBodyWeight] = useState<number>(0);
  const [isPending, setIsPending] = useState(true);
  const [errorState, setErrorState] = useState(null);

  const todayDate = getMonthDay();

  const handleDelete = (id: number) => {
    const newBodyWeight = bodyWeights.filter(
      (bodyWeight) => bodyWeight.id !== id
    );
    setBodyWeights(newBodyWeight);
  };

  useEffect(() => {
    console.log("Use this for fetching list");
    const abortCont = new AbortController();

    fetch(getUserBodyWeightUrl(3, getTodayDate(), ""), {
      signal: abortCont.signal,
    })
      .then((res) => {
        if (res.ok != true) {
          throw Error("Fetching Error");
        }
        return res.json();
      })
      .then((data) => {
        const preBodyWeights: BodyWeights[] = data;
        let dayTotal = 0;
        preBodyWeights.forEach((bw) => {
          bw.timestampParts = splitTimeStamp(bw.timestamp);
          bw.twelveHour = convert24to12(bw.timestampParts[1]);
          dayTotal += bw.bodyWeight;
        });
        if (dayTotal !== 0) {
          const roundedAvg = (dayTotal / preBodyWeights.length).toFixed(2);
          setDayAvgBodyWeight(parseFloat(roundedAvg));
        } else {
          setDayAvgBodyWeight(-1);
        }
        setBodyWeights(preBodyWeights);
        setIsPending(false);
        setErrorState(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setErrorState(err.message);
        }
      });
    return () => abortCont.abort();
  }, []);
  return (
    <div className="HomePage">
      {errorState && <div>{errorState}</div>}
      {isPending && <div>Is Loading...</div>}
      {bodyWeights && (
        <BodyWeightList
          bodyWeightProp={bodyWeights}
          handleDeleteProp={handleDelete}
          titleProp={todayDate + " - " + dayAvgBodyWeight + "lbs"}
        />
      )}
    </div>
  );
};

export default HomePage;
