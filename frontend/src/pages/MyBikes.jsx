import React, { useEffect, useState } from "react";
import axios from "axios";
import { methods } from "../utils/methods";



const MyBikes = ( ) => {
  const [bikes, setBikes] = useState([]);

  const ownerId  = methods.getUserByFromLS();

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
    <div>
      <h2>My Bikes</h2>
      <div className="flex flex-wrap gap-4">
      {bikes.length > 0 ? (
        bikes.map((bike) => (
          <div key={bike._id} className="shadow-md w-[300px]">
            <img src={`http://localhost:4000/${bike.imageUrl}`} alt="bike" />
            <p><strong>Title:</strong> {bike.title}</p>
            <p><strong>Description:</strong> {bike.description}</p>
            <p><strong>Price:</strong> ${bike.price}</p>
            <p><strong>CC:</strong> {bike.cc}</p>
            {/* Check if the bike is rented */}
            {bike.isRented ? (
              <div className="rented-info">
                <p><strong>Status:</strong> Rented</p>
                <p><strong>Renter ID:</strong> {bike.rentedBy}</p>
              </div>
            ) : (
              <p><strong>Status:</strong> Available</p>
            )}
          </div>
        ))
      ) : (
        <p>No bikes found!</p>
      )}
      </div>
    </div>
  );
};

export default MyBikes;
