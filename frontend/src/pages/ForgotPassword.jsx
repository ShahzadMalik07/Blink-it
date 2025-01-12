import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import toast from 'react-hot-toast';
import axios from "axios"
import Axios from '../utils/Axios';
import summaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import  { Link, useNavigate } from 'react-router-dom'




const ForgotPassword = () => {
  const [data, setdata] = useState({  email: "" })

 

  const valuesAvailable = Object.values(data).every(el => el)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setdata((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
   

    try {
      const response = await axios.put("http://localhost:3000/api/user/forgot-password", data)
    

      if (response.data.error) {
        toast.error(response.data.message)

      }
      if (response.data.success) {
        toast.success(response.data.message)
        setdata({
         
          email: "",
      
        })
       
        navigate("/verify-otp")

      }

    } catch (error) {
      AxiosToastError(error)
      console.log(error)

    }


  }

  return (
    <div className='container mx-auto w-full  px-8 '>
      <div className='bg-white w-full max-w-lg mx-auto rounded p-9 my-4 '>
        <p className='font-bold text-lg'>Forgot Password</p>

        <form action="" onSubmit={handleSubmit} className='grid mt-5 gap-3'>

          <div className='flex flex-col gap-2'>
            <label htmlFor="email" >Email:</label>
            <input id='email'
              type="text"
              placeholder='Enter your email'
              name='email'
              value={data.email}

              className='bg-blue-50 p-2 rounded border focus:border-primary-200 outline-none'
              onChange={handleChange} />
          </div>

       
         
         

          <button disabled={!valuesAvailable} className={`mt-5 ${valuesAvailable ? "bg-green-800 hover:bg-green-700" : "bg-gray-600"}  text-white rounded  py-2 font-semibold tracking-wide`}>Send Otp</button>

        </form>


        <p className='mt-4'>Already Have an Account? <Link className='text-green-700 font-semibold hover:text-green-800' to={"/login"}>Login</Link></p>
      </div>
    </div>
  )
}

export default ForgotPassword