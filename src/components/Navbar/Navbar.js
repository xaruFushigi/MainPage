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

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { handleScroll, activeSection, isLoggedIn, onClickLogOutButton } =
    useContext(MyContext);
  // open close Navigation Bar via icon
  const toggleIsNavOpenOnClick = () => {
    setIsNavOpen((isNavOpen) => !isNavOpen);
  };

  return (
    <div className="">
      <div className={`navigation ${isNavOpen ? "open" : ""}`}>
        <button className="navigation__toggle" onClick={toggleIsNavOpenOnClick}>
          {isNavOpen ? <MenuIcon /> : <MenuOpenIcon />}
        </button>

        <div className="navigation__list-container-right-side">
          <ul className="navigation__list">
            <li className={`navigation__item`}>
              <a
                className={`navigation__link ${
                  activeSection === "home" ? "active" : ""
                }`}
                href="/"
                onClick={() => handleScroll("home")}
                rel="noreferrer"
              >
                <HomeIcon /> Home
              </a>
            </li>

            <li className={`navigation__item `}>
              <a
                className={`navigation__link ${
                  activeSection === "about" ? "active" : ""
                }`}
                href="#about"
                onClick={() => handleScroll("about")}
                rel="noreferrer"
              >
                <InfoIcon /> About
              </a>
            </li>

            <li className={`navigation__item`}>
              <a
                className={`navigation__link ${
                  activeSection === "works" ? "active" : ""
                }`}
                href="#works"
                onClick={() => handleScroll("works")}
                rel="noreferrer"
              >
                <WorkOutlineIcon /> Works
              </a>
            </li>

            <li className={`navigation__item`}>
              <a
                className={`navigation__link ${
                  activeSection === "contact" ? "active" : ""
                }`}
                href="#contact"
                onClick={() => handleScroll("contact")}
                rel="noreferrer"
              >
                <ContactMailIcon /> Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="navigation__list-container-left-side">
          <ul className="navigation__list-container-left-side-link">
            <li className="white pl2 pr2">
              {!isLoggedIn.statusLoggedIn ? (
                <div className="flex flex-row items-center">
                  <Link
                    to="/register"
                    className="pr2 navigation__list-container-left-side-link-item"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="navigation__list-container-left-side-link-item"
                  >
                    LogIn
                  </Link>
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <Link
                    className="mr2 navigation__link"
                    to={`/profile/byId/${isLoggedIn.id}`}
                  >
                    <AccountBoxIcon /> {isLoggedIn.username}
                  </Link>

                  {isLoggedIn.isAdmin && (
                    <Link className="mr2 navigation__link" to={`/addProject`}>
                      <AddIcon /> Add Project
                    </Link>
                  )}

                  <button
                    to="/logout"
                    className="navigation__list-container-left-side-link-item navigate__listcontainer-left-side-link-item-logout navigation__link"
                    onClick={onClickLogOutButton}
                  >
                    <LogoutIcon /> Log Out
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
        <ParticlesBg bg={true} type="custom" color="#00F" num={1} />
      </div>
    </div>
  );
};

export default Navbar;
