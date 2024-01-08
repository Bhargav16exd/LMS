import { useState } from 'react'
import './App.css'
import  {Route, Routes} from "react-router-dom"
import Homepage from './Pages/Homepage'
import Aboutus from './Pages/Aboutuspage'
import Notfound from './Pages/NotFoundpage'
import Signup from './Pages/SignupPage'
import Login from './Pages/Loginpage'

function App() {

  return (
    <Routes>

      <Route path='/' element={<Homepage/>}> </Route>
      <Route path='/about' element={<Aboutus/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>


      <Route path='*' element={<Notfound/>}></Route>

    </Routes>
  )
}

export default App
