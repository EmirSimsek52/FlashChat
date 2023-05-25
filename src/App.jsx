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
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/welcome" />;
    }

    return children
  };

  return (
   
    <Router>
      
      <Routes>
        <Route path='/welcome' element={<WelcomPage/>} />
        <Route
            index
            element={
              <ProtectedRoute>
                <WelcomPage />
              </ProtectedRoute>
            }
          />
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>

  )
}

export default App
