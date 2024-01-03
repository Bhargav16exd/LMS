import { useState } from 'react'
import './App.css'
import  {Routes} from "react-router-dom"
import Footer from './components/Footer'
import Homelayout from './Layout/Homelayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <Routes>

    // </Routes>
    <Homelayout/>
  )
}

export default App
