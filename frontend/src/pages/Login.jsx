import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import toast from 'react-hot-toast';
import axios from "axios"
import Axios from '../utils/Axios';
import summaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import  { Link, useNavigate } from 'react-router-dom'




const Login = () => {
  const [data, setdata] = useState({  email: "", password: "", })
  const [showPassword, setshowPassword] = useState(false)
 

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
      const response = await axios.post("http://localhost:3000/api/user/login", data,{ withCredentials:true })
    

      if (response.data.error) {
        toast.error(response.data.message)

      }
      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem("accsessToken",response.data.data.accsessToken)
        localStorage.setItem("refreshToken",response.data.data.refreshToken)
        setdata({
         
          email: "",
          password: "",
      
        })
       
        navigate("/")

      }

    } catch (error) {
      AxiosToastError(error)
      console.log(error)

    }


  }

  return (
    <div className='container mx-auto w-full  px-8 '>
      <div className='bg-white w-full max-w-lg mx-auto rounded p-9 my-4 '>
        <p>Welcome to Blink-it</p>

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

          <div className='flex flex-col gap-2'>
            <label htmlFor="password" >Password:</label>
            <div className=' flex items-center gap-1 bg-blue-50 p-2 border rounded focus-within:border-primary-200'>
              <input id='password'
                type={showPassword ? "text" : "password"}
                name='password'
                value={data.password}
                placeholder='Enter your password'
                className='w-full outline-none bg-transparent'
                onChange={handleChange} />
              <div className='cursor-pointer' onClick={() => setshowPassword((prev) => !prev)}>
                {showPassword ? (<MdOutlineRemoveRedEye />) : (<FaRegEyeSlash />)}
              </div>
            </div>


          </div>
          <Link to={"/forgot-password"} className='hover:text-primary-200 block ml-auto ' >Forgot Password?</Link>
         

          <button disabled={!valuesAvailable} className={`mt-5 ${valuesAvailable ? "bg-green-800 hover:bg-green-700" : "bg-gray-600"}  text-white rounded  py-2 font-semibold tracking-wide`}>Login</button>

        </form>


        <p className='mt-4'>Don't Have an Account? <Link className='text-green-700 font-semibold hover:text-green-800' to={"/signup"}>Signup</Link></p>
      </div>
    </div>
  )
}

export default Login