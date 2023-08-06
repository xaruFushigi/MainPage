import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
// CSS
import "./App.css";
import "tachyons";
// JS
import { Main } from "./components";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link></Link>
        <Routes>
          <Route path="/" exact element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
