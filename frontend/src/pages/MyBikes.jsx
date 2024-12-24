import { useEffect, useState } from "react";
import axios from "axios";
import { methods } from "../utils/methods";
import { useNavigate } from "react-router-dom";

const MyBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [editingBikeId, setEditingBikeId] = useState(null); // Track the bike being edited
  const [updatedBike, setUpdatedBike] = useState({}); // Store the updated bike details
  const ownerId = methods.getUserByFromLS();
  const navigate = useNavigate();
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
  useEffect(() => {
    fetchMyBikes();
  }, [ownerId]);

  const handleDeleteVehicle = async (bikeId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/bikes/${bikeId}`
      );

      if (res.status === 200) {
        setBikes(bikes.filter((bike) => bike._id !== bikeId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBike = (bike) => {
    setEditingBikeId(bike._id); // Set the bike as being edited
    setUpdatedBike({
      title: bike.title,
      description: bike.description,
      price: bike.price,
      cc: bike.cc,
    });
  };

  const handleUpdate = async (bikeId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/bikes/${bikeId}`,
        updatedBike
      );
      if (res.status === 200) {
        // setBikes(bikes.map((bike) => (bike._id === bikeId ? res.data : bike)));
        setEditingBikeId(null); // Exit edit mode
        fetchMyBikes();
      }
    } catch (error) {
      console.error("Failed to update bike:", error);
    }
  };

  const bgColorMap = {
    rejected: "bg-red-300",
    approved: "bg-green-300",
    pending: "bg-yellow-300",
  };

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
                {editingBikeId === bike._id ? (
                  <div>
                    {/* Edit mode */}
                    <input
                      type="text"
                      value={updatedBike.title}
                      onChange={(e) =>
                        setUpdatedBike({
                          ...updatedBike,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <textarea
                      value={updatedBike.description}
                      onChange={(e) =>
                        setUpdatedBike({
                          ...updatedBike,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                      rows="3"
                    />
                    <input
                      type="number"
                      value={updatedBike.price}
                      onChange={(e) =>
                        setUpdatedBike({
                          ...updatedBike,
                          price: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      value={updatedBike.cc}
                      onChange={(e) =>
                        setUpdatedBike({ ...updatedBike, cc: e.target.value })
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2"
                      onClick={() => handleUpdate(bike._id)}
                    >
                      UPDATE
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* View mode */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {bike.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      <strong>Description:</strong> {bike.description}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>Price:</strong>{" "}
                      <span className="font-bold">${bike.price}</span>
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>CC:</strong> {bike.cc}
                    </p>

                    {bike.isRented ? (
                      <div className="mt-2 p-2 bg-green-100 rounded">
                        <p>
                          <strong className="uppercase">Rented</strong>
                        </p>
                      </div>
                    ) : (
                      <div className="mt-2 p-2 bg-yellow-100 rounded">
                        <strong className="uppercase">Not rented yet</strong>
                      </div>
                    )}

                    <div
                      className={`mt-2 p-2 ${bgColorMap[bike.status]} rounded`}
                    >
                      <p className="uppercase">{bike.status}</p>
                    </div>
                    {bike.rejectionReason && bike.status === "rejected" ? (
                      <div>
                        <b className="text-red-600">Rejection Reason: </b>
                        <p className="text-red-600">{bike.rejectionReason}</p>
                      </div>
                    ) : null}

                    <div className="my-6 flex gap-x-4">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                        onClick={() => handleDeleteVehicle(bike._id)}
                      >
                        DELETE
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                        onClick={() => handleEditBike(bike)}
                      >
                        EDIT
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-y-4 items-center">
            <p className="text-gray-500 text-2xl font-medium">
              No bikes found! 🚲
            </p>

            <button
              onClick={() => navigate("/add-bike")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-3 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
            >
              UPLOAD BIKES
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBikes;
