import React, { useState, useEffect, createContext } from "react";

// Context
export const MyContext = createContext();

const ContextProvider = (props) => {
  // get user from localStorage
  const getItemFromLocalStorage = localStorage.getItem("accessToken");
  const localStorageThemeColor = localStorage.getItem("mode");
  // states
  const [handleScrollCondition] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // Store the active section
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState({
    username: "",
    id: 0,
    statusLoggedIn: false,
  }); // state to check/control logged in user
  // LOGOUT button
  const onClickLogOutButton = async () => {
    setIsLoggedIn({ username: "", id: 0, statusLoggedIn: false });
    setIsNavOpen(false);
    localStorage.removeItem("accessToken");
    window.open("/login", "_self");
  };
  // smooth scroll to About section
  const handleScroll = (section) => {
    setActiveSection(section); // Set the active section
    const targetSection = document.getElementById(section);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  // handle navbar section detection
  const handleSectionDetection = () => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  };
  // my github profile link
  const GitHubLink = () => {
    window.open("https://github.com/xaruFushigi");
  };
  // my linkedIn link
  const LinkedInLink = () => {
    window.open("https://www.linkedin.com/in/bokhodir-ziedullaev-90b05b1b8/");
  };
  const FetchValidToken = async () => {
    try {
      const response = await fetch("https://mainpage-back-end.onrender.com/auth/validToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accessToken: getItemFromLocalStorage,
        },
        mode : 'cors'
      });
      if (response.ok) {
        const data = await response.json();
        // if user is admin
        setIsLoggedIn({
          username: data.username,
          accessToken: data.accessToken,
          id: data.id,
          isAdmin: data.isAdmin,
          statusLoggedIn: true,
        });
        if (!data.isAdmin) {
          // if user is regular
          setIsLoggedIn({
            username: data.username,
            accessToken: data.accessToken,
            id: data.id,
            statusLoggedIn: true,
          });
        }
      } else {
        setIsLoggedIn({
          username: "",
          id: 0,
          statusLoggedIn: false,
        });
        localStorage.removeItem('accessToken'); // Clear the token from local storage
      }
    } catch (error) {
      console.log(error);
    }
  };
  // updates navbar based on accessToken
  const CheckLogInStatus = () => {
    if (getItemFromLocalStorage) {
      setIsLoggedIn({ ...isLoggedIn, statusLoggedIn: true });
    } else {
      setIsLoggedIn({ ...isLoggedIn, statusLoggedIn: false });
    }
  };
  // theme
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("mode", newTheme ? "dark" : "light");
  };
  useEffect(() => {
    handleScroll();
    handleSectionDetection();
    CheckLogInStatus();
    FetchValidToken();
    const savedThemeMode = localStorage.getItem("mode");
    setIsDarkMode(savedThemeMode === "dark"); // Set isDarkMode based on the saved theme mode
  }, []);

  const contextValues = {
    handleScroll,
    handleScrollCondition,
    GitHubLink,
    LinkedInLink,
    activeSection,
    onClickLogOutButton,
    setIsLoggedIn,
    isLoggedIn,
    getItemFromLocalStorage,
    isNavOpen,
    setIsNavOpen,
    isDarkMode,
    setIsDarkMode,
    isFlipped,
    setIsFlipped,
    localStorageThemeColor,
    toggleTheme,
  };
  return (
    <div>
      <MyContext.Provider value={contextValues}>
        {props.children}
      </MyContext.Provider>
    </div>
  );
};

export default ContextProvider;
