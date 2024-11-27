

import React, { useState } from 'react';
import axios from 'axios';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:4000/api/auth/register', {
            username,
            password,
        });
    };

    return (
        <form onSubmit={handleRegistration}>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationPage;
