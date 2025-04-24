//     import React, { useEffect, useState } from 'react';
//     import axios from 'axios';
//     import { motion } from 'framer-motion';
//     import { FaUserShield, FaUsers, FaTasks } from 'react-icons/fa';
    
//     const Dashboard = () => {
//       const [stats, setStats] = useState({
//         admins: { total: 0, data: [] },
//         users: { total: 0, data: [] },
//         tasks: { total: 0, data: [] },
//       });
    
//       const [selectedCard, setSelectedCard] = useState(null);
    
//       const cardColors = {
//         admins: {
//           bg: 'bg-gradient-to-r from-blue-200 to-blue-100',
//           hover: 'hover:from-blue-300 hover:to-blue-200',
//           border: 'border-blue-400',
//           text: 'text-blue-800',
//         },
//         users: {
//           bg: 'bg-gradient-to-r from-green-200 to-green-100',
//           hover: 'hover:from-green-300 hover:to-green-200',
//           border: 'border-green-400',
//           text: 'text-green-800',
//         },
//         tasks: {
//           bg: 'bg-gradient-to-r from-purple-200 to-purple-100',
//           hover: 'hover:from-purple-300 hover:to-purple-200',
//           border: 'border-purple-400',
//           text: 'text-purple-800',
//         },

//       };
    
//       const getAuthHeaders = () => {
//         const token = localStorage.getItem('token');
//         return {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
//       };
    
//       const fetchDashboardData = async () => {
//         try {
//           const res = await axios.get('http://localhost:2020/work/admin/dashboard', getAuthHeaders());
//         //   console.log(`>>>apidata>>>>`,res.data)
//           setStats({
//             admins: { total: res.data.totalAdmins, data: res.data.admins },
//             users: { total: res.data.totalUsers, data: res.data.users },
//             tasks: { total: res.data.totalTasks, data: res.data.tasks },
//           });
//         } catch (err) {
//           console.error('Failed to load dashboard data:', err);
//         }
//       };
    
//       useEffect(() => {
//         fetchDashboardData();
//       }, []);
    
//       const handleCardClick = (card) => {
//         setSelectedCard(card === selectedCard ? null : card);
//       };



// const token = localStorage.getItem("token");
// if (token) {
//   try {
//     const tokenPayload = JSON.parse(atob(token.split('.')[1])); 
//     const currentUserId = tokenPayload.id; 
//     console.log("Current User ID:", currentUserId); 
//   } catch (err) {
//     console.error("Error decoding the token:", err);
//   }
// } else {
//   console.log("No token found in localStorage");
// }



//       const handleDeactivateUser = async (userId) => {
//         try {
//           await axios.patch(`http://localhost:2020/user/soft-delete/${userId}`, {}, getAuthHeaders());
//           fetchDashboardData();
//         } catch (error) {
//           console.error('Failed to deactivate user:', error);
//         }
//       };
    
//       const handleMarkComplete = async (taskId) => {
//         try {
//           await axios.patch(
//             `http://localhost:2020/work/mark-complete/${taskId}`,
//             {},
//             getAuthHeaders()
//           );
//           fetchDashboardData(); 
//         } catch (error) {
//           console.error('Failed to mark task as complete:', error);
//         }
//       };
      
//       const renderIcon = (type) => {
//         const iconProps = { size: 24, className: 'text-white' };
//         switch (type) {
//           case 'admins': return <FaUserShield {...iconProps} />;
//           case 'users': return <FaUsers {...iconProps} />;
//           case 'tasks': return <FaTasks {...iconProps} />;
//           default: return null;
//         }
//       };
    
 

//     const renderDetails = () => {

// const card = stats[selectedCard];
//     if (!selectedCard || !card) return null;

//     const adminFields = ['_id', 'email'];
//     const userFields = ['_id', 'firstname', 'lastname', 'email', 'role', 'status', 'createdAt', 'updatedAt'];
//     const taskFields = ['title', 'content', 'assignedBy', 'assignedTo', 'status', 'completed'];

//     let headers;
//     if (selectedCard === 'tasks') headers = taskFields;
//     else if (selectedCard === 'admins') headers = adminFields;
//     else headers = userFields;

//     return (
//       <motion.div
//         className="overflow-x-auto mt-8"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <h3 className="text-2xl font-bold mb-4 capitalize text-gray-700 tracking-wide">
//           {selectedCard} Details
//         </h3>

