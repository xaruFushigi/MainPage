import React, { useContext } from "react";
import "./MainBody.css";
// icons
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

import { MyContext } from "../../../Context/ContextProvider";

const Main = () => {
  const { GitHubLink } = useContext(MyContext);

  return (
    <div id="home" className="section">
      <div className="flex flex-column">
        <div className="MainBody--container">
          <h1 className="MainBody__body--title">
            Welcome to the Main Page of Collection of the Projects
          </h1>
          <h3 className="MainBody__body--text">
            I am a web development engineer and I use react.js to develope
            front-end. <br />
            As back-end I use Node.js with Express.js and PostgreSQL as database
          </h3>

          <div>
            <button className="button-link" onClick={GitHubLink}>
              <GitHubIcon className="pr2" /> GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
