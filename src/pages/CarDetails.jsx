import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/cars/${id}`);
        setCar(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCar();
  }, [id]);

  const handleRent = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/rentals`,
        {
          carId: id,
          startDate,
          endDate
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      alert('Sėkmingai išsinuomavote automobilį!');
      navigate('/rentals');
    } catch (err) {
      alert('Nepavyko išsinuomoti automobilio');
      console.error(err);
    }
  };

  if (!car) return <p className="text-center mt-20">Įkeliama...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-xl w-full">
        {car.image && (
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}

        <h2 className="text-2xl font-bold mb-2">{car.make} {car.model} ({car.year})</h2>
        <p className="text-gray-700 mb-4">{car.description}</p>
        <p className="text-gray-600 mb-6 font-medium">Kaina: €{car.pricePerDay}/diena</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Data nuo:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Data iki:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <button
            onClick={handleRent}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Išsinuomoti
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
