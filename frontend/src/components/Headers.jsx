import React from 'react'
import logo from "../assets/logo.png"

const Headers = () => {
  return (
    <header className='h-24  shadow-md p-2 sticky top-0 '>
      <div className='h-full '>
        <div className='h-full container mx-auto flex items-center '>
          <div>
            <img src={logo} width={120} height={70} alt="logo" />
          </div>
          <div>Search</div>
          <div>Login and my cart</div>


        </div>
      </div>
    </header>
  )
}

export default Headers
