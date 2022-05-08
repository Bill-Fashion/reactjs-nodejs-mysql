import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" >
          <Route path=':userId' element={<Profile />} />
        </Route>
      </Routes>
    </>


  )
}

export default App