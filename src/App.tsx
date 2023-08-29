import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProgressPage from "./Pages/ProgressPage/ProgressPage";
import BodyWeightPage from "./Pages/BodyWeightPage/BodyWeightPage";
import CalorieTrackingPage from "./Pages/CalroieTrackingPage/CalorieTrackingPage";
import FriendsPage from "./Pages/FriendsPage/FriendsPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar></NavBar>
        <div className="content">
          <Routes>
            <Route path="/" element={<ProgressPage />} />
            <Route path="/bodyweight" element={<BodyWeightPage />} />
            <Route path="/calorietracking" element={<CalorieTrackingPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
