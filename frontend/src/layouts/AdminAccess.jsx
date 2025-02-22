import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/Admin'

function AdminAccess({children}) {
    const user = useSelector(sotre => sotre.user)

  return (
    <div>
      {
        isAdmin(user.role)? children : <p className='bg-red-300 p-4 text-xl'>Sorry You Dont Have An Access.</p>
      }
    </div>
  )
}

export default AdminAccess
