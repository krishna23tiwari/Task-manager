import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navi = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);

    try {
      const response = await axios.post('http://localhost:2020/user/login', formData);
      console.log('>>>response>>>', response);

      localStorage.setItem('token', response.data.token);

      if (response.status === 200) {
        alert(response.data.message);
        navi('/task');
      }
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        alert(message);
        // Redirect user to signup if credentials fail
        navi('/');
      } else {
        alert('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4 py-12">
      <div className="bg-white/5 backdrop-blur-md shadow-xl rounded-2xl p-10 w-full max-w-md text-white transition-transform transform hover:scale-105 duration-300">
        <div className="text-center mb-8">
          <svg className="mx-auto h-12 w-12 text-purple-400 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11h2a1 1 0 000-2h-2V3a1 1 0 10-2 0v2H7a1 1 0 000 2h2v2a1 1 0 102 0V7z" />
          </svg>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">Welcome Back</h2>
          <p className="text-purple-300 text-sm">Log in to access your notes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />

          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox text-purple-600" />
              Remember me
            </label>
            <button type="button" className="text-purple-400 hover:underline">Forgot Password?</button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-3 rounded-lg font-semibold tracking-wide shadow-md hover:shadow-purple-500/50"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-purple-300">Don't have an account?</p>
          <Link
            to="/"
            className="mt-2 inline-block text-purple-500 hover:text-purple-300 hover:underline font-medium transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
