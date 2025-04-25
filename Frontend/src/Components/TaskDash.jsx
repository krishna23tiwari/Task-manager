// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// const TaskDash = () => {
//   const tasks = useSelector((state) => state.tasks.tasks);

  
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter((t) => t.completed);
//   const pendingTasks = tasks.filter((t) => !t.completed);

  
//   const [filter, setFilter] = useState("all");


//   const getFilteredTasks = () => {
//     if (filter === "completed") return completedTasks;
//     if (filter === "pending") return pendingTasks;
//     return tasks; 
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
//       <h1 className="text-4xl font-extrabold text-purple-300 mb-10 text-center">
//         Tasks
//       </h1>

//       <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
//         <div
//           onClick={() => setFilter("all")}
//           className={`cursor-pointer bg-gray-700/80 p-6 rounded-xl text-center shadow border border-gray-600 hover:shadow-xl transition ${
//             filter === "all" ? "ring-2 ring-yellow-400" : ""
//           }`}
//         >
//           <h2 className="text-2xl font-semibold text-yellow-300">Total</h2>
//           <p className="text-4xl font-bold mt-2">{totalTasks}</p>
//         </div>

//         <div
//           onClick={() => setFilter("completed")}
//           className={`cursor-pointer bg-gray-700/80 p-6 rounded-xl text-center shadow border border-gray-600 hover:shadow-xl transition ${
//             filter === "completed" ? "ring-2 ring-green-400" : ""
//           }`}
//         >
//           <h2 className="text-2xl font-semibold text-green-300">Completed</h2>
//           <p className="text-4xl font-bold mt-2">{completedTasks.length}</p>
//         </div>

//         <div
//           onClick={() => setFilter("pending")}
//           className={`cursor-pointer bg-gray-700/80 p-6 rounded-xl text-center shadow border border-gray-600 hover:shadow-xl transition ${
//             filter === "pending" ? "ring-2 ring-red-400" : ""
//           }`}
//         >
//           <h2 className="text-2xl font-semibold text-red-400">Pending</h2>
//           <p className="text-4xl font-bold mt-2">{pendingTasks.length}</p>
//         </div>
//       </div>


//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-2xl font-semibold text-blue-300 mb-6 capitalize">
//           {filter} Tasks
//         </h2>
//         {getFilteredTasks().length === 0 ? (
//           <p className="text-gray-400">No tasks available.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {getFilteredTasks().map((task) => (
//               <div
//                 key={task._id}
//                 className="bg-gray-700/70 p-5 rounded-xl border border-gray-600 hover:shadow-xl transition-shadow"
//               >
//                 <h3 className="text-xl font-bold text-purple-200">{task.title}</h3>
//                 <p className="text-gray-300 mt-1">{task.content}</p>
//                 <p className="text-xs text-gray-500 mt-2">{task.date}</p>
//                 <p className="text-sm mt-3">
//                   <span className="font-semibold text-gray-400">Assigned To:</span>{" "}
//                   {task.assignedTo?.firstname} {task.assignedTo?.lastname}
//                 </p>
//                 <p className="text-sm">
//                   <span className="font-semibold text-gray-400">Assigned By:</span>{" "}
//                   {task.assignedBy?.firstname} {task.assignedBy?.lastname}
//                 </p>
//                 <p className="mt-2 text-sm">
//                   <span className="font-semibold text-gray-400">Status:</span>{" "}
//                   {task.completed ? (
//                     <span className="text-green-400 font-semibold">Completed</span>
//                   ) : (
//                     <span className="text-red-400 font-semibold">Pending</span>
//                   )}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskDash;


import React, { useState } from "react";
import { useSelector } from "react-redux";

const TaskDash = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed);
  const pendingTasks = tasks.filter((t) => !t.completed);

  console.log(`>>>>check>>>>>`,totalTasks.firstname)
  console.log(`>>>>>complete>>>>>`, completedTasks.firstname)
  console.log(`>>>>>pending>>>>>>>`, pendingTasks.firstname)

  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  const getFilteredTasks = () => {
    if (filter === "completed") return completedTasks;
    if (filter === "pending") return pendingTasks;
    return tasks;
  };

//   const getUniqueUsers = () => {
//     const filtered = getFilteredTasks();

//     const userMap = new Map();

//     filtered.forEach((task) => {
//       const to = task.assignedTo;
//       const by = task.assignedBy;

//       if (to?._id && !userMap.has(to._id)) {
//         userMap.set(to._id, to);
//       }
//       if (by?._id && !userMap.has(by._id)) {
//         userMap.set(by._id, by);
//       }
//     });

//     return Array.from(userMap.values());
//   };

const getUniqueUsers = () => {
    const filteredTasks = getFilteredTasks();
  
    // Get unique users who either created or were assigned tasks
    const usersWithTasks = [];
  
    filteredTasks.forEach((task) => {
      const to = task.assignedTo;
      const by = task.assignedBy;
  
      if (to && to._id) {
        const existing = usersWithTasks.find((u) => u._id === to._id);
        if (!existing) {
          usersWithTasks.push({ ...to, taskCount: 0 });
        }
      }
  
      if (by && by._id) {
        const existing = usersWithTasks.find((u) => u._id === by._id);
        if (!existing) {
          usersWithTasks.push({ ...by, taskCount: 0 });
        }
      }
    });
  
    // Count tasks for each user
    usersWithTasks.forEach((user) => {
      user.taskCount = filteredTasks.filter(
        (task) =>
          (task.assignedBy?._id === user._id || task.assignedTo?._id === user._id)
      ).length;
    });
  
    return usersWithTasks;
  };
  
  
  

