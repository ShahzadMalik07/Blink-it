import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='bg-white'>
      <div className='container mx-auto px-8 grid lg:grid-cols-[250px,1fr]'>
        <div className='py-4 max-h-[calc(100vh-96px)] sticky top-24 overflow-y-auto hidden  border-r lg:block'>
          <UserMenu/>

        </div>

        <div className='bg-white'>
          <Outlet/>

        </div>


      </div>

    </div>
  )
}

export default Dashboard
