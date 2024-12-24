





import React, { useEffect, useState } from "react";
import axios from "axios";
import { methods } from "../utils/methods";

const MyBikes = () => {
  const [bikes, setBikes] = useState([]);

  const ownerId = methods.getUserByFromLS();

  useEffect(() => {
    const fetchMyBikes = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/bikes?owner=${ownerId}`
        );
        setBikes(data);
      } catch (error) {
        console.error("Failed to load bikes:", error);
      }
    };

    fetchMyBikes();
  }, [ownerId]);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        My Bikes
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {bikes.length > 0 ? (
          bikes.map((bike) => (
            <div
              key={bike._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-[320px] overflow-hidden"
            >
              <img
                src={`http://localhost:4000${bike.imageUrl}`}
                alt="bike"
                className="h-52 w-full object-contain"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {bike.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Description:</strong> {bike.description}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Price:</strong>{" "}
                  <span className="text-green-600 font-bold">${bike.price}</span>
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>CC:</strong> {bike.cc}
                </p>
                {bike.isRented ? (
                  <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded">
                    <p>
                      <strong></strong> Rented
                    </p>
                 
                  </div>
                ) : (
                  <div className="mt-2 p-2 bg-green-100 text-green-800 rounded">
                    <strong></strong> Not rented yet 
                  </div>
                )}
                
                  <div className="mt-2 p-2 bg-green-100 text-green-800 rounded">
                    <strong>{bike.status}</strong>
                  </div>
                <div>
                  </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg font-medium">
            No bikes found! 🚲
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBikes;
