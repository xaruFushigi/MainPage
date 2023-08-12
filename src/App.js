import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
// CSS
import "./App.css";
import "tachyons";
// JS
import { Navbar, Main, About, Footer } from "./components";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Link></Link>
          <Routes>
            <Route path="/" exact element={<Main />} />
          </Routes>
         <About />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
