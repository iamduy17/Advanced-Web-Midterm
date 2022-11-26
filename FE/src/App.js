import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Main from "./components/Main/Main";
import Classes from "./components/Classes/Classes";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/CreateClass/Form";
import CreateClass from "./components/CreateClass/CreateClass";
import NavbarDetail from "./components/NavbarDetail/NavbarDetail";
import ClassDetail from "./pages/ClassDetail/ClassDetail";
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
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index path="" element={<Dashboard classes={classes}/>} />
        <Route index path="/:id/*" element={<ClassDetail classes={classes}/>} />
        <Route index path="/f" element={<CreateClass/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
