
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Rentals = () => {
  const { user } = useContext(AuthContext);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/rentals/my', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setRentals(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRentals();
  }, [user]);

  const handleCancel = async (id) => {
    const confirm = window.confirm('Ar tikrai norite atšaukti šią nuomą?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/api/rentals/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setRentals((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert('Nepavyko atšaukti nuomos');
    }
  };

  const calcTotal = (rental) => {
    const start = new Date(rental.startDate);
    const end = new Date(rental.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;
    return days * (rental.car?.pricePerDay || 0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Mano nuomos</h2>

      {rentals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {r.car?.image && (
                <img
                  src={r.car.image}
                  alt={`${r.car.make} ${r.car.model}`}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {r.car?.make} {r.car?.model}
                  </h3>
                  <p className="text-gray-600">
                    {new Date(r.startDate).toLocaleDateString()} – {new Date(r.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-800 font-medium mt-2">
                    Bendra kaina: €{calcTotal(r)}
                  </p>
                </div>

                <button
                  onClick={() => handleCancel(r._id)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Atšaukti nuomą
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Šiuo metu neturite aktyvių nuomų.</p>
      )}
    </div>
  );
};

export default Rentals;
