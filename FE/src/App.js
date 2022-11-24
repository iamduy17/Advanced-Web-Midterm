import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Email from "./pages/Email/Email";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Dashboard />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:id/verify/:token" element={<Email />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
