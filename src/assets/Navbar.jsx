import React, { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Receipt from './routes/Receipt'
import Staff from './routes/Staff'
import Setting from './routes/Setting'
import { MdOutlineCancelPresentation } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { IoReceiptOutline } from "react-icons/io5";
import { GrUserWorker } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
const Navbar = ({theme, changeTheme}) => {

  const [shwoSideBar, setshwoSideBar] = useState(true)

  
  return (
    <div className='lg:flex block '>

      {/* Sidebar */}
      <div className={` ${theme ? "bg-white border-black" : "bg-black/95 text-white border-white"} hidden lg:flex  transition-all duration-500  flex flex-col  w-50 ${shwoSideBar ? "max-w-64  border-r " : "max-w-0"}`}>
        <nav className='w-[90%] mx-auto mt-6 '>
          <ul className='space-y-4'>
            <li>
              <NavLink to="/" className={  ({isActive}) => 
                  isActive ? "text-gray-400  " : ""
              }>
                
                  <div className={`flex  gap-2 items-center  `}>
                  <span><IoReceiptOutline size={25} /></span>
                  <span className='text-lg font-light'>Receipt</span>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/staff"  className={  ({isActive}) => 
                  isActive ? "text-gray-400  " : ""
              }>
                 <div className={`flex  gap-2 items-center  `}>
                  <span><GrUserWorker size={25} /></span>
                  <span className='text-lg font-light'>Staff</span>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/setting"  className={  ({isActive}) => 
                  isActive ? "text-gray-400  " : ""
              }>
                 <div className={`flex  gap-2 items-center `}>
                  <span><IoSettingsOutline size={25} /></span>
                  <span className='text-lg font-light'>Setting</span>
                </div>
              </NavLink>
            </li>

            <button onClick={changeTheme} className={`border py px-2 font-bold  ${ theme ? "border-black bg-black text-white" : "border-white bg-white text-black"}`}>{theme ? "Dark" : " Light💡"}</button>
          </ul>
        </nav>
      </div>

       <div className={` lg:hidden  fixed bottom-0 transition-all duration-200 w-screen  flex flex-col ${theme ? "bg-white/95 text-black" : "bg-black/95 text-white"}  `}>
        <nav className='w-[90%] mx-auto mt-6 '>
          <ul className='space-y-5 flex justify-around'>
            <li className=''>
              <NavLink to="/"  className={  ({isActive}) => 
                  isActive ? "text-gray-600 scale-120 transition-all duration-500" : "scale-100 transition-all duration-500"
              }>
                <div className='flex flex-col justify-center items-center'>
                  <span><IoReceiptOutline size={25}  /></span>
                  <span className=' font-light '>Receipt</span>
                </div>
              </NavLink>
            </li>

            <li className=''>
              <NavLink to="/staff"  className={  ({isActive}) => 
                  isActive ? "text-gray-600 scale-120 transition-all duration-500" : "scale-100 transition-all duration-500"
              }>
                <div className='flex flex-col justify-center items-center'>
                  <span><GrUserWorker size={25} /></span>
                  <span className='font-light'>Staff</span>
                </div>
              </NavLink>
            </li>

            <li className=''>
              <NavLink to="/setting" className={  ({isActive}) => 
                  isActive ? "text-gray-600 scale-120  transition-all duration-500" : "scale-100 transition-all duration-500"
              }>
                <div className='flex flex-col justify-center items-center'>
                  <span><IoSettingsOutline size={25} /></span>
                  <span className=' font-light'>Setting</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className={`flex-1 p-6 transition-all duration-500  ${ theme ? "bg-white text-black" : "bg-black text-white"}  `}>
        <div className='pb-4'>
          <h1 className='font-bold text-2xl lg:text-4xl  '>Tee Web dev Receipt and Staff ID card generator</h1>
          <button className='hidden lg:block' onClick={()=> setshwoSideBar(!shwoSideBar)}> {shwoSideBar ? (
            <MdOutlineCancelPresentation size={26} /> ) : (<AiOutlineMenu size={26} />
   )       }</button>
        </div>
        
        <Routes >
          <Route path="/" element={<Receipt theme={theme} />}  />
          <Route path="/staff" element={<Staff theme={theme} />}  />
          <Route path="/setting" element={<Setting theme={theme} changeTheme={changeTheme} />}  />
        </Routes>
      </main>

    </div>
  )
}

export default Navbar
