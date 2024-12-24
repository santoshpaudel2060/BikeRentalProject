



import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage'; 
import AuthPage from './components/AuthPage'; 
import AvailableBikes from './components/AvailableBikes';
import Navbar from './components/Navbar';  
import Footer from './components/Footer';
import Service from './components/Service';
import Dashboard from './components/Dashboard'; 
import AddBike from "./components/AddBike"; 
import Bikes from './components/Bikes';
import ForgotPassword from './components/ForgotPasswordForm';
import BikeRentalForm from "./components/BikeRentalForm";
import RentalHistory from './components/RentalHistory';
import MyOrders from './pages/MyOrders';
import RentalHistoryItem from './components/RentalHistoryItem';
import MyBikes from './pages/MyBikes';
import AdminDashboard from './components/AdminDashboard';
const UserContext = createContext();


const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user data
    const [isLister, setIsLister] = useState(false); // Store user role

    const loginUser = (userData) => {
        setUser(userData);
    };

    const toggleRole = () => {
        setIsLister((prevRole) => !prevRole);
    };

    return (
        <UserContext.Provider value={{ user, isLister, loginUser, toggleRole }}>
            {children}
        </UserContext.Provider>
    );
};

const App = () => {
    const username = localStorage.getItem('username'); // Assume username is saved on login

    // if (!username) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <p className="text-lg text-red-500">Please log in to access your bikes.</p>
    //         </div>
    //     );
    // }
    return (
        <UserProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<AuthPage />} />   
                    <Route path="/add-bike" element={<AddBike />} />   
                    <Route path="/my-bike" element={<MyBikes />} />     
                    <Route path="/bikes" element={<Bikes />} />                              
                    <Route path="/vehicles" element={<AvailableBikes />} />
                    <Route path="/services" element={<Service />} />
                    <Route path="/dashboard" element={<Dashboard />} />  {/* Correct path for Dashboard */}
                    <Route path="/my-orders" element={<MyOrders />} />
                    <Route path="/my-bikes" element={<MyBikes username={username} />} />
                    <Route path="/rental-history" component={<RentalHistory/>} />
                    <Route path="/RentalHistoryItem" component={<RentalHistoryItem/>} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Routes>
                <Footer />
            </Router>
        </UserProvider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

export default App;
