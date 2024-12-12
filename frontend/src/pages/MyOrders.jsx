
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch the userId from localStorage
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     // Make sure userId exists before fetching the orders
//     if (!userId) {
//       setError("User not logged in.");
//       setLoading(false);
//       return; // Early return if userId doesn't exist
//     }

//     const fetchOrders = async () => {
//       try {
//         // Send userId in the API request
//         const response = await axios.get(
//           `http://localhost:4000/api/bookings/mybookings?userId=${userId}`
//         );
//         setOrders(response.data.data);
//       } catch (err) {
//         setError("Failed to fetch orders.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [userId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">My Orders</h1>
//       {orders.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <div>
//           {orders.map((order) => (
//             <div key={order._id} className="border p-4 mb-4 rounded-md shadow-lg">
//               <h2 className="text-xl font-semibold">Booking ID: {order._id}</h2>
//               <div className="flex flex-col">
//                 <p>
//                   <strong>Bike:</strong> {order.bikeDetails.title} - {order.bikeDetails.model}
//                 </p>
//                 <p>
//                   <strong>CC:</strong> {order.bikeDetails.cc}
//                 </p>
//               </div>
//               <p>
//                 <strong>Status:</strong> {order.status}
//               </p>
//               <p>
//                 <strong>Start Date:</strong> {new Date(order.startDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>End Date:</strong> {new Date(order.endDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>License:</strong> <a href={order.licenseImage} target="_blank" rel="noopener noreferrer">View License Image</a>
//               </p>
             
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;















import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/bookings/mybookings?userId=${userId}`
      );
      setOrders(response.data.data);
    } catch (err) {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }
    fetchOrders();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading message or spinner until data is fetched
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4 rounded-md shadow-lg">
            <h2><strong>Booking ID:</strong> {order._id}</h2>
            <p><strong>Bike:</strong> {order.bikeDetails.title} - {order.bikeDetails.model}</p>
            <p><strong>CC:</strong> {order.bikeDetails.cc}</p>
            <p><strong>Status:</strong> {order.status}</p>

            <p>
              <strong>Start Date:</strong> {new Date(order.startDate).toLocaleDateString()}
            </p>
            <p>
              <strong>End Date:</strong> {new Date(order.endDate).toLocaleDateString()}
            </p>

            {/* View License Image */}
            {order.licenseImage ? (
              // <p>
              //   <strong>License:</strong>
              //   <p
              //     // href={order.licenseImage}
              //     // target="_blank"
              //     onClick={()=>{
              //       window.open(order.licenseImage,"")
              //     }}
                 
              //     className="ml-2 text-blue-500"
              //   >
              //    {/* <img src={order.licenseImage} alt="" className='w-16 h-16 object-cover'/> */}
              //    licenseImage
              //   </p>
                
              // </p>
              <p>
  <strong>License:</strong>
  <span
    onClick={() => {
      const imageWindow = window.open();
      imageWindow.document.write(
        `<img src="${order.licenseImage}" alt="License Image" style="max-width: 100%; max-height: 100%;"/>`
      );
      imageWindow.document.close();
    }}
    className="ml-2 text-blue-500 cursor-pointer"
    style={{ textDecoration: 'underline' }}
  >
    View License
  </span>
</p>

            ) : (
              <p>Loading license...</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
