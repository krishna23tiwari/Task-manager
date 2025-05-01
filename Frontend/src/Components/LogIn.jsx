
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:2020/user/login', {
        email: formData.email,
        password: formData.password,
      });
  
      localStorage.setItem('token', data.token);
      alert(data.message);

      if (data.role === 'admin') {
        navigate('/dash');
      } else {
        navigate('/user-dash');  
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Network error';
      alert(msg);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4 py-12">
      <div className="bg-white/5 backdrop-blur-md shadow-xl rounded-2xl p-10 w-full max-w-md text-white transform hover:scale-105 transition">
        <h2 className="text-center text-3xl font-bold mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email" name="email" placeholder="Email" required
            value={formData.email} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700"
          />
          <input
            type="password" name="password" placeholder="Password" required
            value={formData.password} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-purple-300">
          Don’t have an account?{' '}
          <Link to="/" className="text-purple-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