//         <table className="min-w-full border text-sm bg-white shadow-lg rounded overflow-hidden">
//           <thead className="bg-gray-200 text-gray-700">
//             <tr>
//               {headers.map((key, i) => (
//                 <th key={i} className="px-6 py-3 border-b text-left font-medium uppercase tracking-wider">{key}</th>
//               ))}
//               {selectedCard === 'users' && <th className="px-6 py-3 border-b text-left">Action</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {card.data.map((item, i) => (
//               <tr key={i} className="hover:bg-gray-100 transition-all">
//                 {selectedCard === 'tasks' ? (
//                   <>
//                     <td className="px-6 py-3">{item.title}</td>
//                     <td className="px-6 py-3">{item.content}</td>
//                     <td className="px-6 py-3">{item.assignedBy?.email || item.assignedBy?._id || 'N/A'}</td>
//                     <td className="px-6 py-3">{item.assignedTo?.email || item.assignedTo?._id || 'N/A'}</td>
//                     <td className="px-6 py-3">{item.status || 'Pending'}</td>
//                     <td className="px-6 py-3">
//                       <button
//                         className={`${
//                           item.status === 'Completed'
//                             ? 'bg-gray-400 cursor-not-allowed'
//                             : 'bg-green-500 hover:bg-green-600'
//                         } text-white px-4 py-1 rounded-full transition-all text-xs font-semibold`}
//                         disabled={item.status === 'Completed'}
//                         onClick={() => handleMarkComplete(item._id)}
//                       >
//                         {item.status === 'Completed' ? '✔ Completed' : '✓ Complete'}
//                       </button>
//                     </td>
//                   </>
//                 ) : selectedCard === 'admins' ? (
//                   adminFields.map((key, j) => (
//                     <td key={j} className="px-6 py-3">{String(item[key])}</td>
//                   ))
//                 ) : (
//                   <>
//                     {userFields.map((key, j) => (
//                       <td key={j} className="px-6 py-3">{String(item[key])}</td>
//                     ))}
//                     <td className="px-6 py-3">
//                       <button
//                         className={`${
//                           item.status === 'inactive'
//                             ? 'bg-gray-400 cursor-not-allowed'
//                             : 'bg-red-500 hover:bg-red-600'
//                         } text-white px-4 py-1 rounded-full transition-all text-xs font-semibold`}
//                         onClick={() => handleDeactivateUser(item._id)}
//                         disabled={item.status === 'inactive'}
//                       >
//                         {item.status === 'inactive' ? 'Inactive' : 'Deactivate'}
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 tracking-tight drop-shadow-md">
//           Admin Dashboard
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
//           {['admins', 'users', 'tasks'].map((type) => (
//             <motion.div
//               key={type}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//               className={`rounded-xl p-6 cursor-pointer border ${cardColors[type].bg} ${cardColors[type].hover} ${cardColors[type].border} transition-all duration-300 shadow-md ${
//                 selectedCard === type ? `ring-4 scale-105 ${cardColors[type].border}` : ''
//               }`}
//               onClick={() => handleCardClick(type)}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className={`text-xl font-semibold ${cardColors[type].text}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
//                 {renderIcon(type)}
//               </div>
//               <p className="text-4xl font-bold text-gray-800">{stats[type].total}</p>
//             </motion.div>
//           ))}
//         </div>

//         {renderDetails()}
//       </div>
//     </div>
//   );
//     };
    
//     export default Dashboard;
    


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaUserShield, FaUsers, FaTasks } from 'react-icons/fa';

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     admins: { total: 0, data: [] },
//     users: { total: 0, data: [] },
//     tasks: { total: 0, data: [] },
//   });

//   const [selectedCard, setSelectedCard] = useState(null);

//   const cardColors = {
//     admins: {
//       bg: 'bg-gradient-to-r from-blue-200 to-blue-100',
//       hover: 'hover:from-blue-300 hover:to-blue-200',
//       border: 'border-blue-400',
//       text: 'text-blue-800',
//     },
//     users: {
//       bg: 'bg-gradient-to-r from-green-200 to-green-100',
//       hover: 'hover:from-green-300 hover:to-green-200',
//       border: 'border-green-400',
//       text: 'text-green-800',
//     },
//     tasks: {
//       bg: 'bg-gradient-to-r from-purple-200 to-purple-100',
//       hover: 'hover:from-purple-300 hover:to-purple-200',
//       border: 'border-purple-400',
//       text: 'text-purple-800',
//     },
//   };

