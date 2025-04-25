import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OtpMatch = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy OTP match (you can replace this with backend verification later)
    const correctOtp = "123456";

    if (otp === correctOtp) {
      navigate('/login');  // Redirect to login page
    } else {
      alert("Incorrect OTP. Please try again.");
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
