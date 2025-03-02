import React, { useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory'
import { useSelector } from 'react-redux'
import Table from '../components/Table'

const SubCategory = () => {
  const [openSubCategory, setopenSubcategory] = useState(false)

  const subCategoryData = useSelector(store => store.product.subCategory)
  console.log(subCategoryData)


  return (
    <div>
      <div className='flex items-center justify-between p-2 bg-white shadow-md '>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={() => setopenSubcategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Category</button>
      </div>

      <div>
        <Table data={subCategoryData}/>
      </div>


      {
        openSubCategory && <UploadSubCategory close={() => setopenSubcategory(false)} />
      }

      <div className='p-3 grid grid-cols-2 lg:grid-cols-6 lg:ml-8'>
        {
          subCategoryData.map((cat) => {
            return (
              <div className='w-32 h-56 m-1 rounded shadow-md' key={cat._id}>
                <img src={cat.image} alt={cat.name} className='w-full object-scale-down' />

                <div className='flex gap-2  items-center'>
                  <button onClick={() => {
                    // seteditOpen(true)
                    // seteditData(cat)
                  }} className='flex-1 py-1 bg-green-100  text-green-600 hover:bg-green-200  rounded'>Edit</button>
                  <button onClick={() => {
                    // setdialogOpen(true)
                    // setcategoryId(cat)
                  }} className='flex-1 py-1 bg-red-100 text-red-500 hover:bg-red-200 rounded '>Delete</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SubCategory
