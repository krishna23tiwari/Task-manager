import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navi = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:2020/user/signup', {...formData, role: 'user'});
      if (res.status === 201) {
        alert(res.data.message);
        localStorage.setItem('signupEmail', formData.email);
        navi('/otp');
      } else {
        alert(res.data.message || 'Signup failed');
      }
    } catch (error) {
      alert(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        <div className="text-center transform hover:scale-105 transition duration-300">
          <svg className="mx-auto h-12 w-auto animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="#0ea5e9" d="M12 2C6.49 2 2 6.49 2 12c0 4.28 2.69 7.92 6.44 9.27l1.02-2.67C6.7 17.44 5 14.89 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.89-1.7 5.44-4.46 6.6l1.02 2.67C19.31 19.92 22 16.28 22 12c0-5.51-4.49-10-10-10z"/>
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-white animate-slideFromTop">Create an Account</h2>
          <p className="mt-2 text-sm text-gray-400 animate-slideFromBottom">
            Sign up to explore your notes!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-gray-950 bg-opacity-80 p-8 rounded-lg shadow-2xl animate-slideFromBottom transition-all duration-300 hover:shadow-cyan-400/20">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              required
              className="w-1/2 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ease-in-out hover:border-cyan-400 transform hover:-translate-y-1"
              value={formData.firstname}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              required
              className="w-1/2 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ease-in-out hover:border-cyan-400 transform hover:-translate-y-1"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ease-in-out hover:border-cyan-400 transform hover:-translate-y-1"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ease-in-out hover:border-cyan-400 transform hover:-translate-y-1"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ease-in-out hover:border-cyan-400 transform hover:-translate-y-1"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div className="flex items-center justify-between">
            <Link
              to="/login"
              className="text-sm text-cyan-400 hover:underline transition hover:text-cyan-300"
            >
              Already have an account?
            </Link>
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes slideFromTop {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideFromTop {
          animation: slideFromTop 0.5s ease-out;
        }
        @keyframes slideFromBottom {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideFromBottom {
          animation: slideFromBottom 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SignUp;

