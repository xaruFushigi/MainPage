import React from "react";
import "./MainBody.css";
import StarsCanvas from "../../../Stars";
import { motion, useScroll, useTransform } from "framer-motion";

const Main = () => {
  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  return (
    <motion.div style={{ y }} id="home" className="section">
      <StarsCanvas />
      <div className="MainBody-container">
        <div className="MainBody-box">
          <h1 className="MainBody__body-title">
            Welcome to the Main Page of Collection of the Projects
          </h1>
          <h3 className="MainBody__body-text">
            I am a web development engineer and I use react.js to develope
            front-end. <br />
            As back-end I use Node.js with Express.js and PostgreSQL as database
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default Main;
