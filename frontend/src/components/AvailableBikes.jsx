




import { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableBikes = () => {
  const [bikes, setBikes] = useState([]);
  
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/bikes');
        setBikes(response.data);
      } catch (error) {
        console.error('Error fetching bikes:', error);
      }
    };
    fetchBikes();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Available Bikes</h2>
      <ul>
        {bikes.map((bike) => (
          <li key={bike._id}>
            <h3>{bike.title}</h3>
            <p>{bike.description}</p>
            <p>{bike.price}</p>
            <p>{bike.cc}</p>
            <p>{bike.owner}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableBikes;
