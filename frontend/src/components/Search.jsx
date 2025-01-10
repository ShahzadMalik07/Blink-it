import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobiles';

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()

    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)

    }, [location])

    const handleClick = () => {
        navigate("/search")
    }



    return (
        <div className='w-full border  min-w-[300px] flex items-center bg-slate-50 overflow-hidden lg:min-w-[420px] h-10 lg:h-12 rounded-lg text-neutral-700 group focus-within:border-primary-200 '>
            <div>

                {
                    (isMobile && isSearchPage) ? <Link to={"/"} className='flex justify-center items-center h-full p-3  group-focus-within:text-primary-200 '><FaArrowLeft size={20} /></Link> : <button className='flex justify-center items-center h-full p-3  group-focus-within:text-primary-200 '>
                        <CiSearch size={25} />
                    </button>
                }

            </div>
            <div className='w-full h-full'>
                {
                    !isSearchPage ? (
                        <div onClick={handleClick} className='w-full h-full flex items-center' >
                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search "milk"',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Search "Mobiles"',
                                    1000,
                                    'Search "Laptops"',
                                    1000,
                                    'Search "Grocery"',
                                    1000,
                                    'Search "Sugar"',
                                    1000,
                                    'Search "Shirts"',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}

                                repeat={Infinity}
                            />
                        </div>

                    ) : (
                        <div className='w-full h-full'>
                            <input
                                type="text"
                                autoFocus={true}
                                placeholder='Search for Milk, Butter etc.' className='bg-transparent w-full h-full outline-none' />
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Search
