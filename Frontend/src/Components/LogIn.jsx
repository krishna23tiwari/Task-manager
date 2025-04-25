// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     otp: ''
//   });
//   const [otpRequired, setOtpRequired] = useState(false);

//   const navi = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };



// // const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     console.log('Login attempt with:', formData);
  
// //     try {
// //       const response = await axios.post('http://localhost:2020/user/login', formData);
// //       console.log('>>>response>>>', response);
  
// //       if (response.data.user.status === 'inactive') {
// //         alert('Your account is inactive...');
// //         return; 
// //       }
  
    
// //       localStorage.setItem('token', response.data.token);
  
// //       if (response.status === 200) {
// //         alert(response.data.message);
// //         navi('/user-dash'); 
// //       }
// //     // } catch (error) {
// //     //   if (error.response) {
// //     //     const { message } = error.response.data;
// //     //     alert(message);
// //     //   } else {
// //     //     alert('Network error. Please try again later.');
// //     //   }
// //     // }

// //     }catch (error) {
// //         const msg = error.response?.data?.message || 'Network error';
    
// //         if (msg.includes('enter OTP')) {
// //           setOtpRequired(true);
// //           alert('Please enter the OTP sent to your email.');
// //         } else {
// //           alert(msg);
// //         }
// //       }
// //   };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Login attempt with:', formData);
  
//     try {
//       const payload = {
//         email: formData.email,
//         password: formData.password,
//       };
  
//       if (formData.otp) {
//         payload.otp = formData.otp;
//       }
  
//       const response = await axios.post('http://localhost:2020/user/login', payload);
  
//       if (response.data.user.status === 'inactive') {
//         alert('Your account is inactive...');
//         return;
//       }
  
//       localStorage.setItem('token', response.data.token);
  
//       if (response.status === 200) {
//         alert(response.data.message);
//         navi('/user-dash');
//       }
//     } catch (error) {
//       console.error("Login error:", error);
  
//       if (error.response) {
//         const { message } = error.response.data;
//         alert(message);
//       } else {
//         alert('Network error. Please try again later.');
//       }
//     }
//   };
  
  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4 py-12">
//       <div className="bg-white/5 backdrop-blur-md shadow-xl rounded-2xl p-10 w-full max-w-md text-white transition-transform transform hover:scale-105 duration-300">
//         <div className="text-center mb-8">
//           <svg className="mx-auto h-12 w-12 text-purple-400 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11h2a1 1 0 000-2h-2V3a1 1 0 10-2 0v2H7a1 1 0 000 2h2v2a1 1 0 102 0V7z" />
//           </svg>
//           <h2 className="mt-4 text-3xl font-bold tracking-tight">Welcome Back</h2>
//           <p className="text-purple-300 text-sm">Log in to access your notes</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input
//             type="email"
//             name="email"
//             required
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
//           />

//           <input
//             type="password"
//             name="password"
//             required
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
//           />

// {!formData.isVerified && (
//   <input
//     type="text"
//     name="otp"
//     placeholder="Enter OTP (if required)"
//     value={formData.otp || ''}
//     onChange={handleChange}
//     className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
//   />
// )}



//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" className="form-checkbox text-purple-600" />
//               Remember me
//             </label>
//             <button type="button" className="text-purple-400 hover:underline">Forgot Password?</button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-3 rounded-lg font-semibold tracking-wide shadow-md hover:shadow-purple-500/50"
//           >
//             Log In
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-purple-300">Don't have an account?</p>
//           <Link
//             to="/"
//             className="mt-2 inline-block text-purple-500 hover:text-purple-300 hover:underline font-medium transition"
//           >
//             Create Account
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     otp: ''
//   });
//   const [otpRequired, setOtpRequired] = useState(false);  // To conditionally show OTP field

//   const navi = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Login attempt with:', formData);

//     try {
//       const payload = {
//         email: formData.email,
//         password: formData.password,
//       };

//       // Add OTP to payload if it's required
//       if (otpRequired && formData.otp) {
//         payload.otp = formData.otp;
//       }

//       const response = await axios.post('http://localhost:2020/user/login', payload);

