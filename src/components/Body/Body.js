import React from "react";
import Contact from "./Contact/Contact";
import About from "./About/About";
import Home from "./Home/Home";
import Works from "./Works/Works";

const Body = () => {
  return (
    <div>
      <Home />
      <About />
      <Works />
      <Contact />
    </div>
  );
};

export default Body;
