import React, { useState } from "react";
import AddProject from "../AddProject/AddProject";
import UploadFile from "../UploadFile/UploadFile";
// CSS
import "./TabbedInterface.css";

const TabbedInterface = () => {
  const [activeTab, setActiveTab] = useState("addProject"); // Initial active tab
  // interchange between tab button function
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="tabbedInterface__container">
      <div className="tab-content">
        <div className="tab-buttons">
          <button
            className={
              activeTab === "addProject"
                ? "active-tab tabbedInterface__buttons"
                : "tabbedInterface__buttons"
            }
            onClick={() => handleTabClick("addProject")}
          >
            Add Project
          </button>
          <button
            className={
              activeTab === "uploadFile"
                ? "active-tab tabbedInterface__buttons"
                : "tabbedInterface__buttons"
            }
            onClick={() => handleTabClick("uploadFile")}
          >
            Upload PDF
          </button>
        </div>

        {activeTab === "addProject" && <AddProject />}
        {activeTab === "uploadFile" && <UploadFile />}
      </div>
    </div>
  );
};

export default TabbedInterface;
