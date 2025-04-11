import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CarForm = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    pricePerDay: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/cars/${id}`).then(res => {
        const { make, model, year, pricePerDay, description, image } = res.data;
        setFormData({ make, model, year, pricePerDay, description, image });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/cars/${id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        alert('Automobilis atnaujintas');
      } else {
        await axios.post('http://localhost:3000/api/cars', formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        alert('Automobilis sukurtas');
      }
      navigate('/MyCars');
    } catch (err) {
      alert('Veiksmas nepavyko');
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-6"
    >
      <h2 className="text-2xl font-bold">{id ? 'Redaguoti automobilį' : 'Pridėti naują automobilį'}</h2>

      <input
        name="make"
        placeholder="Markė"
        value={formData.make}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        name="model"
        placeholder="Modelis"
        value={formData.model}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        name="year"
        placeholder="Metai"
        type="number"
        value={formData.year}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        name="pricePerDay"
        placeholder="Kaina €/d."
        type="number"
        value={formData.pricePerDay}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        name="description"
        placeholder="Aprašymas"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full"
      />
      {formData.image && (
        <img src={formData.image} alt="Peržiūra" className="w-full h-48 object-cover rounded-md" />
      )}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
      >
        {id ? 'Atnaujinti' : 'Sukurti'}
      </button>
    </form>
  );
};

export default CarForm;
