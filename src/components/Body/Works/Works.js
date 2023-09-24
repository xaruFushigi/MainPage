import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
// ScrollBar
import Scroll from "./Scroll";
// CSS
import "./Works.css";
// animation
import { motion, useScroll, useTransform } from "framer-motion";

const Works = () => {
  const location = useLocation();
  const worksRef = useRef(null); // Create a ref for the "Works" section
  const [projects, setProjects] = useState([]);
  const FetchProjectsFromDatabase = async () => {
    try {
      const response = await fetch(
        "https://mainpage-back-end.onrender.com/project/allProjects",
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
  // Stars scrolling configuration
  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  // mapping projects from database
  const MapProjects = () => {
    return projects.map((value, index) => {
      const OpenProject = () => {
        window.open(`${value.urlOfProject}`);
      };
      return (
        <div className="__card-container" key={index}>
          <Link onClick={OpenProject} style={{ textDecoration: "none" }}>
            <div className="card growOnHover">
              <img
                src={`data:image/jpeg;base64,${value.imageOfProject}`}
                alt="s"
                width="280px"
                height="180px"
                className="__card-image"
              />
              <p className="__card-text-title">{value.nameOfProject}</p>
            </div>
          </Link>
        </div>
      );
    });
  };
  return (
    <div
      style={{ y }}
      id="works"
      className="works-container section"
      ref={worksRef}
    >
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
