import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
// ScrollBar
import Scroll from "./Scroll";
// CSS
import "./Works.css";

const Works = () => {
  const location = useLocation();
  const worksRef = useRef(null); // Create a ref for the "Works" section
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
    // Scroll to the "Works" section when the component mounts
    if (location.hash === "#works") {
      worksRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
    <div id="works" className="works-container section" ref={worksRef}>
      <div className="works">
        <h2>CHECK OUT SOME OF MY WORKS</h2>
      </div>
      <Scroll>
        <div className="works__container-projects">{MapProjects()}</div>
      </Scroll>
    </div>
  );
};

export default Works;