//   const getUserTasks = () => {
//     if (!selectedUser) return [];

//     return getFilteredTasks().filter(
//       (task) =>
//         // task.assignedTo?._id === selectedUser._id &&
//         // task.assignedBy?._id === selectedUser._id
//         (task.assignedTo?._id === selectedUser._id ||
//             task.assignedBy?._id === selectedUser._id) &&
//            task.assignedTo && task.assignedBy
//     );
//   };

const getUserTasks = () => {
    if (!selectedUser) return [];
  
    return getFilteredTasks().filter(
      (task) =>
        (task.assignedTo?._id === selectedUser._id || task.assignedBy?._id === selectedUser._id) &&
        task.assignedTo?._id &&
        task.assignedBy?._id
    );
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h1 className="text-4xl font-extrabold text-purple-300 mb-10 text-center">
        Tasks
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div
          onClick={() => {
            setFilter("all");
            setSelectedUser(null);
          }}
          className={`cursor-pointer bg-gray-700/80 p-6 rounded-xl text-center shadow border border-gray-600 hover:shadow-xl transition ${
            filter === "all" && !selectedUser ? "ring-2 ring-yellow-400" : ""
          }`}
        >
          <h2 className="text-2xl font-semibold text-yellow-300">Total</h2>
          <p className="text-4xl font-bold mt-2">{totalTasks}</p>
        </div>

        <div
          onClick={() => {
            setFilter("completed");
            setSelectedUser(null);
          }}
          className={`cursor-pointer bg-gray-700/80 p-6 rounded-xl text-center shadow border border-gray-600 hover:shadow-xl transition ${
            filter === "completed" && !selectedUser ? "ring-2 ring-green-400" : ""
          }`}
        >
          <h2 className="text-2xl font-semibold text-green-300">Completed</h2>
          <p className="text-4xl font-bold mt-2">{completedTasks.length}</p>
        </div>

        <div
          onClick={() => {
            setFilter("pending");
            setSelectedUser(null);
          }}
          className={`cursor-pointer bg-gray-700/80 p-6 rounded-xl text-center shadow border border-gray-600 hover:shadow-xl transition ${
            filter === "pending" && !selectedUser ? "ring-2 ring-red-400" : ""
          }`}
        >
          <h2 className="text-2xl font-semibold text-red-400">Pending</h2>
          <p className="text-4xl font-bold mt-2">{pendingTasks.length}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-300 mb-6 capitalize">
          {selectedUser ? `Tasks for ${selectedUser.firstname} ${selectedUser.lastname}` : `${filter} Users`}
        </h2>

        {selectedUser ? (
          getUserTasks().length === 0 ? (
            <p className="text-gray-400">No tasks for this user.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getUserTasks().map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-700/70 p-5 rounded-xl border border-gray-600 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold text-purple-200">{task.title}</h3>
                  <p className="text-gray-300 mt-1">{task.content}</p>
                  <p className="text-xs text-gray-500 mt-2">{task.date}</p>
                  {/* <p className="text-sm mt-3">
                    <span className="font-semibold text-gray-400">Assigned To:</span>{" "}
                    {task.assignedTo?.firstname} {task.assignedTo?.lastname}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-gray-400">Assigned By:</span>{" "}
                    {task.assignedBy?.firstname} {task.assignedBy?.lastname}
                  </p> */}

                  {task.assignedTo ? (
  <p className="text-sm mt-3">
    <span className="font-semibold text-gray-400">Assigned To:</span>{" "}
    {task.assignedTo.firstname} {task.assignedTo.lastname}
  </p>
) : (
  <p className="text-sm mt-3 text-yellow-400 italic">Assigned To: Not specified</p>
)}

{task.assignedBy ? (
  <p className="text-sm">
    <span className="font-semibold text-gray-400">Assigned By:</span>{" "}
    {task.assignedBy.firstname} {task.assignedBy.lastname}
  </p>
) : (
  <p className="text-sm text-yellow-400 italic">Assigned By: Not specified</p>
)}

                  <p className="mt-2 text-sm">
                    <span className="font-semibold text-gray-400">Status:</span>{" "}
                    {task.completed ? (
                      <span className="text-green-400 font-semibold">Completed</span>
                    ) : (
                      <span className="text-red-400 font-semibold">Pending</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {getUniqueUsers().map((user) => (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className="cursor-pointer bg-gray-700/70 p-5 rounded-xl border border-gray-600 hover:shadow-xl transition-shadow text-center"
              >
                <p className="text-xl font-semibold text-purple-300">{user.firstname} {user.lastname}</p>
                <p className="text-sm text-gray-400 mt-1">Click to view tasks</p>
              </div>
            ))} */}

            {getUniqueUsers().map((user) => (
  <div
    key={user._id}
    onClick={() => setSelectedUser(user)}
    className="cursor-pointer bg-gray-700/70 p-5 rounded-xl border border-gray-600 hover:shadow-xl transition-shadow text-center"
  >
    <p className="text-xl font-semibold text-purple-300">
      {user.firstname} {user.lastname}
    </p>
    <p className="text-sm text-gray-400 mt-1">Tasks: {user.taskCount}</p>
  </div>
))}

          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDash;
