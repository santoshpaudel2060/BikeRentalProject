import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/forgot-password', {
        email,
      });

      if (response.status === 200) {
        setMessage('OTP sent to your email!');
        setError('');
      }
    } catch (error) {
      setMessage('');
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white">
          Send OTP
        </button>
      </form>

      {message && <div className="mt-4 text-green-500">{message}</div>}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default ForgotPasswordForm;
