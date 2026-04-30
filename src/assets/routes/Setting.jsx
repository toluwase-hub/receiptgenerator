import React, { useState } from 'react'

const Setting = ({theme, changeTheme, color, white, black, red, green, blue }) => {

  const [closetheme, setCloseTheme] = useState(false)

  const HandleCloseTheme = ()=> {
    setCloseTheme(!closetheme)
  }
  return (
    <div className='mt-18'>

      <h1>Register</h1>
      <div>
        <h1>Theme:</h1>
          <button className={`font-bold border px-2 ${theme ? "bg-black text-white" : "bg-white text-black"} `} onClick={changeTheme}>{theme ? "Dark" : "Light💡"}</button>
      </div>

      <div>
        <h1 onClick={HandleCloseTheme}>Theme Color:</h1>
        <div className={`flex flex-col gap-2 items-start overflow-hidden transition-all duration-400 ${closetheme ? "max-h-100" : "max-h-0"}`}>
        <button  className={` px-2 rounded ${color === "White" ? "bg-white" : "bg-gray-400"}`} onClick={white}>White</button>
        <button className={` px-2 rounded ${color === "Black" ? "bg-black text-white" : "bg-gray-400"}`} onClick={black}>Black</button>
        <button className={` px-2 rounded ${color === "Red" ? "bg-red-500 text-white" : "bg-gray-400"}`} onClick={red}>Red</button>
        <button className={` px-2 rounded ${color === "Green" ? "bg-green-500 text-white" : "bg-gray-400"}`} onClick={green}>Green</button>
        <button className={` px-2 rounded ${color === "Blue" ? "bg-blue-500 text-white" : "bg-gray-400"}`} onClick={blue}>Blue</button>
        </div>
      </div>

      <div onClick={HandleCloseTheme} className={` w-10 h-10 rounded-full mt-3 ${color === "White" ? "bg-white/90" : color === "Black" ? "bg-black" : color === "Red" ? "bg-red-500" : color === "Green" ? "bg-green-500" :  "bg-blue-500" } `}>
      </div>
      
    </div>
  )
}

export default Setting