import React, { useEffect, useRef, useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import toast from 'react-hot-toast';
import axios from "axios"
import Axios from '../utils/Axios';
import summaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom'




const VerifyOtp = () => {
    const [data, setdata] = useState(["", "", "", "", "", ""])
    const inputRef = useRef([])
    const location = useLocation()
    



    const valuesAvailable = data.every(el => el)
    const navigate = useNavigate()
  
    useEffect(() => {
        if (!location?.state?.data?.email) {
            navigate("/forgot-password")
           

        }
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault()


        try {
            const response = await axios.put("http://localhost:3000/api/user/verify-forgot-password", { otp: data?.join(""), email: location?.state?.data?.email })


            if (response.data.error) {
                toast.error(response.data.message)

            }
            if (response.data.success) {
                toast.success(response.data.message)
                setdata(["", "", "", "", "", ""])

                navigate("/reset-password",{
                    state:{
                        data:response.data,
                        email: location?.state?.data?.email
                    }
                })

            }

        } catch (error) {
            AxiosToastError(error)
            console.log(error)

        }


    }

    return (
        <div className='container mx-auto w-full  px-8 '>
            <div className='bg-white w-full max-w-lg mx-auto rounded p-9 my-4 '>
                <p className='font-bold text-lg tracking-wide'>Otp Verification</p>

                <form action="" onSubmit={handleSubmit} className='grid mt-5 gap-3'>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="otp" >Enter Your Otp </label>
                        <div className='flex items-center gap-2 justify-between mt-2'>
                            {
                                data.map((element, index) => {
                                    return (
                                        <input key={index} id='otp'
                                            ref={(ref) => {
                                                inputRef.current[index] = ref

                                                return ref

                                            }}
                                            type="text"
                                            value={data[index]}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                const myData = [...data]
                                                myData[index] = value
                                                setdata(myData)

                                                if (value && index < 5) {
                                                    inputRef.current[index + 1].focus()


                                                }

                                            }}
                                            maxLength={1}
                                            className='w-10 text-center font-semibold text-lg lg:w-14 bg-blue-50 p-2 rounded border focus:border-primary-200 outline-none'
                                        />
                                    )
                                })
                            }
                        </div>

                    </div>





                    <button disabled={!valuesAvailable} className={`mt-5 ${valuesAvailable ? "bg-green-800 hover:bg-green-700" : "bg-gray-600"}  text-white rounded  py-2 font-semibold tracking-wide`}>Verify Otp</button>

                </form>


                <p className='mt-4'>Already Have an Account? <Link className='text-green-700 font-semibold hover:text-green-800' to={"/login"}>Login</Link></p>
            </div>
        </div>
    )
}

export default VerifyOtp