//       if (response.data.user.status === 'inactive') {
//         alert('Your account is inactive...');
//         return;
//       }

//       if (!response.data.user.isVerified && !formData.otp) {
//         setOtpRequired(true); // If user is not verified, show OTP input
//         alert('Please enter the OTP sent to your email.');
//         return;
//       }

//       localStorage.setItem('token', response.data.token);

//       if (response.status === 200) {
//         alert(response.data.message);
//         navi('/user-dash');
//       }
//     } catch (error) {
//       console.error("Login error:", error);

//       if (error.response) {
//         const { message } = error.response.data;
//         alert(message);
//       } else {
//         alert('Network error. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4 py-12">
//       <div className="bg-white/5 backdrop-blur-md shadow-xl rounded-2xl p-10 w-full max-w-md text-white transition-transform transform hover:scale-105 duration-300">
//         <div className="text-center mb-8">
//           <svg className="mx-auto h-12 w-12 text-purple-400 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11h2a1 1 0 000-2h-2V3a1 1 0 10-2 0v2H7a1 1 0 000 2h2v2a1 1 0 102 0V7z" />
//           </svg>
//           <h2 className="mt-4 text-3xl font-bold tracking-tight">Welcome Back</h2>
//           <p className="text-purple-300 text-sm">Log in to access your notes</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input
//             type="email"
//             name="email"
//             required
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
//           />

//           <input
//             type="password"
//             name="password"
//             required
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
//           />

//           {otpRequired && (
//             <input
//               type="text"
//               name="otp"
//               placeholder="Enter OTP"
//               value={formData.otp || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
//             />
//           )}

//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" className="form-checkbox text-purple-600" />
//               Remember me
//             </label>
//             <button type="button" className="text-purple-400 hover:underline">Forgot Password?</button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-3 rounded-lg font-semibold tracking-wide shadow-md hover:shadow-purple-500/50"
//           >
//             Log In
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-purple-300">Don't have an account?</p>
//           <Link
//             to="/"
//             className="mt-2 inline-block text-purple-500 hover:text-purple-300 hover:underline font-medium transition"
//           >
//             Create Account
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     otp: ''
//   });
//   const [otpRequired, setOtpRequired] = useState(false);
//   const navi = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // build payload
//       const payload = {
//         email: formData.email,
//         password: formData.password,
//         ...(otpRequired && formData.otp ? { otp: formData.otp } : {})
//       };

//       const { data } = await axios.post(
//         'http://localhost:2020/user/login',
//         payload
//       );

//       // if still not verified, backend should have returned 200 with user.isVerified===false
//       if (data.user && data.user.isVerified === false && !payload.otp) {
//         setOtpRequired(true);
//         alert('Please enter the OTP sent to your email.');
//         return;
//       }

//       // success!
//       localStorage.setItem('token', data.token);
//       alert(data.message);
//       navi('/user-dash');
//     } catch (err) {
//       const msg = err.response?.data?.message || 'Network error';
//       // if backend tells us to enter OTP, flip the flag
//       if (msg.toLowerCase().includes('otp')) {
//         setOtpRequired(true);
//         alert('Please enter the OTP sent to your email.');
//         return;
//       }
//       alert(msg);
//     }
//   };



//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4 py-12">
//       <div className="bg-white/5 backdrop-blur-md shadow-xl rounded-2xl p-10 w-full max-w-md text-white transform hover:scale-105 transition">
//         <h2 className="text-center text-3xl font-bold mb-6">Welcome Back</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700"
//           />
//           {otpRequired && (
//             <input
//               type="text"
//               name="otp"
//               placeholder="Enter OTP"
//               required
//               value={formData.otp}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700"
//             />
//           )}
//           <button
//             type="submit"
//             className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold"
//           >
//             {otpRequired ? 'Verify OTP & Login' : 'Log In'}
//           </button>
//         </form>
//         <p className="mt-6 text-center text-sm text-purple-300">
//           Don’t have an account?{' '}
//           <Link to="/" className="text-purple-400 hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:2020/user/login',
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem('token', data.token);
      alert(data.message);
      navigate('/user-dash');
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
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
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
