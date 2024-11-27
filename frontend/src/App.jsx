
// // App.jsx
// import React, { createContext, useContext, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LandingPage from './components/LandingPage'; 
// import AuthPage from './components/AuthPage'; 
// import AvailableBikes from './components/AvailableBikes';
// import Navbar from './components/Navbar';  
// import Footer from './components/Footer';
// import Service from './components/Service';
// import Dashboard from './components/Dashboard';
// import AddBike from "./components/AddBike"; 
// import Bikes from './components/Bikes';
// import ForgotPassword from './components/ForgotPasswordForm';
// import BikeRentalForm from "./components/BikeRentalForm";





// const UserContext = createContext();

// const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null); // Store user data
//     const [isLister, setIsLister] = useState(false); // Store user role

//     const loginUser = (userData) => {
//         setUser(userData);
//     };

//     const toggleRole = () => {
//         setIsLister((prevRole) => !prevRole);
//     };

//     return (
//         <UserContext.Provider value={{ user, isLister, loginUser, toggleRole }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// const App = () => {
//     return (
//         <UserProvider>
//             <Router>
//                 <Navbar />
//                 <Routes>
//                     <Route path="/" element={<LandingPage />} />
//                     <Route path="/auth" element={<AuthPage />} />   
//                     <Route path="/add-bike" element={<AddBike />} />   
//                     <Route path="/bikes" element={<Bikes />} />                              
//                     <Route path="/vehicles" element={<AvailableBikes />} />
//                     <Route path="/services" element={<Service />} />
                    
//                     <Route path="/dashboard" element={<Dashboard />} /> 
//                     <Route path="/forgot-password" element={<ForgotPassword />} />
                   
                   
                    
//                 </Routes>
//                 <Footer />
//             </Router>
//         </UserProvider>
//     );
// };

// // Custom hook to use the UserContext
// export const useUser = () => useContext(UserContext);

// export default App;





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
import RentalHistoryDashboard from './components/RentalHistoryDashboard';
import MyBikes from './pages/MyBikes';


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
                    <Route path="/rental-history" component={RentalHistoryDashboard} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
                <Footer />
            </Router>
        </UserProvider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

export default App;
