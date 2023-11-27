import React from 'react';
import './App.css';
import Login from './Component/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './Component/Register';
import Dashboard from './Component/Dashboard';
import SelectedHotel from './Component/SelectedHotel';

import AdminDashboard from './Component/Admin-Panel/AdminDashboard'
import Hotels from './Component/Admin-Panel/Hotels';
import SearchResult from './Component/SearchResult';
function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/hotel/:productId" element={<SelectedHotel/>} />
          <Route path="/search-results" element={<SearchResult/>} />
      {/* Admin route */}
      <Route path='/admin-dashboard' element={<AdminDashboard/>} />
      <Route path='/admin-dashboard/add-hotels' element={<Hotels/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
