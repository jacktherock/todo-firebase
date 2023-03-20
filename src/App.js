import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
// import './App.css'
import Home from './components/Home';
import Login from './components/Login'
import NavBar from './components/NavBar'
import Signup from './components/Signup'
import { auth } from './firebase';

function App() {

  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setUser(user)
      else setUser(null)
    })

    return () => {
      unsubscribe()
    }
  }, [])


  return (
    <BrowserRouter>
      <NavBar user={user} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App