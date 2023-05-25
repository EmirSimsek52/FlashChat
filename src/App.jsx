import { useState,useContext } from 'react'
import { BrowserRouter as Router, Routes, Route,Navigate  } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Navbar from './components/Navbar';
import WelcomPage from './components/WelcomPage';
import { AuthContext } from './context/AuthContext';

function App() {
  const { currentUser } = useContext(AuthContext);


  return (
   
    <Router>
      
      <Routes>
        <Route path='/' element={<WelcomPage/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>

  )
}

export default App
