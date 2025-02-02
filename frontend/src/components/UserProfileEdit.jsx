import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import AxiosToastError from '../utils/AxiosToastError'
import { updateImage } from "../store/userSlice"
import { IoClose } from "react-icons/io5";

const UserProfileEdit = ({close}) => {
    const user = useSelector((store) => store.user)
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()

    const handleUploadImage = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
            
        }
        const formData = new FormData()
        formData.append("image", file)
        try {
            setloading(true)
            const response = await axios.put("http://localhost:3000/api/user/upload-image", formData, { withCredentials: true })
            const {data: responseData} = response
            dispatch(updateImage(responseData.data.avatar))

        } catch (error) {
            AxiosToastError(error)

        }finally{
            setloading(false)
        }


    }
    return (
        <div className='flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-40'>
             
            <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
            <button onClick={close} className='text-neutral-800 w-fit block ml-auto' ><IoClose size={25}/></button>
            
                <div className='w-16 h-16 overflow-hidden drop-shadow-lg rounded-full flex items-center justify-center '>
                   
                    {
                        user.avatar ? (
                            <img className='w-full h-full' src={user.avatar} alt={user.name} />
                        ) : (
                            <FaRegUserCircle size={60} />
                        )
                    }

                </div>
                
                <form action="">
                    <label htmlFor="profile"> <div className='border cursor-pointer border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-2'>{loading? "Uploading..." : "Upload"}</div></label>
                    <input onChange={handleUploadImage} id='profile' type="file" className='hidden' />
                </form>



            </div>


        </div>
    )
}

export default UserProfileEdit
