// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// const TaskDash = () => {
//   const tasks = useSelector((state) => state.tasks.tasks);

// // Count total, completed, and pending tasks
// const totalTasks = tasks.length;
// const completedTasks = tasks.filter(task => task.completed);
// const pendingTasks = tasks.filter(task => !task.completed);

// // Filters and selected user info
// const [filter, setFilter] = useState("all");
// const [selectedEmail, setSelectedEmail] = useState(null);
// const [selectedRole, setSelectedRole] = useState(null);

// // Return tasks based on selected filter
// const getFilteredTasks = () => {
//   if (filter === "completed") return completedTasks;
//   if (filter === "pending") return pendingTasks;
//   return tasks;
// };

// // Helper to count tasks for each user (based on who assigned and who received)
// const countTasksByField = (field) => {
//   const filtered = getFilteredTasks();
//   const counts = {};

//   filtered.forEach(task => {
//     const email = task[field]?.email;
//     if (email) {
//       counts[email] = (counts[email] || 0) + 1;
//     }
//   });

//   return Object.entries(counts).map(([email, taskCount]) => ({ email, taskCount }));
// };

// // Reusable functions for different perspectives
// const getUserTaskCounts = () => {
//   const filtered = getFilteredTasks();
//   const counts = {};

//   filtered.forEach(task => {
//     const to = task.assignedTo?.email;
//     const by = task.assignedBy?.email;

//     if (to) counts[to] = (counts[to] || 0) + 1;
//     if (by) counts[by] = (counts[by] || 0) + 1;
//   });

//   return Object.entries(counts).map(([email, taskCount]) => ({ email, taskCount }));
// };

// const getAssignedToUsers = () => countTasksByField("assignedTo");
// const getAssignedByUsers = () => countTasksByField("assignedBy");

// // Return tasks for selected user and role
// const getUserTasks = () => {
//   if (!selectedEmail) return [];

//   return getFilteredTasks().filter(task => {
//     const toEmail = task.assignedTo?.email;
//     const byEmail = task.assignedBy?.email;

//     if (selectedRole === "assignedTo") return toEmail === selectedEmail;
//     if (selectedRole === "assignedBy") return byEmail === selectedEmail;

//     return toEmail === selectedEmail || byEmail === selectedEmail;
//   });
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6">
//       <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text animate-fade-in">
//         Task Dashboard
//       </h1>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
//         {[
//           { label: "Total", count: totalTasks, value: "all", color: "from-yellow-400 to-yellow-600" },
//           { label: "Completed", count: completedTasks.length, value: "completed", color: "from-green-400 to-green-600" },
//           { label: "Pending", count: pendingTasks.length, value: "pending", color: "from-red-400 to-red-600" },
//         ].map((card) => (
//           <div
//             key={card.label}
//             onClick={() => {
//               setFilter(card.value);
//               setSelectedEmail(null);
//               setSelectedRole(null);
//             }}
//             className={`transition-all duration-300 transform cursor-pointer p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl hover:scale-105 hover:shadow-2xl ${
//               filter === card.value && !selectedEmail ? "ring-2 ring-purple-400" : ""
//             }`}
//           >
//             <h2 className={`text-xl font-semibold bg-gradient-to-r ${card.color} text-transparent bg-clip-text`}>
//               {card.label}
//             </h2>
//             <p className="text-4xl font-bold mt-2 text-white">{card.count}</p>
//           </div>
//         ))}
//       </div>

//       {/* Email List or Task Details */}
//       <div className="max-w-6xl mx-auto animate-fade-in">
//         <h2 className="text-2xl font-semibold mb-6 text-purple-300">
//           {selectedEmail ? `${selectedEmail}'s Tasks` : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Users`}
//         </h2>

//         {selectedEmail && (
//           <button
//             onClick={() => {
//               setSelectedEmail(null);
//               setSelectedRole(null);
//             }}
//             className="mb-6 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition"
//           >
//             ← Back to Users
//           </button>
//         )}

