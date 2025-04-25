import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import SignUp from './Components/SignUp'
import LogIn from './Components/LogIn'
import TaskHandle from './Components/TaskHandle'
import Dashboard from './Components/Dashboard'
import UserDash from './Components/UserDash'
import TaskDash from './Components/TaskDash'
import OtpMatch from './Components/OtpMatch'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<SignUp/>}/>
      <Route path='/login' element ={<LogIn/>}/>
      <Route path='/task' element ={<TaskHandle/>}/>
      <Route path='/dash' element ={<Dashboard/>}/>
      <Route path='/user-dash' element ={<UserDash/>}/>
      <Route path='/task-dash' element ={<TaskDash/>}/>
      <Route path='/otp' element ={<OtpMatch/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
