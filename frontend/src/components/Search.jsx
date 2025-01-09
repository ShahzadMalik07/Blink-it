import React from 'react'
import { CiSearch } from "react-icons/ci";
import { TypeAnimation } from 'react-type-animation';

const Search = () => {
    return (
        <div className='w-full border  min-w-[300px] flex items-center bg-slate-50 overflow-hidden lg:min-w-[420px] h-12 rounded-lg text-neutral-700 '>
            <button className=' flex justify-center items-center h-full p-3'>
                <CiSearch size={25} />
            </button>
            <div>
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
        </div>
    )
}

export default Search
