import React from 'react'
import noDataImage from "../assets/nothing here yet.webp"
const NoData = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-2 p-6'>
            <img src={noDataImage} className='w-48' alt="No Data Found" />
            <p>No Data Found</p>
        </div>
    )
}

export default NoData
