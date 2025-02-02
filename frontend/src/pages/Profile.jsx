import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileEdit from '../components/UserProfileEdit';
import axios from 'axios';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import fetchUserDetails from '../utils/getUserDetails';
import { setUserDetails } from '../store/userSlice';

const Profile = () => {
  const user = useSelector((store) => store.user)
  const [OpenProfileEdit, setOpenProfileEdit] = useState(false)
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  const [userData, setuserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile

  })
  useEffect(() => {
    setuserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    })
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setuserData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setloading(true)
      const response = await axios.put("http://localhost:3000/api/user/update-user",userData,{withCredentials:true})
      const {data:responseData } = response
      console.log(response)
      if (responseData.success) {
        toast.success(responseData.message)
        const userDetails = await fetchUserDetails()

        dispatch(setUserDetails(userDetails?.data))
        
      }

    } catch (error) {
      AxiosToastError(error)

    } finally {
      setloading(false)
    }

  }

  return (
    <div>
      <div className='w-16 h-16 overflow-hidden drop-shadow-lg rounded-full flex items-center justify-center '>
        {
          user.avatar ? (
            <img className='w-full h-full' src={user.avatar} alt={user.name} />
          ) : (
            <FaRegUserCircle size={60} />
          )
        }

      </div>
      <button onClick={() => { setOpenProfileEdit(true) }} className='text-sm min-w-16 border border-primary-100 hover:bg-primary-200  px-3 py-1 rounded-full mt-3'>
        Edit
      </button>
      {
        OpenProfileEdit && <UserProfileEdit close={() => { setOpenProfileEdit(false) }} />
      }

      <form action="" className='my-3 grid gap-3' onSubmit={handleSubmit}>
        <div className='grid'>
          <label htmlFor="name">Name</label>
          <input id='name' type="text" name='name' value={userData.name} onChange={handleChange} className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200' placeholder='Enter Your Name' />
        </div>
        <div className='grid'>
          <label htmlFor="email">Email</label>
          <input id='email' type="text" name='email' value={userData.email} onChange={handleChange} className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200' placeholder='Enter Your Name' />
        </div>
        <div className='grid'>
          <label htmlFor="mobile">Mobile</label>
          <input id='mobile' type="text" name='mobile' value={userData.mobile} onChange={handleChange} className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200' placeholder='Enter Your Name' />
        </div>

        <button className='border px-4 py-2 font-semibold hover:bg-primary-100 border-primary-100'>Submit</button>

      </form>

    </div>
  )
}

export default Profile
