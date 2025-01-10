import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Signup = () => {
  const [data, setdata] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [showPassword, setshowPassword] = useState(false)
  const [showConfirmPassword, setshowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setdata((prev) => {
      return { ...prev, [name]: value }
    })
  }
  console.log(data)

  return (
    <div className='container mx-auto w-full  px-8 '>
      <div className='bg-white w-full max-w-lg mx-auto rounded p-4 my-4 '>
        <p>Welcome to Blink-it</p>

        <form action="" className='grid mt-5 gap-3 '>

          <div className='flex flex-col gap-2'>
            <label htmlFor="name" >Name:</label>
            <input id='name'
            type="text"
            name='name'
            placeholder='Enter your name'
            value={data.name}
            autoFocus 
            className='bg-blue-50 p-2 rounded border focus:border-primary-200 outline-none ' 
            onChange={handleChange} />
          </div>

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
          <div className='flex flex-col gap-2'>
            <label htmlFor="confirmPassword" >Confirm Password:</label>
            <div className=' flex items-center gap-1 bg-blue-50 p-2 border rounded focus-within:border-primary-200'>
              <input id='confirmPassword'
                type={showConfirmPassword ? "text" : "password"}
                name='confirmPassword'
                value={data.confirmPassword}
                placeholder='Confirm your password'
                className='w-full outline-none bg-transparent'
                onChange={handleChange} />
              <div className='cursor-pointer' onClick={() => setshowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? (<MdOutlineRemoveRedEye />) : (<FaRegEyeSlash />)}
              </div>
            </div>


          </div>

          <button className='mt-5 bg-green-800 text-white rounded  py-2 font-semibold tracking-wide'>Sign Up</button>

        </form>
      </div>
    </div>
  )
}

export default Signup
