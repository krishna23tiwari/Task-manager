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
    




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


  const cardColors = {
    admins:         { bg: 'bg-gradient-to-r from-blue-600 to-blue-400',    hover: 'hover:from-blue-700 hover:to-blue-500',    border: 'border-blue-700',    text: 'text-black' },
    activeUsers:    { bg: 'bg-gradient-to-r from-green-600 to-green-400',   hover: 'hover:from-green-700 hover:to-green-500',  border: 'border-green-700',   text: 'text-black' },
    inactiveUsers:  { bg: 'bg-gradient-to-r from-gray-500 to-gray-300',    hover: 'hover:from-gray-600 hover:to-gray-400',   border: 'border-gray-700',    text: 'text-black' },
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        'http://localhost:2020/work/admin/dashboard',
        getAuthHeaders()
      );
      setAdmins(res.data.admins || []);
      setUsers(res.data.users || []);
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
      await axios.patch(
        `http://localhost:2020/user/soft-delete/${userId}`,
        {},
        getAuthHeaders()
      );
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to deactivate user:', err);
    }
  };

  const handleAssignTask = (userId) => {
    navigate('/task', { state: { userId } });
  };
  
  

  const activeUsers   = users.filter(u => u.status === 'active');
  const inactiveUsers = users.filter(u => u.status === 'inactive');

const renderDetails = () => {
    if (!selectedCard) return null;
  
    let data = [];
    let headers = [];
  
    switch (selectedCard) {
      case 'admins':         data = admins;         headers = ['_id','email']; break;
      case 'activeUsers':    data = activeUsers;    headers = ['_id','firstname','lastname','email','status']; break;
      case 'inactiveUsers':  data = inactiveUsers;  headers = ['_id','firstname','lastname','email','status']; break;
      default: return null;
    }
  
    const filteredData = data
      .filter((item) => {
        const values = Object.values(item).join(' ').toLowerCase();
        return values.includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        const nameA = a.firstname ? a.firstname.toLowerCase() : '';
        const nameB = b.firstname ? b.firstname.toLowerCase() : '';
        return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
  
    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        <div className="bg-white text-black max-w-6xl w-full rounded-xl shadow-xl p-6 relative overflow-auto max-h-[90vh]">
          <button
            onClick={() => setSelectedCard(null)}
            className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl font-bold"
          >✕</button>
  
          <h3 className="text-2xl font-bold mb-6 capitalize">{selectedCard} Details</h3>
  
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white text-black placeholder-gray-500 border border-gray-300 rounded-md px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/2"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/4"
            >
              <option value="asc">Sort: A-Z</option>
              <option value="desc">Sort: Z-A</option>
            </select>
          </div>
  
          {/* Table */}
          <table className="min-w-full border text-black shadow-lg rounded overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                {headers.map((h,i) => (
                  <th key={i} className="px-6 py-3 border-b uppercase text-black">{h}</th>
                ))}
                <th className="px-6 py-3 border-b text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item,i) => (
                <tr key={i} className="hover:bg-gray-100">
                  {headers.map((h,j) => (
                    <td key={j} className="px-6 py-3">{String(item[h])}</td>
                  ))}
                  <td className="px-6 py-3 flex gap-2">
                    {selectedCard === 'activeUsers' && (
                      <button
                        onClick={() => handleAssignTask(item._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Assign
                      </button>
                    )}
                    {item.status !== 'inactive' && (
                      <button
                        onClick={() => handleDeactivateUser(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  };
  

  const renderIcon = () => <FaUsers size={24} className="text-white" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto relative">
        <h1 className="text-4xl font-bold text-center mb-10 text-black">Admin Dashboard</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="absolute top-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
          onClick={() => navigate('/task-dash')}
        >
          See All Task Updates
        </motion.button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 mt-10">
          {['admins','activeUsers','inactiveUsers'].map(type => (
            <motion.div
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-xl p-6 border ${cardColors[type].bg} ${cardColors[type].hover} ${cardColors[type].border} cursor-pointer`}
              onClick={() => handleCardClick(type)}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${cardColors[type].text}`}>{type.replace(/([A-Z])/g, ' $1')}</h2>
                {renderIcon(type)}
              </div>
              <p className="text-4xl font-bold text-black">{
                {
                  admins: admins.length,
                  activeUsers: activeUsers.length,
                  inactiveUsers: inactiveUsers.length,
                }[type]
              }</p>
            </motion.div>
          ))}
        </div>

        {renderDetails()}
      </div>
    </div>
  );
};

export default Dashboard;

