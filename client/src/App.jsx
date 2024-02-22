import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className="title">HOME PAGE</h1>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/products" element={<h1 className="title">PRODUCTS</h1>} />
        <Route path="/book" element={<h1 className="title">RESERVE</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;