//         {/* Task Cards */}
//         {selectedEmail ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {getUserTasks().map((task) => (
//               <div
//                 key={task._id}
//                 className="bg-white/10 border border-white/20 backdrop-blur-lg p-5 rounded-xl hover:shadow-lg hover:scale-[1.01] transition-all"
//               >
//                 <h3 className="text-lg font-bold text-purple-200">{task.title}</h3>
//                 <p className="text-sm text-gray-300">{task.content}</p>
//                 <p className="text-xs text-gray-400 mt-2">{task.date}</p>
//                 <p className="mt-2 text-sm text-blue-200">
//                   Assigned To: <span className="text-white">{task.assignedTo?.email || "N/A"}</span>
//                 </p>
//                 <p className="text-sm text-blue-200">
//                   Assigned By: <span className="text-white">{task.assignedBy?.email || "N/A"}</span>
//                 </p>
//                 <p className="mt-2 text-sm">
//                   Status:{" "}
//                   {task.completed ? (
//                     <span className="text-green-400 font-semibold">Completed</span>
//                   ) : (
//                     <span className="text-red-400 font-semibold">Pending</span>
//                   )}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : filter === "all" ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {getUserTaskCounts().map((user) => (
//               <div
//                 key={user.email}
//                 onClick={() => {
//                   setSelectedEmail(user.email);
//                   setSelectedRole(null);
//                 }}
//                 className="cursor-pointer p-6 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-center hover:shadow-lg hover:scale-[1.02] transition"
//               >
//                 <p className="text-lg font-semibold text-pink-300">{user.email}</p>
//                 <p className="text-sm text-gray-300 mt-1">Tasks: {user.taskCount}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid gap-10">
//             {/* Assigned To */}
//             <div>
//               <h3 className="text-lg font-bold text-green-300 mb-4">Assigned To</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {getAssignedToUsers().map((user) => (
//                   <div
//                     key={user.email}
//                     onClick={() => {
//                       setSelectedEmail(user.email);
//                       setSelectedRole("assignedTo");
//                     }}
//                     className="cursor-pointer p-6 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-center hover:shadow-lg hover:scale-[1.02] transition"
//                   >
//                     <p className="text-lg font-semibold text-purple-300">{user.email}</p>
//                     <p className="text-sm text-gray-300 mt-1">Tasks: {user.taskCount}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Assigned By */}
//             <div>
//               <h3 className="text-lg font-bold text-yellow-300 mb-4 mt-10">Assigned By</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {getAssignedByUsers().map((user) => (
//                   <div
//                     key={user.email}
//                     onClick={() => {
//                       setSelectedEmail(user.email);
//                       setSelectedRole("assignedBy");
//                     }}
//                     className="cursor-pointer p-6 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-center hover:shadow-lg hover:scale-[1.02] transition"
//                   >
//                     <p className="text-lg font-semibold text-purple-300">{user.email}</p>
//                     <p className="text-sm text-gray-300 mt-1">Tasks: {user.taskCount}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskDash;


// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// const TaskDash = () => {
//     const tasks = useSelector((state) => state.tasks.tasks);

//     const totalTasks = tasks.length;
//     const completedTasks = tasks.filter(task => task.completed);
//     const pendingTasks = tasks.filter(task => !task.completed);

//     const [filter, setFilter] = useState("all");
//     const [selectedEmail, setSelectedEmail] = useState(null);
//     const [selectedRole, setSelectedRole] = useState(null);

//     const getFilteredTasks = () => {
//         if (filter === "completed") return completedTasks;
//         if (filter === "pending") return pendingTasks;
//         return tasks;
//     };

//     const countTasksByField = (field) => {
//         const filtered = getFilteredTasks();
//         const counts = {};

//         filtered.forEach(task => {
//             const email = task[field]?.email;
//             if (email) {
//                 counts[email] = (counts[email] || 0) + 1;
//             }
//         });

//         return Object.entries(counts).map(([email, taskCount]) => ({ email, taskCount }));
//     };

//     const getUserTaskCounts = () => {
//         const filtered = getFilteredTasks();
//         const counts = {};

//         filtered.forEach(task => {
//             const to = task.assignedTo?.email;
//             const by = task.assignedBy?.email;

//             if (to) counts[to] = (counts[to] || 0) + 1;
//             if (by) counts[by] = (counts[by] || 0) + 1;
//         });

//         return Object.entries(counts).map(([email, taskCount]) => ({ email, taskCount }));
//     };

//     const getAssignedToUsers = () => countTasksByField("assignedTo");
//     const getAssignedByUsers = () => countTasksByField("assignedBy");

//     const getUserTasks = () => {
//         if (!selectedEmail) return [];

//         return getFilteredTasks().filter(task => {
//             const toEmail = task.assignedTo?.email;
//             const byEmail = task.assignedBy?.email;