//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   const fetchDashboardData = async () => {
//     try {
//       const res = await axios.get('http://localhost:2020/work/admin/dashboard', getAuthHeaders());
//       setStats({
//         admins: { total: res.data.totalAdmins, data: res.data.admins },
//         users: { total: res.data.totalUsers, data: res.data.users },
//         tasks: { total: res.data.totalTasks, data: res.data.tasks },
//       });
//     } catch (err) {
//       console.error('Failed to load dashboard data:', err);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const handleCardClick = (card) => {
//     setSelectedCard(card === selectedCard ? null : card);
//   };

//   const handleDeactivateUser = async (userId) => {
//     try {
//       await axios.patch(`http://localhost:2020/user/soft-delete/${userId}`, {}, getAuthHeaders());
//       fetchDashboardData(); // Refresh data after deactivation
//     } catch (error) {
//       console.error('Failed to deactivate user:', error);
//     }
//   };

//   const handleMarkComplete = async (taskId) => {
//     try {
//       await axios.patch(
//         `http://localhost:2020/work/mark-complete/${taskId}`,
//         {},
//         getAuthHeaders()
//       );
//       fetchDashboardData(); // Refresh tasks after completion
//     } catch (error) {
//       console.error('Failed to mark task as complete:', error);
//     }
//   };

//   const renderIcon = (type) => {
//     const iconProps = { size: 24, className: 'text-white' };
//     switch (type) {
//       case 'admins':
//         return <FaUserShield {...iconProps} />;
//       case 'users':
//         return <FaUsers {...iconProps} />;
//       case 'tasks':
//         return <FaTasks {...iconProps} />;
//       default:
//         return null;
//     }
//   };

//   const renderDetails = () => {
//     const card = stats[selectedCard];
//     if (!selectedCard || !card) return null;

//     const adminFields = ['_id', 'email'];
//     const userFields = ['_id', 'firstname', 'lastname', 'email', 'role', 'status', 'createdAt', 'updatedAt'];
//     const taskFields = ['title', 'content', 'assignedBy', 'assignedTo', 'status', 'completed'];

//     let headers;
//     if (selectedCard === 'tasks') headers = taskFields;
//     else if (selectedCard === 'admins') headers = adminFields;
//     else headers = userFields;

//     // Separate active and inactive users
//     const activeUsers = stats.users.data.filter(user => user.status !== 'inactive');
//     const inactiveUsers = stats.users.data.filter(user => user.status === 'inactive');

//     // Separate pending and completed tasks
//     const pendingTasks = stats.tasks.data.filter(task => task.status !== 'Completed');
//     const completedTasks = stats.tasks.data.filter(task => task.status === 'Completed');

//     return (
//       <motion.div
//         className="overflow-x-auto mt-8"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <h3 className="text-2xl font-bold mb-4 capitalize text-gray-700 tracking-wide">
//           {selectedCard} Details
//         </h3>

//         {selectedCard === 'users' && (
//           <>
//             <h4 className="text-xl font-semibold mb-4">Active Users</h4>
//             <table className="min-w-full border text-sm bg-white shadow-lg rounded overflow-hidden mb-8">
//               <thead className="bg-gray-200 text-gray-700">
//                 <tr>
//                   {userFields.map((key, i) => (
//                     <th key={i} className="px-6 py-3 border-b text-left font-medium uppercase tracking-wider">{key}</th>
//                   ))}
//                   <th className="px-6 py-3 border-b text-left">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {activeUsers.map((user, i) => (
//                   <tr key={i} className="hover:bg-gray-100 transition-all">
//                     {userFields.map((key, j) => (
//                       <td key={j} className="px-6 py-3">{String(user[key])}</td>
//                     ))}
//                     <td className="px-6 py-3">
//                       <button
//                         className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition-all text-xs font-semibold"
//                         onClick={() => handleDeactivateUser(user._id)}
//                       >
//                         Deactivate
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <h4 className="text-xl font-semibold mb-4">Inactive Users</h4>
//             <table className="min-w-full border text-sm bg-white shadow-lg rounded overflow-hidden">
//               <thead className="bg-gray-200 text-gray-700">
//                 <tr>
//                   {userFields.map((key, i) => (
//                     <th key={i} className="px-6 py-3 border-b text-left font-medium uppercase tracking-wider">{key}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {inactiveUsers.map((user, i) => (
//                   <tr key={i} className="hover:bg-gray-100 transition-all">
//                     {userFields.map((key, j) => (
//                       <td key={j} className="px-6 py-3">{String(user[key])}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}

