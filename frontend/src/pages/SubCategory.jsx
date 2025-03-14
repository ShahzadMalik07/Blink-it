import React, { useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory'
import { useSelector } from 'react-redux'
import Table from '../components/Table'
import { createColumnHelper } from "@tanstack/react-table"
import ImageView from '../components/ImageView'



const SubCategory = () => {
  const [openSubCategory, setopenSubcategory] = useState(false)

  const subCategoryData = useSelector(store => store.product.subCategory)
  const columnHelper = createColumnHelper()
  const [ImageUrl, setImageUrl] = useState("")

  console.log(subCategoryData)
  const column = [
    columnHelper.accessor("name", {
      header: "Name"
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {

        return <img src={row.original.image} alt={row.original.name} className='w-8 h-8' onClick={()=>{setImageUrl(row.original.image)}} />
      }
    }),
    columnHelper.accessor("category", {
      header: "Category"
    })
  ]
  return (
    <div>
      <div className='flex items-center justify-between p-2 bg-white shadow-md '>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={() => setopenSubcategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Category</button>
      </div>

      <div>
        <Table data={subCategoryData} columns={column} />
      </div>


      {
        openSubCategory && <UploadSubCategory close={() => setopenSubcategory(false)} />
      }
      {
        <ImageView url={ImageUrl} close={()=>setImageUrl("")} />
      }

    </div>
  )
}

export default SubCategory
