import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
  render(): React.ReactNode {
    return (
      <nav className="navbar">
        <h1>FitTogether</h1>
        <div className="links">
          <Link to="/">Progress</Link>
          <Link to="/bodyweight">BodyWeight</Link>
          <Link to="/calorietracking">Calories</Link>
          <Link to="/friends">Friends</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
