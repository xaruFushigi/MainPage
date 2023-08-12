import React from "react";
import "./MainBody.css";

const Main = () => {
  return (
    <div className="outline">
      <div className="flex flex-column">
        <div className="bg-red">First</div>
        <div className="bg-yellow">Second</div>
        <div className="bg-gray">Third</div>
      </div>
    </div>
  );
};

export default Main;
