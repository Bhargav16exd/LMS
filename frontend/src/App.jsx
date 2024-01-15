import './App.css'
import  {Route, Routes} from "react-router-dom"
import Homepage from './Pages/Homepage'
import Aboutus from './Pages/Aboutuspage'
import Notfound from './Pages/NotFoundpage'
import Signup from './Pages/SignupPage'
import Login from './Pages/Loginpage'
import CoursePage from './Pages/CoursePage'
import Courseinfo from './Pages/CourseInfo'
import DeniedPage from './Pages/DeniedPage'
import RequireAuth from './components/Auth/RequireAuth'
import AdminDashboard from './Pages/Admindashborad'


function App() {

  return (
    <Routes>
      
       {/* Public Routes */}
       
      <Route path='/' element={<Homepage/>}> </Route>
      <Route path='/about' element={<Aboutus/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/courses' element={<CoursePage/>}></Route>
      <Route path='/denied' element={<DeniedPage/>}></Route>
      <Route path='/courses/course-details/:courseId' element={<Courseinfo/>}></Route>
      <Route path='*' element={<Notfound/>}></Route>



      {/* Admin Routes  */}

      <Route element={<RequireAuth allowedRoles={"ADMIN"}/>}>
      
       <Route path='/Admindashboard' element={<AdminDashboard/>}></Route>      
       
      </Route>
      

    </Routes>
  )
}

export default App
