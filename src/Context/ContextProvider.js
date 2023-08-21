import React, { useState, useEffect, createContext } from "react";
// Context
export const MyContext = createContext();

const ContextProvider = (props) => {
  const [handleScrollCondition] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // Store the active section
  const [isLoggedIn, setIsLoggedIn] = useState({
    username: "",
    id: 0,
    statusLoggedIn: false,
  }); // state to check/control logged in user
  // get user from localStorage
  const getItemFromLocalStorage = localStorage.getItem("accessToken");
  // LOGOUT button
  const onClickLogOutButton = async () => {
    setIsLoggedIn({ username: "", id: 0, statusLoggedIn: false });
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
  const FetchValidToken = async () => {
    try {
      const response = await fetch("http://localhost:10000/auth/validToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accessToken: getItemFromLocalStorage,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // if user is regular
        setIsLoggedIn({
          username: data.username,
          accessToken: data.accessToken,
          id: data.id,
          statusLoggedIn: true,
        });
        // if user is admin
        if (data.isAdmin) {
          setIsLoggedIn({
            username: data.username,
            accessToken: data.accessToken,
            id: data.id,
            isAdmin: data.isAdmin,
            statusLoggedIn: true,
          });
        }
      } else {
        setIsLoggedIn({
          username: "",
          id: 0,
          statusLoggedIn: false,
        });
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
  useEffect(() => {
    handleScroll();
    handleSectionDetection();
    CheckLogInStatus();
    FetchValidToken();
  }, []);

  const contextValues = {
    handleScroll,
    handleScrollCondition,
    GitHubLink,
    activeSection,
    onClickLogOutButton,
    setIsLoggedIn,
    isLoggedIn,
    getItemFromLocalStorage,
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
