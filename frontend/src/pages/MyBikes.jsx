// import React, { useEffect, useState } from 'react';

// const Dashboard = () => {
//   const [rentals, setRentals] = useState([]);

//   useEffect(() => {
//     const fetchRentals = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/api/rentals');
//         const data = await response.json();
//         setRentals(data);
//       } catch (error) {
//         console.error('Error fetching rental history:', error);
//       }
//     };
//     fetchRentals();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Rental History</h1>
//       {rentals.length > 0 ? (
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 border">Name</th>
//               <th className="py-2 px-4 border">Bike ID</th>
//               <th className="py-2 px-4 border">Owner ID</th>
//               <th className="py-2 px-4 border">Rental Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rentals.map((rental) => (
//               <tr key={rental._id} className="border-t">
//                 <td className="py-2 px-4">{rental.name}</td>
//                 <td className="py-2 px-4">{rental.bikeId}</td>
//                 <td className="py-2 px-4">{rental.bikeOwnerId}</td>
//                 <td className="py-2 px-4">{new Date(rental.rentalDate).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No rentals found.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;









import React, { useEffect, useState } from 'react';
import { methods } from '../utils/methods';
import RentalHistoryItem from '../components/RentalHistoryItem';

const MyBikes = () => {
  const [rentalHistory, setRentalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rental history from the backend API
  useEffect(() => {

    const userId = methods.getUserByFromLS();
    console.log("user id",userId)
    if(!userId) return;
  
    fetch(`http://localhost:4000/api/bookings/mybookings?ownerId=${userId}`)  // Replace with the actual endpoint to fetch rental history
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch rental history');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.data)
        if (Array.isArray(data.data)) {
          setRentalHistory(data.data);
        } else {
          setRentalHistory([]);  // Fallback if data is not an array
        }
      })
      .catch((err) => {
        setError('Error fetching rental history: ' + err.message);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="dashboard-container max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Bikes </h2>
      {rentalHistory.length === 0 ? (
        <p className="mt-4 text-gray-500">No rental history available</p>
      ) : (
        <div className="rental-history mt-4 space-y-4">
          {rentalHistory.map((rental) => (
            <RentalHistoryItem key={rental.id} rental={rental} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBikes;
