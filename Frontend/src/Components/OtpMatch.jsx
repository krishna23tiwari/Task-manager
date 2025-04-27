import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OtpMatch = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('signupEmail'); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('No email found. Please signup again.');
      navigate('/signup');
      return;
    }

    try {
      const res = await axios.post('http://localhost:2020/user/verify-otp', {
        email,
        otp,
      });

      if (res.status === 200) {
        alert(res.data.message);
        localStorage.removeItem('signupEmail'); 
        navigate('/login'); 
      }
    } catch (error) {
      alert(error?.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-700 p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-300">Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpMatch;

