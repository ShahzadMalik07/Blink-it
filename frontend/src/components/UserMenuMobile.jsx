import React from 'react'
import UserMenu from './UserMenu'
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {
    return (
        <div className='bg-white h-full w-full'>
            <button onClick={()=>window.history.back()} className='block w-fit ml-auto pr-2'>
                <IoClose size={25}/>

            </button>
            <div className='container mx-auto p-3'>
                <UserMenu />
            </div>

        </div>
    )
}

export default UserMenuMobile
