import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./assets/Navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  const [theme, setTheme] = useState(true)

  const [ color, setColor] = useState("")

  
  const changeTheme = ()=> {
    setTheme(!theme)
  }

   const black = ()=> {
    setColor("Black")
   }

   const white = ()=> {
    setColor("White")
   }

   const red = ()=> {
    setColor("Red")
   }

   const green = ()=> {
    setColor("Green")
   }

   const blue = ()=> {
    setColor("Blue")
   }
 
  return (
    <>
      <div className="mb-20 lg:mb-0">
        <BrowserRouter>
        
          <Navbar color={color} black={black} white={white} red={red} green={green} theme={theme} blue={blue} changeTheme={changeTheme} />
          
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
