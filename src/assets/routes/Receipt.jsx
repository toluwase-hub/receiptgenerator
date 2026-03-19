import React from 'react'
import Receiptinputs from '../Components/Receiptinputs'

const Receipt = ({theme, color, white, black, red, green, blue  }) => {
  return (
    <div className='mt-18'>
        <Receiptinputs theme={theme}  color={color} black={black} white={white} red={red} green={green}  blue={blue} />
    </div>
  )
}

export default Receipt