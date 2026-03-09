import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./assets/Navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  const [theme, setTheme] = useState(true)

  const changeTheme = ()=> {
    setTheme(!theme)
  }
  return (
    <>
      <div className="mb-20 lg:mb-0">
        <BrowserRouter>
        
          <Navbar theme={theme} changeTheme={changeTheme} />
          
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
