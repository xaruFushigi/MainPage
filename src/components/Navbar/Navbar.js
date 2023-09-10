import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../Context/ContextProvider";
// CSS
import "./Navbar.css";
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

const Navbar = () => {
  const {
    handleScroll,
    activeSection,
    isLoggedIn,
    onClickLogOutButton,
    isNavOpen,
    setIsNavOpen,
    isDarkMode,
    isFlipped,
    setIsFlipped,
    toggleTheme,
  } = useContext(MyContext);
  // open close Navigation Bar via icon
  const toggleIsNavOpenOnClick = () => {
    setIsNavOpen((isNavOpen) => !isNavOpen);
  };
  // flip dark mode from light and vice versa
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div>
      <div className={`navigation ${isNavOpen ? "open" : ""}`}>
        <button
          className={`navigation__toggle ${isNavOpen ? "open" : ""}`}
          onClick={toggleIsNavOpenOnClick}
        >
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
              <Link
                to="/" // Use react-router-dom's Link component to navigate to the home page
                className={`navigation__link ${
                  activeSection === "home" ? "active" : ""
                }`}
                onClick={() => {
                  setIsNavOpen(false);
                  handleScroll("home");
                  const targetSection = document.getElementById("top");
                  if (targetSection) {
                    targetSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start", // Scroll to the top of the element
                    });
                  }
                }}
              >
                <HomeIcon /> Home
              </Link>
            </li>
            {/* About Link */}
            <li className="navigation__item">
              <Link
                to="/#about" // Add the hash fragment for the "Works" section
                className={`navigation__link ${
                  activeSection === "about" ? "active" : ""
                }`}
                onClick={() => {
                  setIsNavOpen(false);
                  handleScroll("about");
                }}
              >
                <InfoIcon /> About Me
              </Link>
            </li>
            {/* Works Link */}
            <li className="navigation__item">
              <Link
                to="/#works" // Add the hash fragment for the "Works" section
                className={`navigation__link ${
                  activeSection === "works" ? "active" : ""
                }`}
                onClick={() => {
                  setIsNavOpen(false);
                  handleScroll("works");
                }}
              >
                <WorkOutlineIcon /> Projects
              </Link>
            </li>
            {/* Contact Link */}
            <li className="navigation__item">
              <Link
                to="/#contact" // Add the hash fragment for the "Works" section
                className={`navigation__link ${
                  activeSection === "contact" ? "active" : ""
                }`}
                onClick={() => {
                  setIsNavOpen(false);
                  handleScroll("contact");
                }}
              >
                <ContactMailIcon /> Contact
              </Link>
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
                    onClick={toggleTheme}
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
                      to={`/uploads`}
                      onClick={() => setIsNavOpen(false)}
                    >
                      <AddIcon /> Uploads
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
                  } `}
                  onClick={handleFlip}
                >
                  <button
                    onClick={toggleTheme}
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
                {/* menu button for mobile */}
                <li className="navigation__item">
                  <button
                    className="navigation__toggle"
                    onClick={toggleIsNavOpenOnClick}
                  >
                    {isNavOpen ? <MenuIcon /> : <MenuOpenIcon />}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
