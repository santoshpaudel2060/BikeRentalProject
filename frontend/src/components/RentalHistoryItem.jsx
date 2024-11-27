import React from 'react';

const RentalHistoryItem = ({ rental }) => {
  return (
    // <div className="rental-item">
    //   <h3>{rental.bikeName}</h3>
    //   <p>Rented by: {rental.renterName}</p>
    //   <p>Rented on: {new Date(rental.rentDate).toLocaleDateString()}</p>
    //   <p>Status: {rental.status}</p>
    // </div>

    
<div className="rental-item bg-white p-4 rounded shadow-md">
  <h3 className="text-xl font-semibold text-gray-800">Bike Name : {rental.bike.title}</h3>
  {/* <p className="text-gray-600">Rented by: {rental.renterName}</p> */}
  <p className="text-gray-600">Status: {rental.status}</p>
  <p className="text-gray-600"> From: {new Date(rental.startDate).toLocaleDateString()}</p>
  <p className="text-gray-600">To: {new Date(rental.endDate).toLocaleDateString()}</p>
  <p className="text-gray-600">Rented On: {new Date(rental.createdAt).toLocaleDateString()}</p>
</div>



  );
};

export default RentalHistoryItem;
