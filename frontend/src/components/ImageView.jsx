import React from 'react'
import { IoClose } from 'react-icons/io5'

const ImageView = ({ url,close }) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-40 bg-neutral-900 bg-opacity-75'>
      <div className='w-full max-w-md p-4 bg-white max-h-[80vh]'>
        <button onClick={close} className='w-fit ml-auto block'><IoClose size={25}/></button>
        <img src={url} alt="image" className='h-full w-full object-scale-down' />
      </div>

    </div>
  )
}

export default ImageView
