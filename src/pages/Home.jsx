import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/cars');
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setCars(shuffled.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Sveiki atvykę į automobilių nuomos puslapį 🚗
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} showRent />
        ))}
      </div>
    </div>
  );
};

export default Home;
