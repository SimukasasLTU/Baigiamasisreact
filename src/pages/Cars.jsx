import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/cars');
        setCars(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCars();
  }, []);

  const filtered = cars.filter((car) =>
    `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Visi automobiliai</h2>

      <input
        type="text"
        placeholder="Ieškoti automobilio..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md border border-gray-300 px-4 py-2 mb-6 rounded"
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car) => (
            <CarCard key={car._id} car={car} showRent />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Automobilių nerasta.</p>
      )}
    </div>
  );
};

export default Cars;
