import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../Context/ContextProvider";
// CSS
import "./Navbar.css";
// animations
import ParticlesBg from "particles-bg";
// icons
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import LightModeIcon from "@mui/icons-material/LightMode";
import { tuple } from "yup";

const Navbar = () => {
  const {
    handleScroll,
    activeSection,
    isLoggedIn,
    onClickLogOutButton,
    isNavOpen,
    setIsNavOpen,
    isDarkMode,
    setIsDarkMode,
    isFlipped,
    setIsFlipped,
  } = useContext(MyContext);
  // open close Navigation Bar via icon
  const toggleIsNavOpenOnClick = () => {
    setIsNavOpen((isNavOpen) => !isNavOpen);
  };
  // changes from dark to light theme
  const toggleDarkMode = () => {
    const webPageThemeMode = !isDarkMode;
    setIsDarkMode(webPageThemeMode);
    localStorage.setItem("mode", webPageThemeMode ? "dark" : "light");
  };
  // flip dark mode from light and vice versa
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div>
      <div className={`navigation ${isNavOpen ? "open" : ""}`}>
        <button className="navigation__toggle" onClick={toggleIsNavOpenOnClick}>
          {isNavOpen ? <MenuIcon /> : <MenuOpenIcon />}
        </button>
        {/* LEFT SIDE */}
        <div
          className={`navigation__list-container-left-side ${
            isNavOpen ? "op" : ""
          }`}
        >
          <ul className="navigation__list-left-side-link">
            {/* Home Link */}
            <li className="navigation__item">
              <a
                className={`navigation__link ${
                  activeSection === "home" ? "active" : ""
                }`}
                href="/"
                onClick={() => {
                  handleScroll("home");
                  setIsNavOpen(false);
                }}
                rel="noreferrer"
              >
                <HomeIcon /> Home
              </a>
            </li>
            {/* About Link */}
            <li className="navigation__item">
              <a
                className={`navigation__link ${
                  activeSection === "about" ? "active" : ""
                }`}
                href="#about"
                onClick={() => {
                  handleScroll("about");
                  setIsNavOpen(false);
                }}
                rel="noreferrer"
              >
                <InfoIcon /> About
              </a>
            </li>
            {/* Works Link */}
            <li className="navigation__item">
              <a
                className={`navigation__link ${
                  activeSection === "works" ? "active" : ""
                }`}
                href="#works"
                onClick={() => {
                  handleScroll("works");
                  setIsNavOpen(false);
                }}
                rel="noreferrer"
              >
                <WorkOutlineIcon /> Works
              </a>
            </li>
            {/* Contact Link */}
            <li className="navigation__item">
              <a
                className={`navigation__link ${
                  activeSection === "contact" ? "active" : ""
                }`}
                href="#contact"
                onClick={() => {
                  handleScroll("contact");
                  setIsNavOpen(false);
                }}
                rel="noreferrer"
              >
                <ContactMailIcon /> Contact
              </a>
            </li>
          </ul>
        </div>
        {/* RIGHT SIDE */}
        <div
          className={`navigation__list-container-right-side ${
            isNavOpen ? "op" : ""
          }`}
        >
          <ul className="navigation__list-right-side-link">
            {!isLoggedIn.statusLoggedIn ? (
              <>
                {/* Register Link */}
                <li className="navigation__item">
                  <Link
                    to="/register"
                    className="pr2 navigation__link"
                    onClick={() => setIsNavOpen(false)}
                  >
                    <HowToRegIcon /> Register
                  </Link>
                </li>
                {/* LogIn Link */}
                <li className="navigation__item">
                  <Link
                    to="/login"
                    className="navigation__link"
                    onClick={() => setIsNavOpen(false)}
                  >
                    <LockOpenIcon /> LogIn
                  </Link>
                </li>
                {/* Dark/Light Mode */}
                <li
                  className={`navigation__theme-changer-container ${
                    isFlipped ? "flipped" : "not-flipped"
                  }`}
                  onClick={handleFlip}
                >
                  <button
                    onClick={toggleDarkMode}
                    className="navigation__theme-changer"
                  >
                    {isDarkMode ? (
                      <div className="card-front">
                        <NightlightRoundIcon className="white" />
                      </div>
                    ) : (
                      <div className="card-back">
                        <LightModeIcon className="white" />
                      </div>
                    )}
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Profile Link */}
                <li className="navigation__item">
                  <Link
                    className="mr2 navigation__link"
                    to={`/profile/byId/${isLoggedIn.id}`}
                    onClick={() => setIsNavOpen(false)}
                  >
                    <AccountBoxIcon /> {isLoggedIn.username}
                  </Link>
                </li>

                {/* Add Project Link */}
                {isLoggedIn.isAdmin && (
                  <li className="navigation__item">
                    <Link
                      className="mr2 navigation__link"
                      to={`/addProject`}
                      onClick={() => setIsNavOpen(false)}
                    >
                      <AddIcon /> Add Project
                    </Link>
                  </li>
                )}
                {/* LogOut Link */}
                <li className="navigation__item">
                  <button
                    to="/logout"
                    className="navigation__logout-button navigation__link"
                    onClick={onClickLogOutButton}
                  >
                    <LogoutIcon /> Log Out
                  </button>
                </li>
                {/* Dark/Light Mode */}
                <li
                  className={`navigation__theme-changer-container ${
                    isFlipped ? "flipped" : "not-flipped"
                  }`}
                  onClick={handleFlip}
                >
                  <button
                    onClick={toggleDarkMode}
                    className="navigation__theme-changer"
                  >
                    {isDarkMode ? (
                      <div className="card-front">
                        <NightlightRoundIcon className="white" />
                      </div>
                    ) : (
                      <div className="card-back">
                        <LightModeIcon className="white" />
                      </div>
                    )}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
        <ParticlesBg bg={true} type="custom" color="#00F" num={1} />
      </div>
    </div>
  );
};

export default Navbar;
