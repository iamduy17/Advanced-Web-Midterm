import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { API_URL } from "./config";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateClass from "./components/CreateClass/CreateClass";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Email from "./pages/Email/Email";
import { useEffectOnce } from "./hooks/useEffectOnce";
function App() {
  const classes = [
    {
      className: "abcd",
      section: "abcd",
      owner: "abcde",
      id: 1,
    },
    {
      className: "abcd",
      section: "abcd",
      owner: "abcde",
      id: 2,
    },
    {
      className: "abcd",
      section: "abcd",
      owner: "abcde",
      id: 3,
    },
    {
      className: "abcd",
      section: "abcd",
      owner: "abcde",
      id: 4,
    },
  ];


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUser = async () => {
    try {
      if (localStorage.getItem("token")) {
        setIsAuthenticated(true);
      } else {

        const url = `${API_URL}auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        console.log(data);
        if (data.ReturnCode === 1) {
          setIsAuthenticated(true);
          localStorage.setItem("token", data.User.token);
          localStorage.setItem("provider", data.User.provider);
        } else {
          setIsAuthenticated(false);
          // localStorage.removeItem("token", data.User.token);    
          // localStorage.removeItem("provider", data.User.provider);         
        }
      }
    } catch (err) {
    }
  };

  useEffectOnce(() => {
    getUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/:id/*" element={<ClassDetail classes={classes} />} />
          <Route index path="/f" element={<CreateClass />} />
          <Route index path="/" element={isAuthenticated ? <Dashboard /> : <Navigate replace to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate replace to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate replace to="/" />} />
          <Route path=":id/verify/:token" element={<Email />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
