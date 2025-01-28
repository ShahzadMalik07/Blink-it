import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserMenu = () => {
    const user = useSelector((store) => store.user)
    return (
        <div>
            <div className='font-semibold'>My Account</div>
            <div className='text-sm'>{user?.name || user?.mobile}</div>
            <div className='text-sm grid gap-2 '>
                <Link to={""}>My Orders</Link>
                <Link to={""}>Save Address</Link>
                <button className='text-left'>Log Out</button>
            </div>
        </div>
    )
}

export default UserMenu
