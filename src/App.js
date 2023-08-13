import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// CSS
import "./App.css";
import "tachyons";
// JS
import { Navbar, Body, Footer, Register, LogIn } from "./components";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Body />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<LogIn />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
