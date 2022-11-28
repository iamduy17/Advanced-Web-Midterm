import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateClass from "./components/CreateClass/CreateClass";
import NavbarDetail from "./components/NavbarDetail/NavbarDetail";
import ClassDetail from "./pages/ClassDetail/ClassDetail";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Email from "./pages/Email/Email";
import { useEffectOnce } from "./hooks/useEffectOnce";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import axios from 'axios';
import { API_URL } from "./config/index"
function App() {
  const [classes, setClasses] = useState([])
  useEffect(() => {
    const token = localStorage.getItem("token");
    async function loadGroups() {
      const res = await axios.get(API_URL + 'groups', {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });
      console.log(res.data.Groups);
      setClasses(res.data.Groups);
    }
    loadGroups();
  }, [])


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffectOnce(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/:id/*" element={<ClassDetail classes={classes} />} />
          <Route index path="/f" element={<CreateClass />} />
          <Route index path="/" element={isAuthenticated ? <Dashboard classes={classes} /> : <Navigate replace to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate replace to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate replace to="/" />} />
          <Route path=":id/verify/:token" element={<Email />} />
          <Route path="/profile/:id_user" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
