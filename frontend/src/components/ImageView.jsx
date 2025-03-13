import React from 'react'

const ImageView = ({url}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-75'>
      <div className='w-full max-w-md p-4'>
        <img src={url} alt="image" className='h-full w-full object-scale-down' />
      </div>
      
    </div>
  )
}

export default ImageView
