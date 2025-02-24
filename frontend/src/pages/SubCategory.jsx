import React, { useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory'

const SubCategory = () => {
  const [openSubCategory, setopenSubcategory] = useState(false)
  return (
    <div>
      <div className='flex items-center justify-between p-2 bg-white shadow-md '>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={()=>setopenSubcategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Category</button>
      </div>

      {
        openSubCategory && <UploadSubCategory close={()=>setopenSubcategory(false)}/>
      }
    </div>
  )
}

export default SubCategory
