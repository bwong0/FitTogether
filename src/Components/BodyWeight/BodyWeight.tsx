import BodyWeights from "../../Resources/Types/BodyWeight";
import "./BodyWeight.css";

const BodyWeightList = (props: {
  bodyWeightProp: BodyWeights[];
  handleDeleteProp: (id: number) => void;
  titleProp: string;
}) => {
  const bodyWeights = props.bodyWeightProp;
  return (
    <div className="bodyweight-list">
      <h2>{props.titleProp}</h2>
      {bodyWeights.map((bodyWeight) => (
        <div className="bodyweight-container" key={bodyWeight.id}>
          <div className="display-bodyweight-containter">
            <h2> {bodyWeight.twelveHour} </h2>
            <p> {bodyWeight.bodyWeight} lbs </p>
          </div>
          <button onClick={() => props.handleDeleteProp(bodyWeight.id)}>
            Delete Measurement
          </button>
        </div>
      ))}
    </div>
  );
};

export default BodyWeightList;
