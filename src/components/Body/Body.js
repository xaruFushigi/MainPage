import React from "react";
import Contact from "./Contact/Contact";
import About from "./MainBody/About";
import Main from "./MainBody/MainBody";
import Works from "./Works/Works";

const Body = () => {
  return (
    <div>
      <Main />
      <About />
      <Works />
      <Contact />
    </div>
  );
};

export default Body;
