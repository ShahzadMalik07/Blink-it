import React, { useState } from 'react'
import logo from "../assets/logo.png"
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobiles';
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';

const Headers = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const [isMenuOpen, setisMenuOpen] = useState(false)

  const redirectToLogin = () => {
    navigate("/login")

  }
  const handleCloseMenu = () => {
    setisMenuOpen(false)
  }

  const handleMenu= ()=>{
    if (!user._id) {
      navigate("/login")
      return
      
    }
    navigate("/user")
  }

  return (
    <header className='h-28 lg:h-24 z-40  lg:shadow-md p-2  sticky top-0 flex items-center flex-col justify-center gap-2 bg-white '>

      {!(isSearchPage && isMobile) && (<div className=' container mx-auto flex items-center justify-between px-8 '>
        <Link to={"/"}>
          <img src={logo} width={120} height={70} alt="logo" />
        </Link>
        <div className='hidden lg:block  '><Search /></div>
        <div onClick={handleMenu} className='lg:hidden'><FaUserCircle size={26} /></div>


        <div className='hidden lg:flex items-center gap-10 '>
          {
            user?._id ? (
              <div className='relative'>
                <div onClick={() => { setisMenuOpen((prev) => !prev) }} className='flex gap-1 cursor-pointer select-none'>
                  <p>Account</p>
                  {
                    isMenuOpen ? (<GoTriangleUp size={25} />) : (<GoTriangleDown size={25} />)
                  }



                </div>
                {isMenuOpen && (<div className='absolute right-0 h-20'>
                  <div className='bg-white rounded p-4 min-w-52 shadow-lg'>
                    <UserMenu close={handleCloseMenu} />

                  </div>

                </div>)}

              </div>
            ) : (<button onClick={redirectToLogin} >Login</button>)
          }

          {/* add to cart */}
          <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 py-2 px-2 rounded text-white '>
            <div className='animate-bounce' ><GiShoppingCart size={32} /></div>
            <div>
              <p>My Cart</p>
            </div>
          </button>
        </div>



      </div>)}

      <div className='lg:hidden block container mx-auto px-8'><Search /></div>

    </header>
  )
}

export default Headers
