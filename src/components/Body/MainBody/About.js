import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// icons
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
// CSS
import "./About.css";
// Image
import profileImage from "./images/profile.png";

const About = () => {
  const location = useLocation();
  const worksRef = useRef(null); // Create a ref for the "about" section
  const [
    isPopUpWindowForDownloadResumeOpen,
    setIsPopUpWindowForDownloadResumeOpen,
  ] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // toggle button to Open Pop Up window for CV download
  const togglePopUpWindowForDownloadResume = () => {
    setIsPopUpWindowForDownloadResumeOpen((prevCondition) => !prevCondition);
  };
  const closePopUp = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    // Scroll to the "About" section when the component mounts
    if (location.hash === "#about") {
      worksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div className="About-container section" id="about" ref={worksRef}>
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
                  {/* GitHub button */}
                  <div className="ma1">
                    <button className="mb2 mt2 button-link">
                      <GitHubIcon className="pr2" /> GitHub
                    </button>
                  </div>
                  {/* LinkedIn button */}
                  <div className="ma1">
                    <button className="mb2 mt2 button-link">
                      <LinkedInIcon className="pr2" /> LinkedIn
                    </button>
                  </div>
                  {/* Resume button */}
                  <div className="ma1">
                    <button
                      className="button-link"
                      onClick={togglePopUpWindowForDownloadResume}
                    >
                      <CloudDownloadIcon className="pr2" /> Resume
                    </button>
                  </div>
                </div>
              </div>
              {/* Resume Pop-Up */}
              <div className={`about__contact-details-resum `}>
                {isPopUpWindowForDownloadResumeOpen && (
                  <div className={`about__popup-window-download-cv`}>
                    {/* close pop-up window button */}
                    <button
                      className="close-button"
                      onClick={togglePopUpWindowForDownloadResume}
                    >
                      X
                    </button>
                    <div className={`popup`}>
                      <div className="popup-content">
                        <h2 className="black">Download Options</h2>
                        <ul className="popup__download-list">
                          <li className="popup__download-list-item">
                            <button className="popup__download-button">
                              <CloudDownloadIcon /> CV English
                            </button>
                          </li>
                          <li className="popup__download-list-item">
                            <button className="popup__download-button">
                              <CloudDownloadIcon /> CV Japanese
                            </button>
                          </li>
                          <li className="popup__download-list-item">
                            <button className="popup__download-button">
                              <CloudDownloadIcon /> Resume Japanese
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
