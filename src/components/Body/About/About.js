import React, { useRef, useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
// download functionality
import FileDownload from "js-file-download";
// icons
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
// CSS
import "./About.css";
// Image
import profileImage from "./../../../assets/profile.png";
// Parallax
import { motion, useScroll, useTransform } from "framer-motion";
// context
import { MyContext } from "../../../Context/ContextProvider";
const About = () => {
  const location = useLocation();
  const { GitHubLink, LinkedInLink } = useContext(MyContext);
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
  //donwload CV
  const DownloadResumeByType = async (event) => {
    try {
      const response = await fetch(
        `http://localhost:10000/auth/downloadResume?resumeType=${event}`,
        {
          method: "GET",
          headers: { "Content-Type": "Content-Disposition" },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        console.log(blob);
        const url = window.URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger the download
        const a = document.createElement("a");
        a.href = url;
        if (event == "cv_english") {
          a.download = "cv_english_Bokhodir_Ziedullaev.docx"; // Set the desired filename
        } else if (event == "cv_japanese") {
          a.download = "cv_japanese_Bokhodir_Ziedullaev.docx"; // Set the desired filename
        } else if (event == "resume_japanese") {
          a.download = "japanese_resume_Bokhodir_Ziedullaev.xlsx"; // Set the desired filename
        } else {
          throw new Error("something went wrong");
        }
        a.style.display = "none";

        document.body.appendChild(a);
        a.click();

        // Clean up by revoking the blob URL and removing the anchor element
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Scroll to the "About" section when the component mounts
    if (location.hash === "#about") {
      worksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="About-container section" id="about" ref={worksRef}>
      {/* <StarsCanvas /> */}
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
                  My name is Bokhodir. Graduated from Tsukuba University, Japan
                  in 2021 August 31st. Working in PKUTECH Co. ltd. since 2022
                  April 1st as System Engineer. Have expirience as Project
                  Manger Assistant and REST API developer in current company.
                  Have been improving my Web Developer skills for more than one
                  and half year
                </p>
              </div>
            </section>
          </div>
          {/* Contact Details section */}
          <div className="about__contact-details-section-container">
            {/* Contact Details */}
            <div className="about__contact-details-container">
              <div className="about__contact-details-details">
                <div className="about__contact-details-link">
                  {/* GitHub button */}
                  <div className="ma1">
                    <button
                      className="mb2 mt2 button-link"
                      onClick={GitHubLink}
                    >
                      <GitHubIcon className="pr2" /> GitHub
                    </button>
                  </div>
                  {/* LinkedIn button */}
                  <div className="ma1">
                    <button
                      className="mb2 mt2 button-link"
                      onClick={LinkedInLink}
                    >
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
            </div>
            {/* work exprience section */}
            <div className="about__contact-details-section-work-expirience-container">
              {/* SAP project expirience */}
              <div className="about__contact-details-section-work-expirience">
                <p>2022-May ~ 2022 November</p>
                <p>Client: Fujitsu Co.</p>
                <p>
                  Position: Assistant of Project Manager at Project Progress
                  Team
                </p>
                <div className="work">
                  <p>Work:</p>
                  <p>
                    Demonstrated expertise in handling projects, driving process
                    improvements, and ensuring compliance.
                  </p>
                  <p></p>
                  <p>
                    Collected progress related data of the team members in their
                    accomplishing tasks. Prepared necessary task related
                    documents of the team members in
                    <span className="highlight-text">
                      Yakushin, ServiceNow, and Alfresco
                    </span>
                    . Participated in Meetings to take notes (議事録) and
                    organized meetings
                  </p>
                </div>
              </div>

              {/* PEGA project expirience */}
              <div className="about__contact-details-section-work-expirience">
                <p>2022-November ~ Present</p>
                <p> Client: Mitsubushi UFJ</p>
                <p>Position: REST API Developer</p>
                <div className="work">
                  <p>Work:</p>
                  <p>
                    Demonstrated expertise in handling projects, driving process
                    improvements, and ensuring compliance.
                  </p>
                  <p></p>
                  <p>
                    Work: Build JBoss JAX-RS RESTEasy API for the purpose of
                    building communicating between servers to transfer client
                    data. Complied with{" "}
                    <span className="highlight-text">
                      Service Level Agreement (SLA){" "}
                    </span>{" "}
                    with security concerns of the client. For PoC purpose at
                    presentation for the client build front-end using{" "}
                    <span className="highlight-text">React.js and CSS </span>{" "}
                    and back-end managed with{" "}
                    <span className="highlight-text">
                      Node.js and Express.js
                    </span>
                    .
                  </p>
                </div>
              </div>

              {/* Language abilities */}
              <div className="about__contact-details-section-work-expirience">
                <p>
                  Language abilities in{" "}
                  <span className="highlight-text">English</span> (Fluent),
                  <span className="highlight-text"> Japanese</span>
                  (Business), and <span className="highlight-text">Uzbek</span>
                  (Native)
                </p>
              </div>
              {/* Resume Pop-Up */}
              <div className={`about__contact-details-resum `}>
                {isPopUpWindowForDownloadResumeOpen && (
                  <div className={`about__popup-window-download-cv`}>
                    <div className={`popup`}>
                      {/* close pop-up window button */}
                      <div className="about__popup-window-close-button-container">
                        <button
                          className="close-button"
                          onClick={togglePopUpWindowForDownloadResume}
                        >
                          X
                        </button>
                      </div>
                      {/* Resume formats for Download */}
                      <div className="popup-content">
                        <h2 className="black">Download Options</h2>
                        <ul className="popup__download-list">
                          <li className="popup__download-list-item">
                            <button
                              className="popup__download-button"
                              onClick={() => DownloadResumeByType("cv_english")}
                            >
                              <CloudDownloadIcon /> CV English
                            </button>
                          </li>
                          <li className="popup__download-list-item">
                            <button
                              className="popup__download-button"
                              onClick={() =>
                                DownloadResumeByType("cv_japanese")
                              }
                            >
                              <CloudDownloadIcon /> CV Japanese
                            </button>
                          </li>
                          <li className="popup__download-list-item">
                            <button
                              className="popup__download-button"
                              onClick={() =>
                                DownloadResumeByType("resume_japanese")
                              }
                            >
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
