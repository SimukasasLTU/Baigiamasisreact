
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import Cars from './pages/Cars';
import CarForm from './pages/CarForm';
import CarDetails from './pages/CarDetails';
import Rentals from './pages/Rentals';
import ProtectedRoute from './components/ProtectedRoute';
import MyCars from './pages/MyCars';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/MyCars"
          element={
            <ProtectedRoute>
              <MyCars />
            </ProtectedRoute>
          }
        />

        <Route path="/cars" element={<Cars />} />

        <Route
          path="/cars/new"
          element={
            <ProtectedRoute>
              <CarForm />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/cars/edit/:id"
          element={
            <ProtectedRoute>
              <CarForm />
            </ProtectedRoute>
          }
        />

        <Route path="/cars/:id" element={<CarDetails />} />

        <Route
          path="/rentals"
          element={
            <ProtectedRoute>
              <Rentals />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
