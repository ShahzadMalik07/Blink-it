
import { Outlet } from 'react-router-dom'
import './App.css'
import Headers from './components/Headers'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';


function App() {


  return (
    <>
      <Headers />
      <div className=' min-h-[75vh]'>
        <Outlet />
      </div>
      <Footer />
      <Toaster/>

    </>
  )
}

export default App
