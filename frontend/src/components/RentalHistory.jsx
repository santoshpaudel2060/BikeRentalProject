import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RentalHistory = () => {
  const [rentalHistory, setRentalHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentalHistory = async () => {
      try {
        const response = await axios.get('http://localhost:4000/rentals/history');
        setRentalHistory(response.data); // Set rental data into state
      } catch (error) {
        console.error('Error fetching rental history', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rental History Dashboard</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border border-gray-300">Bike Name</th>
            <th className="py-2 px-4 border border-gray-300">Renter's Name</th>
            <th className="py-2 px-4 border border-gray-300">Rental Date</th>
            <th className="py-2 px-4 border border-gray-300">Return Date</th>
            <th className="py-2 px-4 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {rentalHistory.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-2 px-4 text-center border border-gray-300">No rental history available</td>
            </tr>
          ) : (
            rentalHistory.map((rental) => (
              <tr key={rental._id}>
                <td className="py-2 px-4 border border-gray-300">{rental.bike.bikeName}</td>
                <td className="py-2 px-4 border border-gray-300">{rental.renter.name}</td>
                <td className="py-2 px-4 border border-gray-300">{new Date(rental.rentalDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border border-gray-300">{rental.returnDate ? new Date(rental.returnDate).toLocaleDateString() : 'N/A'}</td>
                <td className="py-2 px-4 border border-gray-300">{rental.rentalStatus}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RentalHistory;
