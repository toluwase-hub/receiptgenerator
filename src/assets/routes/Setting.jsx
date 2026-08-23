import React, { useState } from "react";
import Online from "../Components/Onlinestatus";
import { IoIosArrowForward } from "react-icons/io";


const Setting = ({
  theme,
  changeTheme,
  color,
  white,
  black,
  red,
  green,
  blue,
}) => {
  const [closetheme, setCloseTheme] = useState(false);

  const HandleCloseTheme = () => {
    setCloseTheme(!closetheme);
  };
  return (
    <div className="mt-18 ">
      <h1 className="font-bold text-4xl pb-2 ">Settings</h1>
      <div onClick={()=> alert("Coming soon")} className={`flex items-center ${theme ? " bg-gray-100" : "border-b"}  py-2 px-1 justify-between `}>
        <h1>Register</h1>
        <h1><IoIosArrowForward />  </h1>
      </div>
      
      <div className={`flex py-2 px-1 items-center justify-between ${theme ? "" : "border-b"}`}>
        <h1>Theme:</h1>
        <button
          className={`font-bold border px-2 ${theme ? "bg-black text-white" : "bg-white text-black"} `}
          onClick={changeTheme}
        >
          {theme ? "Dark" : "Light💡"}
        </button>
      </div>

      <div  onClick={HandleCloseTheme} className={`flex ${theme ? " bg-gray-100" : "border-b"} py-2 px-1 justify-between`}>
        <div className="flex justify-between items-center  w-full">

        <div className="flex items-center gap-2">
          <h1 onClick={HandleCloseTheme}>Theme Color:</h1>
           <div
        onClick={HandleCloseTheme}
        className={` w-5 h-5 rounded-full  ${color === "White" ? "bg-white/90" : color === "Black" ? "bg-black" : color === "Red" ? "bg-red-500" : color === "Green" ? "bg-green-500" : "bg-blue-500"} `}
      ></div>
        </div>

        <h1><IoIosArrowForward />  </h1>

        </div>
      
      </div>

      <div
          className={` flex items-end flex-col gap-2  mt-1 overflow-hidden transition-all duration-400 ${closetheme ? "max-h-100" : "max-h-0"}`}
        >
          <button
            className={` px-2 rounded ${color === "White" ? "bg-white" : "bg-gray-400"}`}
            onClick={white}
          >
            White
          </button>
          <button
            className={` px-2 rounded ${color === "Black" ? "bg-black text-white" : "bg-gray-400"}`}
            onClick={black}
          >
            Black
          </button>
          <button
            className={` px-2 rounded ${color === "Red" ? "bg-red-500 text-white" : "bg-gray-400"}`}
            onClick={red}
          >
            Red
          </button>
          <button
            className={` px-2 rounded ${color === "Green" ? "bg-green-500 text-white" : "bg-gray-400"}`}
            onClick={green}
          >
            Green
          </button>
          <button
            className={` px-2 rounded ${color === "Blue" ? "bg-blue-500 text-white" : "bg-gray-400"}`}
            onClick={blue}
          >
            Blue
          </button>
        </div>

     
      {/* online status */}
      <div className="flex gap-1 justify-between py-2 px-1">
        <span className="">Status:</span><span> <Online /></span>
      </div>
    </div>
  );
};

export default Setting;
