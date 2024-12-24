import axios from "axios";
import { useState } from "react";

const AdminVehicleListRow = ({ vehicle, handleFetchVehicles }) => {
  const [vehicleStatus, setVehicleStatus] = useState(vehicle.status);
  const [rejectionReason, setRejectionReason] = useState("");

  const updateVehicleRejectionReason = async (rejectionReason) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/bikes/${vehicle._id}`,
        {
          rejectionReason: rejectionReason,
        }
      );
      if (res.status === 200) {
        await handleFetchVehicles();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (vehicleId, status) => {
    setVehicleStatus(status);
    try {
      const res = await axios.put(
        `http://localhost:4000/api/bikes/${vehicleId}`,
        {
          status: status,
        }
      );
      if (res.status === 200) {
        await handleFetchVehicles();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectionReasonChange = (e) => {
    setRejectionReason(e.target.value);
    updateVehicleRejectionReason(e.target.value);
  };
  return (
    <tr key={vehicle.id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <img
          className="w-8 h-8 rounded-md object-cover"
          src={`http://localhost:4000${vehicle.imageUrl}`}
          alt=""
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {vehicle.title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                                                vehicle.status === 'Rented' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {vehicle.status}
                                            </span> */}
        <select
          className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={vehicle.status}
          onChange={(e) => handleUpdateStatus(vehicle._id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </td>
      <td>
        {vehicleStatus === "rejected" ? (
          <input
            type="text"
            onChange={handleRejectionReasonChange}
            placeholder="rejection reason"
            value={rejectionReason}
          />
        ) : (
          "-"
        )}
      </td>
    </tr>
  );
};

export default AdminVehicleListRow;
