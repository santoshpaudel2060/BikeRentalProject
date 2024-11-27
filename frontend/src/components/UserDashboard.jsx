






// components/UserDashboard.jsx
import React from 'react';
import { useUser } from '../App'; // Import the custom hook
import axios from 'axios';

const UserDashboard = ({ userId }) => {
    const { isLister, toggleRole } = useUser(); // Access the context

    const handleRoleToggle = async () => {
        const newRole = !isLister; // Determine the new role
        try {
            await axios.post('http://localhost:4000/api/auth/updateRole', { userId, isLister: newRole });
            toggleRole(); // Update the role in context
        } catch (error) {
            console.error("Failed to update role:", error); // Handle error
        }
    };

    return (
        <div>
            <button onClick={handleRoleToggle}>
                Switch to {isLister ? "Renter" : "Lister"}
            </button>
            {isLister ? <ListerComponent /> : <RenterComponent />}
        </div>
    );
};

// Placeholder components
const ListerComponent = () => <div>Listing Bikes...</div>;
const RenterComponent = () => <div>Renting Bikes...</div>;

export default UserDashboard;
