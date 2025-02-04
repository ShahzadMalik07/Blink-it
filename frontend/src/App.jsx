
import { Outlet } from 'react-router-dom'
import './App.css'
import Headers from './components/Headers'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from "./utils/getUserDetails"
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch()

  const userData = async () => {
    const userDetails = await fetchUserDetails()

    dispatch(setUserDetails(userDetails?.data))
  }


  useEffect(() => {
    userData()

  }, [])

  return (
    <>
      <Headers />
      <div className=' min-h-[75vh]'>
        <Outlet />
      </div>
      <Footer />
      <Toaster />

    </>
  )
}

export default App
