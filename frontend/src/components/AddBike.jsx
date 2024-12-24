import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { methods } from "../utils/methods";
const AddBike = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cc, setCc] = useState("");
  const [owner, setOwner] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleAddBike = async (e) => {
    e.preventDefault();
    // remember this line to get the user id please
    const loggedInUserId = methods.getUserByFromLS();
    const bikeData = new FormData();
    bikeData.append("title", title);
    bikeData.append("description", description);
    bikeData.append("price", price);
    bikeData.append("cc", cc);
    bikeData.append("owner", loggedInUserId);
    bikeData.append("address", address);
    bikeData.append("contact", contact);

    if (image) {
      bikeData.append("image", image);
    }

    if (!title || !description || !price || !cc || !owner) {
      setError("Please fill all fields.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/bikes",
        bikeData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Bike added successfully:", response.data);

      setTitle("");
      setDescription("");
      setPrice("");
      setCc("");
      setOwner("");
      setImage(null);

      navigate("/bikes");
    } catch (error) {
      setError("Error adding bike. Please try again.");
      console.error("Error adding bike:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add a New Bike
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form
          onSubmit={handleAddBike}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Contact
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              required
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* CC Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">CC</label>
            <input
              type="number"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Owner Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Owner
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Image Upload Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            {loading ? "Adding Bike..." : "Add Bike"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBike;
