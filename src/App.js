import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Main from "./pages/Main"
import LogInOut from './pages/LogInOut';
import Register from "./pages/Register"
import SearchFriends from "./pages/Social/SearchFriends"
import Friends from './pages/Social/Friends';

import { CalendarProvider } from "./components/Calendar/CalendarContext";

function App() {
  return (
    <CalendarProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/enter' element={<LogInOut/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/searchFriends' element={<SearchFriends/>} />
        <Route path='/friends' element={<Friends/>} />
        </Routes>
      </BrowserRouter>
    </CalendarProvider>
  );
}

export default App;
