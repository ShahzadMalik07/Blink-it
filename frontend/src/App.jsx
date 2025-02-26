
import { Outlet } from 'react-router-dom'
import './App.css'
import Headers from './components/Headers'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from "./utils/getUserDetails"
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { setAllCategory } from './store/productSlice';
import AxiosToastError from './utils/AxiosToastError';
import axios from 'axios';


function App() {
  const dispatch = useDispatch()

  const userData = async () => {
    const userDetails = await fetchUserDetails()

    dispatch(setUserDetails(userDetails?.data))
  }



  const getCategoryData = async () => {

    try {
      const response = await axios.get("http://localhost:3000/api/category/get-category")
      const { data: responseData } = response



      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))


      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    userData()
    getCategoryData()
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