//         {selectedCard === 'tasks' && (
//           <>
//             <h4 className="text-xl font-semibold mb-4">Pending Tasks</h4>
//             <table className="min-w-full border text-sm bg-white shadow-lg rounded overflow-hidden mb-8">
//               <thead className="bg-gray-200 text-gray-700">
//                 <tr>
//                   {taskFields.map((key, i) => (
//                     <th key={i} className="px-6 py-3 border-b text-left font-medium uppercase tracking-wider">{key}</th>
//                   ))}
//                   <th className="px-6 py-3 border-b text-left">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pendingTasks.map((task, i) => (
//                   <tr key={i} className="hover:bg-gray-100 transition-all">
//                     {taskFields.map((key, j) => (
//                       <td key={j} className="px-6 py-3">{String(task[key])}</td>
//                     ))}
//                     <td className="px-6 py-3">
//                       <button
//                         className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full transition-all text-xs font-semibold"
//                         onClick={() => handleMarkComplete(task._id)}
//                       >
//                         Mark as Completed
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <h4 className="text-xl font-semibold mb-4">Completed Tasks</h4>
//             <table className="min-w-full border text-sm bg-white shadow-lg rounded overflow-hidden">
//               <thead className="bg-gray-200 text-gray-700">
//                 <tr>
//                   {taskFields.map((key, i) => (
//                     <th key={i} className="px-6 py-3 border-b text-left font-medium uppercase tracking-wider">{key}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {completedTasks.map((task, i) => (
//                   <tr key={i} className="hover:bg-gray-100 transition-all">
//                     {taskFields.map((key, j) => (
//                       <td key={j} className="px-6 py-3">{String(task[key])}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 tracking-tight drop-shadow-md">
//           Admin Dashboard
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
//           {['admins', 'users', 'tasks'].map((type) => (
//             <motion.div
//               key={type}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//               className={`rounded-xl p-6 cursor-pointer border ${cardColors[type].bg} ${cardColors[type].hover} ${cardColors[type].border} transition-all duration-300 shadow-md ${
//                 selectedCard === type ? `ring-4 scale-105 ${cardColors[type].border}` : ''
//               }`}
//               onClick={() => handleCardClick(type)}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className={`text-xl font-semibold ${cardColors[type].text}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
//                 {renderIcon(type)}
//               </div>
//               <p className="text-4xl font-bold text-gray-800">{stats[type].total}</p>
//             </motion.div>
//           ))}
//         </div>

