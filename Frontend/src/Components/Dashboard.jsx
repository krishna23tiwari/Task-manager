    // import React, { useEffect, useState } from 'react';
    // import axios from 'axios';
    // import { motion } from 'framer-motion';
    // import { FaUserShield, FaUsers, FaTasks } from 'react-icons/fa';

    // const Dashboard = () => {
    // const [stats, setStats] = useState({
    //     admins: { total: 0, data: [] },
    //     users: { total: 0, data: [] },
    //     tasks: { total: 0, data: [] },
    // });

    // const [selectedCard, setSelectedCard] = useState(null);

    // const cardColors = {
    //     admins: {
    //     bg: 'bg-gradient-to-r from-blue-200 to-blue-100',
    //     hover: 'hover:from-blue-300 hover:to-blue-200',
    //     border: 'border-blue-400',
    //     text: 'text-blue-800',
    //     },
    //     users: {
    //     bg: 'bg-gradient-to-r from-green-200 to-green-100',
    //     hover: 'hover:from-green-300 hover:to-green-200',
    //     border: 'border-green-400',
    //     text: 'text-green-800',
    //     },
    //     tasks: {
    //     bg: 'bg-gradient-to-r from-purple-200 to-purple-100',
    //     hover: 'hover:from-purple-300 hover:to-purple-200',
    //     border: 'border-purple-400',
    //     text: 'text-purple-800',
    //     },
    // };

    // const getAuthHeaders = () => {
    //     const token = localStorage.getItem('token');
    //     return {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    //     };
    // };

    // const fetchDashboardData = async () => {
    //     try {
    //     const res = await axios.get('http://localhost:2020/work/admin/dashboard', getAuthHeaders());
    //     setStats({
    //         admins: { total: res.data.totalAdmins, data: res.data.admins },
    //         users: { total: res.data.totalUsers, data: res.data.users },
    //         tasks: { total: res.data.totalTasks, data: res.data.tasks },
    //     });
    //     } catch (err) {
    //     console.error('Failed to load dashboard data:', err);
    //     }
    // };

    // useEffect(() => {
    //     fetchDashboardData();
    // }, []);

    // const handleCardClick = (card) => {
    //     setSelectedCard(card === selectedCard ? null : card);
    // };

    // const renderIcon = (type) => {
    //     const iconProps = { size: 24, className: 'text-white' };
    //     switch (type) {
    //     case 'admins': return <FaUserShield {...iconProps} />;
    //     case 'users': return <FaUsers {...iconProps} />;
    //     case 'tasks': return <FaTasks {...iconProps} />;
    //     default: return null;
    //     }
    // };

    // const renderDetails = () => {
    //     const card = stats[selectedCard];
    //     if (!selectedCard || !card) return null;

    
    //     const headers = selectedCard === 'tasks'
    // ? ['title', 'content', 'assignedBy', 'assignedTo']
    // : Object.keys(card.data[0] || {});


    //     return (
    //     <motion.div
    //         className="overflow-x-auto mt-6"
    //         initial={{ opacity: 0, y: 10 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.3 }}
    //     >
    //         <h3 className="text-xl font-semibold mb-4 capitalize text-gray-700">
    //         {selectedCard} Details
    //         </h3>
    //         <table className="min-w-full border text-sm bg-white shadow-md rounded">
    //         <thead className="bg-gray-100 text-gray-600">
    //             <tr>
    //             {headers.map((key, i) => (
    //                 <th key={i} className="px-4 py-2 text-left border">{key}</th>
    //             ))}
    //             </tr>
    //         </thead>
    //         <tbody>
    // {card.data.map((item, i) => (
    //     <tr key={i} className="border-t hover:bg-gray-50">
    //     {selectedCard === 'tasks' ? (
    //         <>
    //         <td className="px-4 py-2">{item.title}</td>
    //         <td className="px-4 py-2">{item.content}</td>
    //         <td className="px-4 py-2">
    //             {item.assignedBy ? `${item.assignedBy.firstname} ${item.assignedBy.lastname}` : 'N/A'}
    //         </td>
    //         <td className="px-4 py-2">
    //             {item.assignedTo ? `${item.assignedTo.firstname} ${item.assignedTo.lastname}` : 'N/A'}
    //         </td>
    //         </>
    //     ) : (
    //         headers.map((key, j) => (
    //         <td key={j} className="px-4 py-2">{String(item[key])}</td>
    //         ))
    //     )}
    //     </tr>
    // ))}
    // </tbody>
        
    //         </table>
    //     </motion.div>
    //     );
    // };

    // return (
    //     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
    //     <div className="max-w-6xl mx-auto">
    //         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Dashboard</h1>

    //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    //         {/* Admins Card */}
    //         <div
    //             className={`${cardColors.admins.bg} ${cardColors.admins.hover} ${cardColors.admins.border} border rounded-lg shadow-md p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedCard === 'admins' ? 'ring-4 ring-blue-300 scale-105' : ''}`}
    //             onClick={() => handleCardClick('admins')}
    //         >
    //             <div className="flex items-center justify-between mb-4">
    //             <h2 className={`text-lg font-semibold ${cardColors.admins.text}`}>Admins</h2>
    //             {renderIcon('admins')}
    //             </div>
    //             <p className="text-3xl font-bold text-gray-900">{stats.admins.total}</p>
    //         </div>

    //         {/* Users Card */}
    //         <div
    //             className={`${cardColors.users.bg} ${cardColors.users.hover} ${cardColors.users.border} border rounded-lg shadow-md p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedCard === 'users' ? 'ring-4 ring-green-300 scale-105' : ''}`}
    //             onClick={() => handleCardClick('users')}
    //         >
    //             <div className="flex items-center justify-between mb-4">
    //             <h2 className={`text-lg font-semibold ${cardColors.users.text}`}>Users</h2>
    //             {renderIcon('users')}
    //             </div>
    //             <p className="text-3xl font-bold text-gray-900">{stats.users.total}</p>
    //         </div>

    //         {/* Tasks Card */}
    //         <div
    //             className={`${cardColors.tasks.bg} ${cardColors.tasks.hover} ${cardColors.tasks.border} border rounded-lg shadow-md p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedCard === 'tasks' ? 'ring-4 ring-purple-300 scale-105' : ''}`}
    //             onClick={() => handleCardClick('tasks')}
    //         >
    //             <div className="flex items-center justify-between mb-4">
    //             <h2 className={`text-lg font-semibold ${cardColors.tasks.text}`}>Tasks</h2>
    //             {renderIcon('tasks')}
    //             </div>
    //             <p className="text-3xl font-bold text-gray-900">{stats.tasks.total}</p>
    //         </div>
    //         </div>

    //         {/* Table Section */}
    //         {renderDetails()}
    //     </div>
    //     </div>
    // );
    // };

    // export default Dashboard;


    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { motion } from 'framer-motion';
    import { FaUserShield, FaUsers, FaTasks } from 'react-icons/fa';
    
    const Dashboard = () => {
      const [stats, setStats] = useState({
        admins: { total: 0, data: [] },
        users: { total: 0, data: [] },
        tasks: { total: 0, data: [] },
      });
    
      const [selectedCard, setSelectedCard] = useState(null);
    
      const cardColors = {
        admins: {
          bg: 'bg-gradient-to-r from-blue-200 to-blue-100',
          hover: 'hover:from-blue-300 hover:to-blue-200',
          border: 'border-blue-400',
          text: 'text-blue-800',
        },
        users: {
          bg: 'bg-gradient-to-r from-green-200 to-green-100',
          hover: 'hover:from-green-300 hover:to-green-200',
          border: 'border-green-400',
          text: 'text-green-800',
        },
        tasks: {
          bg: 'bg-gradient-to-r from-purple-200 to-purple-100',
          hover: 'hover:from-purple-300 hover:to-purple-200',
          border: 'border-purple-400',
          text: 'text-purple-800',
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
          console.log(`>>>apidata>>>>`,res.data)
          setStats({
            admins: { total: res.data.totalAdmins, data: res.data.admins },
            users: { total: res.data.totalUsers, data: res.data.users },
            tasks: { total: res.data.totalTasks, data: res.data.tasks },
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
    
      const renderIcon = (type) => {
        const iconProps = { size: 24, className: 'text-white' };
        switch (type) {
          case 'admins': return <FaUserShield {...iconProps} />;
          case 'users': return <FaUsers {...iconProps} />;
          case 'tasks': return <FaTasks {...iconProps} />;
          default: return null;
        }
      };
    
      const renderDetails = () => {
        const card = stats[selectedCard];
        if (!selectedCard || !card) return null;
    
        const userFields = ['_id', 'firstname', 'lastname', 'email', 'role', 'status', 'createdAt', 'updatedAt'];
        const taskFields = ['title', 'content', 'assignedBy', 'assignedTo'];
    
        const headers = selectedCard === 'tasks' ? taskFields : userFields;
    
        return (
          <motion.div
            className="overflow-x-auto mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4 capitalize text-gray-700">
              {selectedCard} Details
            </h3>
            <table className="min-w-full border text-sm bg-white shadow-md rounded">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  {headers.map((key, i) => (
                    <th key={i} className="px-4 py-2 text-left border">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {card.data.map((item, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    {selectedCard === 'tasks' ? (
                      <>
                        <td className="px-4 py-2">{item.title}</td>
                        <td className="px-4 py-2">{item.content}</td>
                        <td className="px-4 py-2">
                          {item.assignedBy ? `${item.assignedBy.firstname} ${item.assignedBy.lastname}` : 'N/A'}
                        </td>
                        <td className="px-4 py-2">
                          {item.assignedTo ? `${item.assignedTo.firstname} ${item.assignedTo.lastname}` : 'N/A'}
                        </td>
                      </>
                    ) : (
                      userFields.map((key, j) => (
                        <td key={j} className="px-4 py-2">{String(item[key])}</td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        );
      };
    
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Dashboard</h1>
    
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Admins Card */}
              <div
                className={`${cardColors.admins.bg} ${cardColors.admins.hover} ${cardColors.admins.border} border rounded-lg shadow-md p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedCard === 'admins' ? 'ring-4 ring-blue-300 scale-105' : ''}`}
                onClick={() => handleCardClick('admins')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-semibold ${cardColors.admins.text}`}>Admins</h2>
                  {renderIcon('admins')}
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.admins.total}</p>
              </div>
    
              {/* Users Card */}
              <div
                className={`${cardColors.users.bg} ${cardColors.users.hover} ${cardColors.users.border} border rounded-lg shadow-md p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedCard === 'users' ? 'ring-4 ring-green-300 scale-105' : ''}`}
                onClick={() => handleCardClick('users')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-semibold ${cardColors.users.text}`}>Users</h2>
                  {renderIcon('users')}
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.users.total}</p>
              </div>
    
              {/* Tasks Card */}
              <div
                className={`${cardColors.tasks.bg} ${cardColors.tasks.hover} ${cardColors.tasks.border} border rounded-lg shadow-md p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedCard === 'tasks' ? 'ring-4 ring-purple-300 scale-105' : ''}`}
                onClick={() => handleCardClick('tasks')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-semibold ${cardColors.tasks.text}`}>Tasks</h2>
                  {renderIcon('tasks')}
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.tasks.total}</p>
              </div>
            </div>
    
            {/* Table Section */}
            {renderDetails()}
          </div>
        </div>
      );
    };
    
    export default Dashboard;
    