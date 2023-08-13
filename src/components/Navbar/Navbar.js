import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MyContext } from "../../Context/ContextProvider";
// CSS
import "./Navbar.css";
// animations
import ParticlesBg from "particles-bg";
// icons
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  let navigate = useNavigate();
  const { handleScroll, activeSection } = useContext(MyContext);
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
                href="#home"
                onClick={() => handleScroll("home")}
              >
                Home
              </a>
            </li>

            <li className={`navigation__item `}>
              <a
                className={`navigation__link ${
                  activeSection === "about" ? "active" : ""
                }`}
                href="#about"
                onClick={() => handleScroll("about")}
              >
                About
              </a>
            </li>

            <li className={`navigation__item`}>
              <a
                className={`navigation__link ${
                  activeSection === "works" ? "active" : ""
                }`}
                href="#works"
                onClick={() => handleScroll("works")}
              >
                Works
              </a>
            </li>

            <li className={`navigation__item`}>
              <a
                className={`navigation__link ${
                  activeSection === "contact" ? "active" : ""
                }`}
                href="#contact"
                onClick={() => handleScroll("contact")}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="navigation__list-container-left-side">
          <ul className="navigation__list-container-left-side-link">
            <li className="white pl2 pr2">
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
            </li>
          </ul>
        </div>
        <ParticlesBg bg={true} type="custom" color="#00F" num={1} />
      </div>
    </div>
  );
};

export default Navbar;
