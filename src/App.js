import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyContext } from "./Context/ContextProvider";
// CSS
import "./App.css";
import "tachyons";
// JS
import {
  Navbar,
  Body,
  Footer,
  Register,
  Profile,
  AddProject,
  TabbedInterface,
  Confirmation,
  UploadFile,
  LogIn,
  NotFound,
} from "./components";

function App() {
  const { isDarkMode } = useContext(MyContext);
  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
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
          <Route path="/confirmation" exact element={<Confirmation />} />
          <Route path="/profile/byId/:profileId" exact element={<Profile />} />
          <Route path="/uploads" exact element={<TabbedInterface />} />
          <Route path="/addProject" exact element={<AddProject />} />
          <Route path="/uploadFile" exact element={<UploadFile />} />
          <Route path="/login" exact element={<LogIn />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
