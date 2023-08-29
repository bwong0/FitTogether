import CreateBodyWeight from "../../Components/CreateBodyWeight/CreateBodyWeight";
import ViewBodyWeight from "../../Components/ViewBodyWeight/ViewBodyWeight";
import getMonthDay, { getTodayDate } from "../../Resources/Types/DateYear";
import "./BodyWeightPage.css";

const BodyWeightPage = () => {
  return (
    <div className="BodyWeightPage-Container">
      <div className="Create-BodyWeight-Container">
        <CreateBodyWeight />
      </div>
      <div className="View-BodyWeight-Container">
        <ViewBodyWeight
          userId={3}
          date={getTodayDate()}
          monthDate={getMonthDay()}
        />
      </div>
    </div>
  );
};

export default BodyWeightPage;
