import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CarCard = ({ car, showActions = false, showRent = false, onDelete }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {car.image && (
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <h3 className="text-xl font-semibold">{car.make} {car.model}</h3>
        <p>{car.year} – €{car.pricePerDay}/d.</p>
        <p>{car.description}</p>
        {car.owner?.username && (
          <p className="text-sm text-gray-500 mt-1">Savininkas: {car.owner.username}</p>
        )}

        
        {showActions && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => navigate(`/cars/edit/${car._id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Redaguoti
            </button>
            <button
              onClick={onDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Pašalinti
            </button>
          </div>
        )}

        
        {showRent && (
          <div className="mt-4">
            {user ? (
              <button
                onClick={() => navigate(`/cars/${car._id}`)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Išsinuomoti
              </button>
            ) : (
              <p className="text-blue-600 mt-2">
                <button onClick={() => navigate('/login')} className="underline">
                  Prisijunkite
                </button> kad galėtumėte nuomotis
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
