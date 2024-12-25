

import React, { useState } from "react";
import { methods } from "../utils/methods";

const BikeRentalForm = ({ bike, onClose }) => {
  const [formData, setFormData] = useState({
    drivingLicense: "",
    licenseImage: "",
    startDate: "",
    endDate: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          licenseImage: reader.result, // Convert the image to a base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedInUserId = methods.getUserByFromLS();

    if (!loggedInUserId) {
      alert("Please login first");
      return;
    }

    // Ensure all required fields are filled
    if (
      !formData.drivingLicense ||
      !formData.licenseImage ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert("Please fill all required fields!");
      return;
    }

    const payload = {
      ...formData,
      user: loggedInUserId,
      bike: bike._id,
    };

    try {
      const response = await fetch("http://localhost:4000/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatusMessage("Rental request submitted successfully!");
        setFormData({
          drivingLicense: "",
          licenseImage: "",
          startDate: "",
          endDate: "",
        });
        onClose(); // Close the form
      } else {
        const errorData = await response.json();
        setStatusMessage(
          `Failed to submit rental. Error: ${errorData.message}`
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatusMessage(
        "Network error or server unavailable. Please try again later."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Bike Rental Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div>
            <label className="block text-gray-700">Driving License Number:</label>
            <input
              type="text"
              name="drivingLicense"
              placeholder="Enter your driving license number"
              value={formData.drivingLicense}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div> */}

<div>
  <label className="block text-gray-700">Driving License Number:</label>
  <input
    type="text"
    name="drivingLicense"
    placeholder="Enter your driving license number"
    value={formData.drivingLicense}
    onChange={handleChange}
    required
    pattern="^[0-9]{2}-[0-9]{2}-[0-9]{6}$"
    title="License format: XX-YY-XXXXXX (e.g., 01-22-123456)"
    className="w-full p-2 border border-gray-300 rounded mt-2"
  />
  <small className="text-gray-500 mt-1">Format: XX-YY-XXXXXX (e.g., 01-22-123456)</small>
</div>


          <div>
            <label className="block text-gray-700">Upload Driving License Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full p-2 mt-2"
            />
            {/* Show preview of the uploaded image */}
            {formData.licenseImage && (
              <div className="mt-4">
                <p className="text-gray-700 font-medium mt-2">License Image Preview</p>
                <img
                  src={formData.licenseImage}
                  alt="License Preview"
                  className="mt-2 rounded max-w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={today} // Restrict start date to today or later
              required
              className="w-full p-2 mt-2"
            />
          </div>

          <div>
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate || today} // Restrict end date to start date or later
              max={
                formData.startDate
                  ? new Date(
                      new Date(formData.startDate).setMonth(
                        new Date(formData.startDate).getMonth() + 1
                      )
                    )
                      .toISOString()
                      .split("T")[0]
                  : ""
              } // Restrict end date to one month from the start date
              required
              className="w-full p-2 mt-2"
            />
          </div>

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Rent Now
            </button>
          </div>
        </form>

        {statusMessage && (
          <div className="mt-4 p-4 bg-blue-200 text-blue-800 rounded-md">
            <p>{statusMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BikeRentalForm;
