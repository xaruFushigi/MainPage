import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// CSS
import "./App.css";
import "tachyons";
// JSå
import {
  Navbar,
  Body,
  Footer,
  Register,
  Profile,
  AddProject,
  Confirmation,
  LogIn,
} from "./components";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Body />} />
          <Route path="/register" exact element={<Register />} />
          <Route
            path="/register/checkUserInfo"
            exact
            element={<Confirmation />}
          />
          <Route path="/profile/byId/:profileId" exact element={<Profile />} />
          <Route path="/addProject" exact element={<AddProject />} />
          <Route path="/login" exact element={<LogIn />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
