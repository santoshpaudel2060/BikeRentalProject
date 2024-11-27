

import { useEffect, useState } from 'react';
import axios from 'axios';
import BikeRentalForm from './BikeRentalForm'; 

const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/bikes');
        setBikes(response.data);
      } catch (error) {
        console.error('Error fetching bikes:', error);
        setError('Failed to load bikes. Please try again later.');
      } finally {
        setLoading(false); 
      }
    };

    fetchBikes();
  }, []);
  if (loading) {
    return <div className="text-center text-gray-700">Loading bikes...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  const handleRentNowClick = (bike) => {
    setSelectedBike(bike)
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setSelectedBike(null); 
  };

 
  const filteredBikes = bikes.filter((bike) => 
    bike.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bike.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Bikes</h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search bikes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-l-lg w-full md:w-1/2"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
            onClick={() => setSearchTerm(searchTerm)} 
          >
            Search
          </button>
        </div>

        {/* Render bikes here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBikes.length === 0 ? (
            <p className="text-center text-gray-700">No bikes found</p>
          ) : (
            filteredBikes.map((bike) => (
              <div
                key={bike._id}
                className="bg-white p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-gray-700">{bike.title}</h3>
                <p className="text-gray-600 mt-2">{bike.description}</p>
                <p className="text-gray-700 mt-2">Price: Rs {bike.price}</p>
                <p className="text-gray-700">CC: {bike.cc}</p>
                <p className="text-gray-700">Owner: {bike.owner}</p>

                {bike.imageUrl ? (
                  <div className="mt-4">
                    <img
                      src={`http://localhost:4000/${bike.imageUrl.replace('\\', '/')}`}
                      alt={bike.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="mt-4 text-center text-gray-500">No image available</div>
                )}

                {/* Rent Now button */}
                <div className="mt-4">
                  <button
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={() => handleRentNowClick(bike)}
                  >
                    Rent
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Conditionally render BikeRentalForm modal */}
        {isModalOpen && (
          <BikeRentalForm
            bike={selectedBike}
            onClose={handleCloseModal} 
          />
        )}
      </div>
    </div>
  );
};

export default Bikes;