import React from "react";
import { Link } from "react-router-dom";
// CSS
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>Page Not Found :/</h1>
      <h3>Try these link:</h3>
      <div className="flex flex-column">
        <Link to="/">Home </Link>
        <Link to="/">Home </Link>
        <Link to="/login"> LogIn</Link>
        <Link to="/register"> Register New User </Link>
      </div>
    </div>
  );
};

export default NotFound;