//             if (selectedRole === "assignedTo") return toEmail === selectedEmail;
//             if (selectedRole === "assignedBy") return byEmail === selectedEmail;

//             return toEmail === selectedEmail || byEmail === selectedEmail;
//         });
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#1b1b1b] text-white p-6">
//             <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-500 to-pink-600 text-transparent bg-clip-text animate-fade-in-down">
//                 Task Dashboard
//             </h1>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
//                 {[
//                     { label: "Total", count: totalTasks, value: "all", color: "from-yellow-500 to-yellow-700" },
//                     { label: "Completed", count: completedTasks.length, value: "completed", color: "from-green-500 to-green-700" },
//                     { label: "Pending", count: pendingTasks.length, value: "pending", color: "from-red-500 to-red-700" },
//                 ].map((card) => (
//                     <div
//                         key={card.label}
//                         onClick={() => {
//                             setFilter(card.value);
//                             setSelectedEmail(null);
//                             setSelectedRole(null);
//                         }}
//                         className={`transition-transform duration-300 transform cursor-pointer p-6 rounded-2xl bg-[#1f1f1f] border border-white/10 shadow-xl hover:scale-105 hover:shadow-purple-800/40 ${
//                             filter === card.value && !selectedEmail ? "ring-2 ring-purple-500" : ""
//                         } animate-zoom-in`}
//                     >
//                         <h2 className={`text-xl font-semibold bg-gradient-to-r ${card.color} text-transparent bg-clip-text`}>
//                             {card.label}
//                         </h2>
//                         <p className="text-4xl font-bold mt-2 text-white">{card.count}</p>
//                     </div>
//                 ))}
//             </div>

//             <div className="max-w-6xl mx-auto animate-fade-in-up">
//                 <h2 className="text-2xl font-semibold mb-6 text-purple-400">
//                     {selectedEmail ? `${selectedEmail}'s Tasks` : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Users`}
//                 </h2>

//                 {selectedEmail && (
//                     <button
//                         onClick={() => {
//                             setSelectedEmail(null);
//                             setSelectedRole(null);
//                         }}
//                         className="mb-6 px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition"
//                     >
//                         ← Back to Users
//                     </button>
//                 )}

//                 {selectedEmail ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {getUserTasks().map((task) => (
//                             <div
//                                 key={task._id}
//                                 className="bg-[#2a2a2a] border border-white/10 p-5 rounded-xl hover:shadow-lg hover:scale-[1.01] transition-transform animate-fade-in-up"
//                             >
//                                 <h3 className="text-lg font-bold text-purple-300">{task.title}</h3>
//                                 <p className="text-sm text-gray-300">{task.content}</p>
//                                 <p className="text-xs text-gray-500 mt-2">{task.date}</p>
//                                 <p className="mt-2 text-sm text-blue-300">
//                                     Assigned To: <span className="text-white">{task.assignedTo?.email || "N/A"}</span>
//                                 </p>
//                                 <p className="text-sm text-blue-300">
//                                     Assigned By: <span className="text-white">{task.assignedBy?.email || "N/A"}</span>
//                                 </p>
//                                 <p className="mt-2 text-sm">
//                                     Status: {task.completed ? (
//                                         <span className="text-green-400 font-semibold">Completed</span>
//                                     ) : (
//                                         <span className="text-red-400 font-semibold">Pending</span>
//                                     )}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 ) : filter === "all" ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {getUserTaskCounts().map((user) => (
//                             <div
//                                 key={user.email}
//                                 onClick={() => {
//                                     setSelectedEmail(user.email);
//                                     setSelectedRole(null);
//                                 }}
//                                 className="cursor-pointer p-6 rounded-xl bg-[#1f1f1f] border border-white/10 text-center hover:shadow-lg hover:scale-[1.02] transition-transform animate-fade-in-up"
//                             >
//                                 <p className="text-lg font-semibold text-pink-400">{user.email}</p>
//                                 {/* <p className="text-sm text-gray-300 mt-1">Tasks: {user.taskCount}</p> */}
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="grid gap-10">
//                         <div>
//                             <h3 className="text-lg font-bold text-green-400 mb-4">Assigned To</h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                                 {getAssignedToUsers().map((user) => (
//                                     <div
//                                         key={user.email}
//                                         onClick={() => {
//                                             setSelectedEmail(user.email);
//                                             setSelectedRole("assignedTo");
//                                         }}
//                                         className="cursor-pointer p-6 rounded-xl bg-[#1f1f1f] border border-white/10 text-center hover:shadow-lg hover:scale-[1.02] transition-transform animate-fade-in-up"
//                                     >
//                                         <p className="text-lg font-semibold text-purple-400">{user.email}</p>
//                                         {/* <p className="text-sm text-gray-300 mt-1">Tasks: {user.taskCount}</p> */}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         <div>
//                             <h3 className="text-lg font-bold text-yellow-400 mb-4 mt-10">Assigned By</h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                                 {getAssignedByUsers().map((user) => (
//                                     <div
//                                         key={user.email}
//                                         onClick={() => {
//                                             setSelectedEmail(user.email);
//                                             setSelectedRole("assignedBy");
//                                         }}
//                                         className="cursor-pointer p-6 rounded-xl bg-[#1f1f1f] border border-white/10 text-center hover:shadow-lg hover:scale-[1.02] transition-transform animate-fade-in-up"
//                                     >
//                                         <p className="text-lg font-semibold text-purple-400">{user.email}</p>
//                                         {/* <p className="text-sm text-gray-300 mt-1">Tasks: {user.taskCount}</p> */}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TaskDash;








