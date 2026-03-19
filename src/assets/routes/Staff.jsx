import React from 'react'
import Staffinputs from '../Components/Staffinputs'

const Staff = ({theme, color, white, black, red, green, blue }) => {
  return (
    <div className='mt-18'>
      <Staffinputs theme={theme}  color={color} black={black} white={white} red={red} green={green}  blue={blue} />
    </div>
  )
}

export default Staff