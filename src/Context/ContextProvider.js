import React, { useState, useEffect, createContext } from "react";
// icons
import Fade from "@mui/material/Fade";
import useScrollTrigger from "@mui/material/useScrollTrigger";
// Context
export const MyContext = createContext();

const ContextProvider = (props) => {
  const [handleScrollCondition, setHandleScrollCondition] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // Store the active section
  // smooth scroll to About section
  const handleScroll = (section) => {
    setActiveSection(section); // Set the active section
    const targetSection = document.getElementById(section);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  // handle navbar section detection
  const handleSectionDetection = () => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  };
  // fading function
  const FadingIcon = ({ children }) => {
    const trigger = useScrollTrigger();

    return <Fade in={trigger}>{children}</Fade>;
  };

  //
  const GitHubLink = () => {
    window.open("https://github.com/xaruFushigi");
  };

  useEffect(() => {
    handleScroll();
    handleSectionDetection();
  }, []);

  const contextValues = {
    handleScroll,
    FadingIcon,
    handleScrollCondition,
    GitHubLink,
    activeSection,
  };
  return (
    <div>
      <MyContext.Provider value={contextValues}>
        {props.children}
      </MyContext.Provider>
    </div>
  );
};

export default ContextProvider;
