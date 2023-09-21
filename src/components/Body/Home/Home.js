import React from "react";
// CSS
import "./Home.css";
// stars 3D animation
import StarsCanvas from "../../../Stars";
// framer-motion
import { motion, useScroll, useTransform } from "framer-motion";
// icons
import reactjs from "../../../assets/reactjs.png";
import nodejs from "../../../assets/nodejs.png";
import javascript from "../../../assets/javascript.png";
import html from "../../../assets/html.png";
import css from "../../../assets/css.png";
import figma from "../../../assets/figma.png";
import git from "../../../assets/git.png";
import postgre from "../../../assets/postgre.png";

const Main = () => {
  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  return (
    <div id="home" className="section">
      {/* <StarsCanvas /> */}
      <div className="MainBody-container">
        <div className="MainBody-box">
          <h1 className="MainBody__body-title">
            Welcome to the Main Page of the Collection of the Projects
          </h1>
          <h3 className="MainBody__body-text">
            I am a web developer and I use React.js for front-end and
            for back-end I use Node.js with Express.js and PostgreSQL as database
          </h3>
          <div>
            <img src={reactjs} width={50} height={50} />
            <img src={nodejs} width={50} height={50} />
            <img src={javascript} width={50} height={50} />
            <img src={css} width={50} height={50} />
            <img src={html} width={50} height={50} />
            <img src={figma} width={50} height={50} />
            <img src={git} width={50} height={50} />
            <img src={postgre} width={50} height={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
