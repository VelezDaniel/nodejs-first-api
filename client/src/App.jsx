import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';

import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./pages/HomePage";
import Banner from "./components/banner/banner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/banner" element={<Banner/>}/>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/products" element={<h1 className="title">PRODUCTS</h1>} />
        <Route path="/book" element={<h1 className="title">RESERVE</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;