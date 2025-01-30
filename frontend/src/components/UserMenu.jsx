import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'
import axios from 'axios'
import toast from 'react-hot-toast'
import { logout } from '../store/userSlice'
import AxiosToastError from '../utils/AxiosToastError'

const UserMenu = ({ close }) => {
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/user/logout", { withCredentials: true })
            if (response.data.success) {
                if (close) {
                    close()
                }

                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)

            }

        } catch (error) {
            AxiosToastError(error)
            console.log(error)

        }



    }
    return (
        <div>
            <div className='font-semibold'>My Account</div>
            <div className='text-sm'>{user?.name || user?.mobile}</div>
            <Divider />
            <div className='text-sm grid gap-2 '>
                <Link to={""}>My Orders</Link>
                <Link to={""}>Save Address</Link>
                <button onClick={handleLogout} className='text-left'>Log Out</button>
            </div>
        </div>
    )
}

export default UserMenu
