import React from 'react';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createContext, useState } from 'react';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Attendance from './Attendance';
import Mark from './components/Mark/Mark';
export const usercontext = createContext(null);
function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Home />}></Route>
            <Route path={'/login'} element={<Login/>}></Route>
            <Route path={'/register'} element={<Register/>}></Route>
            <Route path='/admin/addRoom' element={<Attendance/>}></Route>
            <Route path={'/markAttendance'} element={<Mark/>}></Route>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
