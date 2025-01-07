
import { Outlet } from 'react-router-dom'
import './App.css'
import Headers from './components/Headers'
import Footer from './components/Footer'


function App() {


  return (
    <>
      <Headers />
      <div className=' min-h-[75vh]'>
        <Outlet />
      </div>
      <Footer />

    </>
  )
}

export default App
