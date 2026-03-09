import React from 'react'

const Setting = ({theme, changeTheme }) => {
  return (
    <div>

      <h1>Register</h1>
      <div>
        <h1>Theme:</h1>
          <button className='font-bold' onClick={changeTheme}>{theme ? "Dark" : "Light💡"}</button>
      </div>
      
    </div>
  )
}

export default Setting