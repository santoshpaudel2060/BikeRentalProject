// import React, { useState } from 'react';
// import {methods} from "../utils/methods"
// const BikeRentalForm = ({ bike, onClose }) => {



  

//   const [formData, setFormData] = useState({
//     drivingLicense: '',
//     licenseImage: "https://images.pexels.com/photos/14023379/pexels-photo-14023379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     startDate: '',
//     endDate: '',
//   });

//   const [statusMessage, setStatusMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files[0],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const loggedInUserId = methods.getUserByFromLS()

//     if(!loggedInUserId){
//       alert("Please login first")
//       return;
//     }
//     // Ensure all required fields are filled
//     if (!formData.drivingLicense || !formData.licenseImage || !formData.startDate || !formData.endDate) {
//       alert('Please fill all required fields!');
//       return;
//     }



    

//     const payload ={
//       ...formData,
//       user:loggedInUserId,
//       bike:bike._id,
//       licenseImage:"https://images.pexels.com/photos/14023379/pexels-photo-14023379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     }





//     console.log(bike  )







  

//     try {
//       const response = await fetch('http://localhost:4000/api/bookings/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json', // Specify that the payload is JSON
//         },
//         body: JSON.stringify(payload), // Stringify the payload
//       });
//       if (response.ok) {
//         setStatusMessage('Rental request submitted successfully!');
//         setFormData({
//           drivingLicense: '',
//           licenseImage: "",
//           startDate: '',
//           endDate: '',
//         });
//         onClose(); // Close the form
//       } else {
//         setStatusMessage('Failed to submit rental. Please try again.');
//       }
//     } catch (error) {
//       setStatusMessage('Network error or server unavailable. Please try again later.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
//         <h2 className="text-xl font-bold mb-4">Bike Rental Form</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Driving License Number:</label>
//             <input
//               type="text"
//               name="drivingLicense"
//               value={formData.drivingLicense}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded mt-2"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Upload Driving License Image:</label>
//             <input
//               type="file"
//               name="licenseImage"
//               accept="image/*"
//               onChange={handleFileChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded mt-2"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Start Date:</label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded mt-2"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">End Date:</label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded mt-2"
//             />
//           </div>
//           <div className="mt-4 flex justify-between">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//               onClick={()=> onclick("Rented Successfully")}
//             >
//               Rent Now
//             </button>
//           </div>
//         </form>
//         {statusMessage && (
//           <div className="mt-4 p-4 bg-blue-200 text-blue-800 rounded-md">
//             <p>{statusMessage}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BikeRentalForm;

















import React, { useState } from 'react';
import { methods } from "../utils/methods";

const BikeRentalForm = ({ bike, onClose }) => {
  const [formData, setFormData] = useState({
    drivingLicense: '',
    licenseImage: '',
    startDate: '',
    endDate: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

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
    if (!formData.drivingLicense || !formData.licenseImage || !formData.startDate || !formData.endDate) {
      alert('Please fill all required fields!');
      return;
    }

    const payload = {
      ...formData,
      user: loggedInUserId,
      bike: bike._id,
    };

    try {
      const response = await fetch('http://localhost:4000/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatusMessage('Rental request submitted successfully!');
        setFormData({
          drivingLicense: '',
          licenseImage: '',
          startDate: '',
          endDate: '',
        });
        onClose(); // Close the form
      } else {
        const errorData = await response.json();
        setStatusMessage(`Failed to submit rental. Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatusMessage('Network error or server unavailable. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Bike Rental Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
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
          </div>

          {/* <div>
            <label className="block text-gray-700">Upload Driving License Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full p-2 mt-2"
            />
          </div> */}



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
