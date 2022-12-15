import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
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
import Footer from "./components/Footer/Footer";
import Presentations from "./pages/Presentations/Presentations";
import PresentationDetail from "./pages/PresentationDetail/PresentationDetail";
import SlideDetail from "./components/SlideDetail/SlideDetail";
import SlideMember from "./pages/SlideMember/SlideMember";
import { Context } from "./pages/PresentationDetail/PresentationDetail";
import SlideShow from "./pages/SlideShow/SlideShow";
import ThanksForVoting from "./pages/ThanksForVoting/ThanksForVoting";
import { SocketContext, socket } from './context/socket';

function Layout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}

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
      setClasses(res.data.Groups);
    }
    loadGroups();
  }, [])

  const isAuthenticated = localStorage.getItem("token") ? true : false;

  return (
    <>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index path="/:id/*" element={isAuthenticated ? <ClassDetail /> : <Navigate replace to="/login" />} />
              <Route index path="/" element={isAuthenticated ? <Dashboard classes={classes} /> : <Navigate replace to="/login" />} />
              <Route path="/profile/:name" element={isAuthenticated ? <Profile /> : <Navigate replace to="/" />} />
              <Route path="/presentation" element={isAuthenticated ? <Presentations /> : <Navigate replace to="/" />} />
              <Route path="/presentation/:id/slide/:id_slide" element={isAuthenticated ? <PresentationDetail /> : <Navigate replace to="/" />} />
              <Route path="/presentation/:id/slide/:id_slide/slideshow" element={isAuthenticated ? <SlideShow /> : <Navigate replace to="/" />} />
              <Route path="/presentation/:id/slide/:id_slide/slideshow/member" element={<SlideMember />} />
            </Route>

            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate replace to="/" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate replace to="/" />} />
            <Route path=":id/verify/:token" element={<Email />} />
            <Route path="/ThanksForVoting" element={<ThanksForVoting />} />


          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </>
  );
}

export default App;
