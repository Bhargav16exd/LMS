import { useState } from 'react'
import './App.css'
import  {Route, Routes} from "react-router-dom"
import Homepage from './Pages/Homepage'
import Aboutus from './Pages/Aboutuspage'

function App() {

  return (
    <Routes>

      <Route path='/' element={<Homepage/>}> </Route>
      <Route path='/about' element={<Aboutus/>}></Route>

    </Routes>
  )
}

export default App
