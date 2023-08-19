import React from "react";
// CSS
import "./Footer.css";
// Icons
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <div className="">
      <div className="footer outline" id="footer">
        <div className="footer__link">
          <a
            className="pr2 pl2"
            href="https://github.com/xaruFushigi"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon className="icon" fontSize="large" />
          </a>

          <a
            className="pr2 pl2"
            href="https://github.com/xaruFushigi"
            target="_blank"
            rel="noreferrer"
          >
            <GoogleIcon className="icon" fontSize="large" />
          </a>

          <a
            className="pr2 pl2"
            href="https://www.linkedin.com/in/bokhodir-ziedullaev-90b05b1b8/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon className="icon" fontSize="large" />
          </a>
        </div>

        <div className="footer__copyright">
          &copy;Copyright 2023 Bokhodir Ziedullaev・Design by Bokhodir
        </div>
      </div>
    </div>
  );
};

export default Footer;