import React, { useState } from "react";
import { useSelector } from "react-redux";

const TaskDash = () => {
    const tasks = useSelector((state) => state.tasks.tasks);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed);
    const pendingTasks = tasks.filter(task => !task.completed);

    const [filter, setFilter] = useState("all");
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const getFilteredTasks = () => {
        if (filter === "completed") return completedTasks;
        if (filter === "pending") return pendingTasks;
        return tasks;
    };

    const countTasksByField = (field) => {
        const filtered = getFilteredTasks();
        const counts = {};

        filtered.forEach(task => {
            const email = task[field]?.email;
            if (email) {
                counts[email] = (counts[email] || 0) + 1;
            }
        });

        return Object.entries(counts).map(([email, taskCount]) => ({ email, taskCount }));
    };

    const getUserTaskCounts = () => {
        const filtered = getFilteredTasks();
        const counts = {};

        filtered.forEach(task => {
            const to = task.assignedTo?.email;
            const by = task.assignedBy?.email;

            if (to) counts[to] = (counts[to] || 0) + 1;
            if (by) counts[by] = (counts[by] || 0) + 1;
        });

        return Object.entries(counts).map(([email, taskCount]) => ({ email, taskCount }));
    };

    const getAssignedToUsers = () => countTasksByField("assignedTo");
    const getAssignedByUsers = () => countTasksByField("assignedBy");

    const getUserTasks = () => {
        if (!selectedEmail) return [];

        return getFilteredTasks().filter(task => {
            const toEmail = task.assignedTo?.email;
            const byEmail = task.assignedBy?.email;

            if (selectedRole === "assignedTo") return toEmail === selectedEmail;
            if (selectedRole === "assignedBy") return byEmail === selectedEmail;

            return toEmail === selectedEmail || byEmail === selectedEmail;
        });
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
    const handleSortChange = (e) => setSortOrder(e.target.value);

    const applySearchAndSortUsers = (users) => {
        const filtered = users.filter(user => user.email.toLowerCase().includes(searchTerm));
        const sorted = filtered.sort((a, b) => 
            sortOrder === "asc" ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)
        );
        return sorted;
    };

    const applySearchAndSortTasks = (tasks) => {
        const filtered = tasks.filter(task => task.title.toLowerCase().includes(searchTerm) || task.content.toLowerCase().includes(searchTerm));
        const sorted = filtered.sort((a, b) => 
            sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );
        return sorted;
    };
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#1b1b1b] text-white p-6">
            <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-500 to-pink-600 text-transparent bg-clip-text animate-fade-in-down">
                Task Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                {[
                    { label: "Total", count: totalTasks, value: "all", color: "from-yellow-500 to-yellow-700" },
                    { label: "Completed", count: completedTasks.length, value: "completed", color: "from-green-500 to-green-700" },
                    { label: "Pending", count: pendingTasks.length, value: "pending", color: "from-red-500 to-red-700" },
                ].map((card) => (
                    <div
                        key={card.label}
                        onClick={() => {
                            setFilter(card.value);
                            setSelectedEmail(null);
                            setSelectedRole(null);
                            setSearchTerm("");  // Clear search on changing filter
                        }}
                        className={`transition-transform duration-300 transform cursor-pointer p-6 rounded-2xl bg-[#1f1f1f] border border-white/10 shadow-xl hover:scale-105 hover:shadow-purple-800/40 ${
                            filter === card.value && !selectedEmail ? "ring-2 ring-purple-500" : ""
                        } animate-zoom-in`}
                    >
                        <h2 className={`text-xl font-semibold bg-gradient-to-r ${card.color} text-transparent bg-clip-text`}>
                            {card.label}
                        </h2>
                        <p className="text-4xl font-bold mt-2 text-white">{card.count}</p>
                    </div>
                ))}
            </div>

            <div className="max-w-6xl mx-auto animate-fade-in-up">
                <h2 className="text-2xl font-semibold mb-6 text-purple-400">
                    {selectedEmail ? `${selectedEmail}'s Tasks` : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Users`}
                </h2>

                {/* New: Search and Sort UI */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder={selectedEmail ? "Search Tasks..." : "Search Users..."}
                        className="bg-white text-black placeholder-gray-500 border border-gray-300 rounded-md px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="px-4 py-2 rounded-lg bg-white text-black w-full sm:w-40"
                    >
                        <option value="asc">Sort A-Z</option>
                        <option value="desc">Sort Z-A</option>
                    </select>
                </div>

                {selectedEmail && (
                    <button
                        onClick={() => {
                            setSelectedEmail(null);
                            setSelectedRole(null);
                            setSearchTerm("");  // Clear search when going back
                        }}
                        className="mb-6 px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition"
                    >
                        ← Back to Users
                    </button>
                )}

                {selectedEmail ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {applySearchAndSortTasks(getUserTasks()).map((task) => (
                            <div
                                key={task._id}
                                className="bg-[#2a2a2a] border border-white/10 p-5 rounded-xl hover:shadow-lg hover:scale-[1.01] transition-transform animate-fade-in-up"
                            >
                                <h3 className="text-lg font-bold text-purple-300">{task.title}</h3>
                                <p className="text-sm text-gray-300">{task.content}</p>
                                <p className="text-xs text-gray-500 mt-2">{task.date}</p>
                                <p className="mt-2 text-sm text-blue-300">
                                    Assigned To: <span className="text-white">{task.assignedTo?.email || "N/A"}</span>
                                </p>
                                <p className="text-sm text-blue-300">
                                    Assigned By: <span className="text-white">{task.assignedBy?.email || "N/A"}</span>
                                </p>
                                <p className="mt-2 text-sm">
                                    Status: {task.completed ? (
                                        <span className="text-green-400 font-semibold">Completed</span>
                                    ) : (
                                        <span className="text-red-400 font-semibold">Pending</span>
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : filter === "all" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {applySearchAndSortUsers(getUserTaskCounts()).map((user) => (
                            <div
                                key={user.email}
                                onClick={() => {
                                    setSelectedEmail(user.email);
                                    setSelectedRole(null);
                                    setSearchTerm(""); // Clear search when selecting a user
                                }}
                                className="cursor-pointer p-6 rounded-xl bg-[#1f1f1f] border border-white/10 text-center hover:shadow-lg hover:scale-[1.02] transition-transform animate-fade-in-up"
                            >
                                <p className="text-lg font-semibold text-pink-400">{user.email}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-10">
                        <div>
                            <h3 className="text-lg font-bold text-green-400 mb-4">Assigned To</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {applySearchAndSortUsers(getAssignedToUsers()).map((user) => (
                                    <div
                                        key={user.email}
                                        onClick={() => {
                                            setSelectedEmail(user.email);
                                            setSelectedRole("assignedTo");
                                            setSearchTerm("");
                                        }}
                                        className="cursor-pointer p-6 rounded-xl bg-[#1f1f1f] border border-white/10 text-center hover:shadow-lg hover:scale-[1.02] transition-transform animate-fade-in-up"
                                    >
                                        <p className="text-lg font-semibold text-purple-400">{user.email}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-yellow-400 mb-4 mt-10">Assigned By</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {applySearchAndSortUsers(getAssignedByUsers()).map((user) => (
                                    <div
                                        key={user.email}
                                        onClick={() => {
                                            setSelectedEmail(user.email);
                                            setSelectedRole("assignedBy");
                                            setSearchTerm("");
                                        }}
                                        className="cursor-pointer p-6 rounded-xl bg-[#1f1f1f] border border-white/10 text-center hover:shadow-lg hover:scale-[1.02] transition-transform animate-fade-in-up"
                                    >
                                        <p className="text-lg font-semibold text-purple-400">{user.email}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskDash;

