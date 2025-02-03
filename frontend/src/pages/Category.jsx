import React, { useState } from 'react'
import UploadCategory from '../components/UploadCategory'

const Category = () => {
  const [openUploadCategory, setopenUploadCategory] = useState(false)
  return (
    <div>
      <div className='flex items-center justify-between p-2 bg-white shadow-md '>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={()=>setopenUploadCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Category</button>
      </div>
      {openUploadCategory&&<UploadCategory close={()=>setopenUploadCategory(false)}/>}
      
    </div>
  )
}

export default Category
