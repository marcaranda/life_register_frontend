import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Main from "./pages/Main"
import LogInOut from './pages/LogInOut';
import Register from "./pages/Register"

import { CalendarProvider } from "./components/Calendar/CalendarContext";

function App() {
  return (
    <CalendarProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/enter' element={<LogInOut/>} />
        <Route path='/register' element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </CalendarProvider>
  );
}

export default App;
