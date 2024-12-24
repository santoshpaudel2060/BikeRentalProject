import React, { useEffect, useState } from 'react';
import { Search, Filter, Bike, Users, DollarSign } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';


// Placeholder data for vehicles

const vehicles = [
    { id: 1, name: 'Mountain Bike', status: 'Available', type: 'Mountain' },
    { id: 2, name: 'City Cruiser', status: 'Rented', type: 'City' },
    { id: 3, name: 'Electric Bike', status: 'Maintenance', type: 'Electric' },
    { id: 4, name: 'Road Bike', status: 'Available', type: 'Road' },
    { id: 5, name: 'BMX', status: 'Rented', type: 'BMX' },
];

const AdminDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [appAnalytics, setAppAnalytics] = useState({
        totalBikes: 0,
        totalRental: 0
    })


    const handleFetchAnalytics = async () => {
        try {

            const res = await axios.get('http://localhost:4000/api/bikes/analytics')

            setAppAnalytics({
                totalBikes: res.data.totalBikes,
                totalRental: res.data.totalRental
            });

        } catch (error) {
            console.log(error)
        }
    }

    const handleFetchVehicles = async () => {
        // Fetch vehicles from the server
        try {
            const res = await axios.get(`http://localhost:4000/api/bikes?status=${statusFilter}`)
            setFilteredVehicles(res.data);
        } catch (error) {

            console.error('Error fetching vehicles:', error);

        }
    };

    useEffect(() => {
        handleFetchVehicles()
    }, [searchTerm, statusFilter])

    useEffect(() => {
        handleFetchAnalytics()
    }, [])


    const handleUpdateStatus = async (vehicleId, status) => {
        try {
            const res = await axios.put(`http://localhost:4000/api/bikes/${vehicleId}`, {
                status: status
            })
            if (res.status === 200) {
                await handleFetchVehicles()
            }
        } catch (error) {

            // 

        }
    }




    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
     

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Analytics Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analytics</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Bike className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Bikes</dt>
                                            <dd className="text-3xl font-semibold text-gray-900">{appAnalytics.totalBikes}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Users className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Active Rentals</dt>
                                            <dd className="text-3xl font-semibold text-gray-900">{appAnalytics.totalRental}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>

                {/* Vehicle List Section */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vehicle List</h2>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        {/* Filter and Search */}
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <div className="flex items-center">
                                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                                <select
                                    className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>

                                </select>
                            </div>
                            <div className="flex items-center">
                                <Search className="h-5 w-5 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search vehicles..."
                                    className="form-input rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Vehicle Table */}
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredVehicles.map((vehicle) => (
                                    <tr key={vehicle.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <img className='w-8 h-8 rounded-md object-cover' src={`http://localhost:4000${vehicle.imageUrl}`} alt="" /></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vehicle.title}</td>
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;

