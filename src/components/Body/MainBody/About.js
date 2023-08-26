import React from "react";
// icons
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
// CSS
import "./About.css";
// Image
import profileImage from "./images/profile.png";

const About = () => {
  return (
    <div className="About-container section" id="about">
      <div className="about-sub-container">
        {/* profile image */}
        <div className="about__about-me-profile-picture-container">
          <img
            className="about__about-me-profile-picture"
            src={profileImage}
            alt="Profile"
          />
        </div>
        {/* AboutMe and ContactDetails */}
        <div className="about__about-me-and-contact-details">
          {/* About me section */}
          <div className="about_about-me-section-container">
            <section className="about_about-me-section">
              <div className="about__about-me-section-text-container">
                <h1 className="">About Me</h1>
                <p className="about__about-me-section-text">
                  Use this bio section as your way of describing yourself and
                  saying what you do, what technologies you like <br /> to use
                  or feel most comfortable with, describing your personality, or
                  whatever else you feel like throwing in
                </p>
              </div>
            </section>
          </div>

          {/* Contact Details section */}
          <div className="about__contact-details-section-container">
            {/* Contact Details */}
            <div className="about__contact-details-container">
              <div className="about__contact-details-details">
                <h1>Contact Details</h1>
                <div className="about__contact-details-link">
                  <button className="mb2 mt2 button-link">
                    <GitHubIcon className="pr2" /> GitHub
                  </button>
                  <button className="mb2 mt2 button-link">
                    <GoogleIcon className="pr2" /> Gmail
                  </button>
                  <button className="mb2 mt2 button-link">
                    <LinkedInIcon className="pr2" /> LinkedIn
                  </button>
                </div>
              </div>
              {/* Resume */}
              <div className="about__contact-details-resume">
                <button className="button-link">
                  <CloudDownloadIcon className="pr2" /> Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