//         {renderDetails()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// Updated Dashboard Component with assignedBy and assignedTo info
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUserShield, FaUsers, FaTasks } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    admins: [],
    activeUsers: [],
    inactiveUsers: [],
    tasks: [],
    completedTasks: [],
    pendingTasks: [],
  });

  const [selectedCard, setSelectedCard] = useState(null);

  const cardColors = {
    admins: {
      bg: 'bg-gradient-to-r from-blue-200 to-blue-100',
      hover: 'hover:from-blue-300 hover:to-blue-200',
      border: 'border-blue-400',
      text: 'text-blue-800',
    },
    activeUsers: {
      bg: 'bg-gradient-to-r from-green-200 to-green-100',
      hover: 'hover:from-green-300 hover:to-green-200',
      border: 'border-green-400',
      text: 'text-green-800',
    },
    inactiveUsers: {
      bg: 'bg-gradient-to-r from-gray-300 to-gray-200',
      hover: 'hover:from-gray-400 hover:to-gray-300',
      border: 'border-gray-500',
      text: 'text-gray-800',
    },
    tasks: {
      bg: 'bg-gradient-to-r from-purple-200 to-purple-100',
      hover: 'hover:from-purple-300 hover:to-purple-200',
      border: 'border-purple-400',
      text: 'text-purple-800',
    },
    completedTasks: {
      bg: 'bg-gradient-to-r from-emerald-200 to-emerald-100',
      hover: 'hover:from-emerald-300 hover:to-emerald-200',
      border: 'border-emerald-400',
      text: 'text-emerald-800',
    },
    pendingTasks: {
      bg: 'bg-gradient-to-r from-yellow-200 to-yellow-100',
      hover: 'hover:from-yellow-300 hover:to-yellow-200',
      border: 'border-yellow-400',
      text: 'text-yellow-800',
    },
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('http://localhost:2020/work/admin/dashboard', getAuthHeaders());
      setStats({
        admins: res.data.admins || [],
        activeUsers: res.data.users?.filter((u) => u.status === 'active') || [],
        inactiveUsers: res.data.users?.filter((u) => u.status === 'inactive') || [],
        tasks: res.data.tasks || [],
        completedTasks: res.data.tasks?.filter((t) => t.status === 'Completed') || [],
        pendingTasks: res.data.tasks?.filter((t) => t.status !== 'Completed') || [],
      });
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card === selectedCard ? null : card);
  };

  const handleDeactivateUser = async (userId) => {
    try {
      await axios.patch(`http://localhost:2020/user/soft-delete/${userId}`, {}, getAuthHeaders());
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to deactivate user:', error);
    }
  };

  const handleMarkComplete = async (taskId) => {
    try {
      await axios.patch(`http://localhost:2020/work/mark-complete/${taskId}`, {}, getAuthHeaders());
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to mark task as complete:', error);
    }
  };

  const renderDetails = () => {
    if (!selectedCard) return null;
    const data = stats[selectedCard];
    if (!data || data.length === 0) return null;

    const isTaskCard = selectedCard.includes('Tasks') || selectedCard === 'tasks';
    const isUserCard = selectedCard.includes('Users');

    const headers = isTaskCard
      ? ['title', 'content', 'assignedBy', 'assignedTo', 'status', 'action']
      : ['_id', 'firstname', 'lastname', 'email', 'role', 'status', 'createdAt', 'updatedAt', 'action'];

    return (
      <motion.div className="overflow-x-auto mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <h3 className="text-2xl font-bold mb-4 capitalize text-gray-700 tracking-wide">{selectedCard} Details</h3>
        <table className="min-w-full border text-sm bg-white shadow-lg rounded overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {headers.map((key, i) => (
                <th key={i} className="px-6 py-3 border-b text-left font-medium uppercase tracking-wider">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="hover:bg-gray-100 transition-all">
                {isTaskCard ? (
                  <>
                    <td className="px-6 py-3">{item.title}</td>
                    <td className="px-6 py-3">{item.content}</td>
                    <td className="px-6 py-3">{item.assignedBy?.email || item.assignedBy?._id || 'N/A'}</td>
                    <td className="px-6 py-3">{item.assignedTo?.email || item.assignedTo?._id || 'N/A'}</td>
                    <td className="px-6 py-3">{item.status || 'Pending'}</td>
                    <td className="px-6 py-3">
                      <button
                        className={`${item.status === 'Completed' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-1 rounded-full transition-all text-xs font-semibold`}
                        disabled={item.status === 'Completed'}
                        onClick={() => handleMarkComplete(item._id)}
                      >
                        {item.status === 'Completed' ? '✔ Completed' : '✓ Complete'}
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-3">{item._id}</td>
                    <td className="px-6 py-3">{item.firstname}</td>
                    <td className="px-6 py-3">{item.lastname}</td>
                    <td className="px-6 py-3">{item.email}</td>
                    <td className="px-6 py-3">{item.role}</td>
                    <td className="px-6 py-3">{item.status}</td>
                    <td className="px-6 py-3">{item.createdAt}</td>
                    <td className="px-6 py-3">{item.updatedAt}</td>
                    <td className="px-6 py-3">
                      <button
                        className={`${item.status === 'inactive' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-1 rounded-full transition-all text-xs font-semibold`}
                        disabled={item.status === 'inactive'}
                        onClick={() => handleDeactivateUser(item._id)}
                      >
                        {item.status === 'inactive' ? 'Inactive' : 'Deactivate'}
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    );
  };

  const renderIcon = (type) => {
    const iconProps = { size: 24, className: 'text-white' };
    switch (type) {
      case 'admins': return <FaUserShield {...iconProps} />;
      case 'activeUsers': return <FaUsers {...iconProps} />;
      case 'inactiveUsers': return <FaUsers {...iconProps} />;
      case 'tasks':
      case 'completedTasks':
      case 'pendingTasks': return <FaTasks {...iconProps} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 tracking-tight drop-shadow-md">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {Object.keys(stats).map((type) => (
            <motion.div
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-xl p-6 cursor-pointer border ${cardColors[type]?.bg} ${cardColors[type]?.hover} ${cardColors[type]?.border} transition-all duration-300 shadow-md ${selectedCard === type ? `ring-4 scale-105 ${cardColors[type]?.border}` : ''}`}
              onClick={() => handleCardClick(type)}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-semibold ${cardColors[type]?.text}`}>{type.replace(/([A-Z])/g, ' $1').replace(/^\w/, (c) => c.toUpperCase())}</h2>
                {renderIcon(type)}
              </div>
              <p className="text-4xl font-bold text-gray-800">{stats[type]?.length || 0}</p>
            </motion.div>
          ))}
        </div>
        {renderDetails()}
      </div>
    </div>
  );
};

export default Dashboard;

