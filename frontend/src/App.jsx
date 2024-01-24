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
import CreateCourse from './Pages/CreateCourse'
import EditCourse from './Pages/EditCoursePage'
import Profile from './Pages/User/ProfilePage'
import EditProfilePage from './Pages/User/EditProfilePage'
import ChangePasswordPage from './Pages/User/ChangePasswordPage'
import ViewLecture from './Pages/Lecture/ViewLecture'
import CreateLecture from './Pages/Lecture/CreateLecture'
import EditLecture from './Pages/Lecture/EditLecturePage'
import ForgotPassword from './Pages/ForgotPassword'


function App() {

  return (
    <Routes>
      
       {/* Public Routes */}
       
      <Route path='/' element={<Homepage/>}> </Route>
      <Route path='/about' element={<Aboutus/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
      <Route path='/courses' element={<CoursePage/>}></Route>
      <Route path='/denied' element={<DeniedPage/>}></Route>
      <Route path='/courses/course-details/:courseId' element={<Courseinfo/>}></Route>
      <Route path='*' element={<Notfound/>}></Route>



      {/* Admin Routes  */}

      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
      
       <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>  
       <Route path='/course/create-course' element={<CreateCourse/>}></Route>    
       <Route path='/courses/edit-course/:courseId' element={<EditCourse/>}></Route>  
       <Route path='/course/:courseId/create-lecture' element={<CreateLecture/>}></Route>  
       <Route path='/course/:courseId/edit-lecture/:lectureId' element={<EditLecture/>}></Route>
      
      </Route>

      {/* Logged In Routes */}

      <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
      
       <Route path='/user/profile' element={<Profile/>}></Route>
       <Route path='/user/edit-profile' element={<EditProfilePage/>}></Route>  
       <Route path='/user/change-password' element={<ChangePasswordPage/>}></Route>
       <Route path='/course/:courseId/view-lecture' element={<ViewLecture/>}></Route>
  
      </Route>
      

    </Routes>
  )
}

export default App
