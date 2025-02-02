import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import axios from 'axios'
import toast from 'react-hot-toast'
import { logout } from '../store/userSlice'
import AxiosToastError from '../utils/AxiosToastError'
import { FiExternalLink } from "react-icons/fi";

const UserMenu = ({ close }) => {
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                navigate("/")

            }

        } catch (error) {
            AxiosToastError(error)
            console.log(error)

        }



    }

    const handleClose = ()=>{
        if (close) {
            close()
            
        }
    }
    return (
        <div>
            <div className='font-semibold mb-1'>My Account</div>
            <div className='text-sm flex items-center gap-2'>
                <span className='max-w-52 text-ellipsis line-clamp-1'>{user?.name || user?.mobile}</span>
                <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-100' ><FiExternalLink size={16}/></Link>
            </div>
            <Divider />
            <div className='text-sm grid gap-2 '>
                <Link onClick={handleClose} to={"/dashboard/category"} className='hover:bg-blue-400 p-1 rounded' >Category</Link>
                <Link onClick={handleClose} to={"/dashboard/subcategory"} className='hover:bg-blue-400 p-1 rounded' >Sub Category</Link>
                <Link onClick={handleClose} to={"/dashboard/upload-products"} className='hover:bg-blue-400 p-1 rounded' >Upload Products</Link>
                <Link onClick={handleClose} to={"/dashboard/products"} className='hover:bg-blue-400 p-1 rounded' >Products</Link>
                <Link onClick={handleClose} to={"/dashboard/myorders"} className='hover:bg-blue-400 p-1 rounded' >My Orders</Link>
                <Link onClick={handleClose} to={"/dashboard/address"}className='hover:bg-blue-400 p-1 rounded' >Save Address</Link>
                <button onClick={handleLogout} className='text-left hover:bg-blue-400 p-1 rounded'>Log Out</button>
            </div>
        </div>
    )
}

export default UserMenu
