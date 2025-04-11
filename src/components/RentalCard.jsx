import React from 'react';

const RentalCard = ({ rental }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
      <h4>{rental.car.make} {rental.car.model}</h4>
      <p>From: {rental.startDate} To: {rental.endDate}</p>
      <p>Total: €{rental.totalPrice}</p>
    </div>
  );
};

export default RentalCard;
