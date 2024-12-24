import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Main from "./pages/Main"
import LogInOut from './pages/LogInOut';
import Register from "./pages/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Main/>} />
      <Route path='/enter' element={<LogInOut/>} />
      <Route path='/register' element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
