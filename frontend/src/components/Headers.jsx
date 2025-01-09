import React from 'react'
import logo from "../assets/logo.png"
import Search from './Search'
import { Link } from 'react-router-dom'

const Headers = () => {
  return (
    <header className='h-24  shadow-md p-2 sticky top-0 '>

      <div className='h-full container mx-auto flex items-center justify-between px-8 '>
        <Link to={"/"}>
          <img src={logo} width={120} height={70} alt="logo" />
        </Link>
        <div><Search/></div>
        <div>Login and my cart</div>


      </div>

    </header>
  )
}

export default Headers
