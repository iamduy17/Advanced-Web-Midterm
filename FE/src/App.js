import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Main from "./components/Main/Main";
import Classes from "./components/Classes/Classes";
function App() {
  const classData = {
    className: "abcd",
    section: "abcd",
    id: 2,    
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="" element={<Classes classData={classData}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
