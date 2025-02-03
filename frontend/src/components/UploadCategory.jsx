import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";

const UploadCategory = ({ close }) => {
    const [data, setdata] = useState({
        name: "",
        Image: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setdata((prev) => {
            return {
                ...prev,
                [name]: value

            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleUploadImage = (e)=>{
        const file = e.target.files[0]

        if (!file) {
            return
            
        }

    }
    return (
        <div className='flex items-center justify-center p-2 bg-neutral-800 bg-opacity-60 fixed top-0 bottom-0 left-0 right-0'>
            <div className='bg-white max-w-4xl w-full p-2 rounded'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold'>Category</h1>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form action="" onSubmit={handleSubmit} className='my-3 grid gap-3'>
                    <div className='grid gap-1'>
                        <label id='categoryName'>Name</label>
                        <input className='outline-none border border-primary-200 rounded p-2 focus-within:border-primary-200' type="text" id='categoryName' placeholder='Enter category name' value={data.name} name='name' onChange={handleChange} />
                    </div>
                    <div>
                        <p>Image</p>
                        <div className='flex flex-col lg:flex-row gap-4 items-center '>
                            <div className='border flex items-center justify-center bg-blue-50 h-36 lg:w-36 w-full'>
                                <p className='text-sm text-neutral-800'>No Image</p>
                            </div>
                            <label htmlFor="uploadCategoryImage">
                                <div disabled={!data.name} className={`px-2 py-1 rounded ${!data.name ? "bg-gray-400" : "bg-primary-200"} cursor-pointer `}>Upload Image</div>
                                <input id='uploadCategoryImage' onChange={handleUploadImage} type="file" className='hidden' />
                            </label>
                        </div>

                    </div>
                </form>
            </div>



        </div>
    )
}

export default UploadCategory
