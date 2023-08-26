import React, { useState, useEffect } from "react";
// CSS
import "./Works.css";

const Works = () => {
  const [projects, setProjects] = useState([]);
  const FetchProjectsFromDatabase = async () => {
    try {
      const response = await fetch(
        "http://localhost:10000/project/allProjects",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projectsFromDatabase);
      } else {
        throw new Error("failed to fetch projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchProjectsFromDatabase();
  }, []);

  const MapProjects = () => {
    return projects.map((value, index) => {
      const OpenProject = () => {
        window.open(`${value.urlOfProject}`);
      };
      return (
        <div className="project outline ma2 br2 growOnHover " key={index}>
          <div className="pointer" onClick={OpenProject}>
            <div className="b">{value.nameOfProject}</div>
            <div>
              <img
                src={`data:image/jpeg;base64,${value.imageOfProject}`}
                alt="image_of_project"
                width={250}
                height={100}
              />
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div id="works" className="works-container section">
      <div className="works">
        <h2>CHECK OUT SOME OF MY WORKS</h2>
      </div>
      <div className="works__container-projects outline">{MapProjects()}</div>
    </div>
  );
};

export default Works;
