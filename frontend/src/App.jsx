import React from 'react'
import {Toaster} from 'react-hot-toast'
import Signup from './components/Signup'
import Login from './components/login'
import { Routes, Route} from 'react-router-dom'
import Home from './components/Home'

const App = () => {

  return (
    <div className='h-screen text-white '> 
    <Toaster position='bottom-right'/> 
    {/* position to define where the tost should appear */}
        <Routes>

        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>

        </Routes>

    </div>
  )
}

export default App