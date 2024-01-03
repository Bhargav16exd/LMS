import { useState } from 'react'
import './App.css'
import  {Route, Routes} from "react-router-dom"
import Footer from './components/Footer'
import Homepage from './Pages/Homepage'

function App() {

  return (
    <Routes>

      <Route path='/' element={<Homepage/>}></Route>

    </Routes>
  )
}

export default App
