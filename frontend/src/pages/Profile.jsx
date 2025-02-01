import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileEdit from '../components/UserProfileEdit';

const Profile = () => {
  const user = useSelector((store) => store.user)
const [OpenProfileEdit, setOpenProfileEdit] = useState(false)
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
      <button onClick={()=>{setOpenProfileEdit(true)}} className='text-sm min-w-16 border border-primary-100 hover:bg-primary-200  px-3 py-1 rounded-full mt-3'>
        Edit
      </button>
      {
        OpenProfileEdit && <UserProfileEdit close={()=>{setOpenProfileEdit(false)}}/>
        }
      
    </div>
  )
}

export default Profile
