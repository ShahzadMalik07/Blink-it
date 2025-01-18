import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegEyeSlash } from 'react-icons/fa'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import axios from 'axios'

const ResetPassword = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [data, setdata] = useState({ email: "", newPassword: "", confirmPassword: "" })
    const valuesAvailable = Object.values(data).every(el => el)
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)


    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }
        if (location?.state?.email) {
            setdata((prev) => {
                return {
                    ...prev,
                    email: location?.state?.email
                }
            })

        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setdata((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords must be same")
            
        }


        try {
            const response = await axios.put("http://localhost:3000/api/user/reset-password", data)


            if (response.data.error) {
                toast.error(response.data.message)

            }
            if (response.data.success) {
                toast.success(response.data.message)

                navigate("/login")
                setdata({

                    email: "",
                    newPassword:"",
                    confirmPassword:""

                })



            }

        } catch (error) {
            AxiosToastError(error)
            console.log(error)

        }


    }

    console.log("new", data)


    return (
        <div className='container mx-auto w-full  px-8 '>
            <div className='bg-white w-full max-w-lg mx-auto rounded p-9 my-4 '>
                <p className='font-bold text-lg'>Enter Your Password</p>

                <form action="" onSubmit={handleSubmit} className='grid mt-5 gap-3'>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="newPassword" >New Password:</label>
                        <div className=' flex items-center gap-1 bg-blue-50 p-2 border rounded focus-within:border-primary-200'>
                            <input id='newPassword'
                                type={showPassword ? "text" : "password"}
                                name='newPassword'
                                value={data.newPassword}
                                placeholder='Enter your password'
                                className='w-full outline-none bg-transparent'
                                onChange={handleChange} />
                            <div className='cursor-pointer' onClick={() => setshowPassword((prev) => !prev)}>
                                {showPassword ? (<MdOutlineRemoveRedEye />) : (<FaRegEyeSlash />)}
                            </div>
                        </div>


                    </div>
                    
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="confirmPassword" >Confirm New Password:</label>
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





                    <button disabled={!valuesAvailable} className={`mt-5 ${valuesAvailable ? "bg-green-800 hover:bg-green-700" : "bg-gray-600"}  text-white rounded  py-2 font-semibold tracking-wide`}>Change Password</button>

                </form>


                <p className='mt-4'>Already Have an Account? <Link className='text-green-700 font-semibold hover:text-green-800' to={"/login"}>Login</Link></p>
            </div>
        </div>
    )
}

export default ResetPassword
