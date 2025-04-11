import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await axios.post('http://localhost:3000/api/register', formData);

      
      const res = await axios.post('http://localhost:3000/api/login', {
        email: formData.email,
        password: formData.password
      });

      login(res.data); 
      navigate('/'); 
    } catch (err) {
      alert('Registracija nepavyko');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl px-12 py-16 w-full max-w-lg space-y-10"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Registracija</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-3 text-lg"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-3 text-lg"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-3 text-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-lg font-medium"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600">
          Esate užsiregistravęs?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Prisijunkite
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
