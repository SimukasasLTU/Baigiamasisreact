import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import CarCard from '../components/CarCard';
import { useNavigate } from 'react-router-dom';

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCars = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/cars/my', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setCars(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyCars();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Ar tikrai norite pašalinti šį automobilį?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setCars((prev) => prev.filter((car) => car._id !== id));
    } catch (err) {
      alert('Nepavyko pašalinti automobilio');
    }
  };

  const filteredCars = cars.filter((car) =>
    `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Mano automobiliai</h2>

      <div className="flex items-center justify-between flex-wrap mb-6 gap-4">
        <button
          onClick={() => navigate('/cars/new')}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
        >
          + Pridėti naują automobilį
        </button>

        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Ieškoti savo automobilio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md border border-gray-300 px-4 py-2 rounded"
          />
        </div>
      </div>

      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
              showActions
              onDelete={() => handleDelete(car._id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Neturite įkeltų automobilių arba jų nėra pagal paiešką.</p>
      )}
    </div>
  );
};

export default MyCars;
