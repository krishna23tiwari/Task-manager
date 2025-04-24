// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// const TaskHandle = () => {
//   const [tasks, setTasks] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     assignedTo: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [users, setUsers] = useState([]);

//   const getAuthHeaders = () => {
//     const token = localStorage.getItem("token");
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:2020/work/show",
//         getAuthHeaders()
//       );
//       setTasks(res.data.notesData);
//     } catch (err) {
//       toast.error("Failed to fetch tasks");
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:2020/user/all",
//         getAuthHeaders()
//       );
//       setUsers(res.data.users);
//     } catch (err) {
//       toast.error("Failed to fetch users");
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//     fetchUsers();
//   }, []);

//   const handleAddOrUpdate = async () => {
//     const { title, content, assignedTo } = formData;
//     if (!title || !content)
//       return toast.error("Please fill all fields");

//     try {
//       if (editingId) {
//         await axios.put(
//           `http://localhost:2020/work/${editingId}`,
//           { title, content, assignedTo },
//           getAuthHeaders()
//         );
//         toast.success("Task updated!");
//       } else {
//         const date = new Date().toLocaleString();
//         await axios.post(
//           "http://localhost:2020/work/add",
//           { title, content, assignedTo, date },
//           getAuthHeaders()
//         );
//         toast.success("Task added!");
//       }
//       setFormData({ title: "", content: "", assignedTo: "" });
//       setEditingId(null);
//       fetchTasks();
//     } catch (err) {
//       toast.error("Error saving task");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(
//         `http://localhost:2020/work/${id}`,
//         getAuthHeaders()
//       );
//       toast.success("Task deleted!");
//       fetchTasks();
//     } catch {
//       toast.error("Failed to delete");
//     }
//   };

//   const handleEdit = (task) => {
//     setFormData({
//       title: task.title,
//       content: task.content,
//       assignedTo: task.assignedTo?._id || "",
//     });
//     setEditingId(task._id);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Task Manager</h1>

//       <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-2xl shadow-xl max-w-3xl mx-auto mb-10">
//         <input
//           type="text"
//           placeholder="Task title"
//           value={formData.title}
//           onChange={(e) =>
//             setFormData({ ...formData, title: e.target.value })
//           }
//           className="w-full bg-gray-800 border border-gray-600 text-white p-3 mb-4 rounded"
//         />
//         <textarea
//           placeholder="Task details"
//           value={formData.content}
//           onChange={(e) =>
//             setFormData({ ...formData, content: e.target.value })
//           }
//           className="w-full bg-gray-800 border border-gray-600 text-white p-3 mb-4 rounded"
//         />
//         <select
//           value={formData.assignedTo}
//           onChange={(e) =>
//             setFormData({ ...formData, assignedTo: e.target.value })
//           }
//           className="w-full bg-gray-800 border border-gray-600 text-white p-3 mb-4 rounded"
//         >
//           <option value="">Select user to assign</option>
//           {users.map((user) => (
//             <option key={user._id} value={user._id}>
//               {user.firstname} {user.lastname} ({user.email})
//             </option>
//           ))}
//         </select>

//         <div className="flex justify-between">
//           <button
//             onClick={handleAddOrUpdate}
//             className="bg-blue-600 hover:bg-blue-700 px-5 py-3 text-lg rounded text-white font-semibold"
//           >
//             {editingId ? "Update Task" : "Add Task"}
//           </button>

//           <Link
//             to="/dash"
//             className="bg-green-600 hover:bg-green-700 px-5 py-3 text-lg rounded text-white font-semibold"
//           >
//             Go to Dashboard
//           </Link>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//         {tasks.map((task) => (
//           <div
//             key={task._id}
//             className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-2xl shadow-2xl hover:scale-[1.01] transition duration-300 ease-in"
//           >
//             <h2 className="text-xl font-bold text-purple-300">{task.title}</h2>
//             <p className="text-gray-300 mt-2">{task.content}</p>
//             <p className="text-xs text-gray-500 mt-1">{task.date}</p>

//             {task.assignedBy && (
//               <div className="mt-4 text-sm">
//                 <p className="text-gray-400 font-semibold">Assigned by:</p>
//                 <p>
//                   {task.assignedBy.firstname} {task.assignedBy.lastname}
//                 </p>
//                 <p className="text-xs text-gray-500">{task.assignedBy.email}</p>
//               </div>
//             )}

//             {task.assignedTo && (
//               <div className="mt-4 text-sm">
//                 <p className="text-purple-400 font-semibold">Assigned to:</p>
//                 <p>
//                   {task.assignedTo.firstname} {task.assignedTo.lastname}
//                 </p>
//                 <p className="text-xs text-purple-500">{task.assignedTo.email}</p>
//               </div>
//             )}

//             <div className="flex justify-between mt-6">
//               <button
//                 onClick={() => handleEdit(task)}
//                 className="text-blue-400 hover:text-blue-300 text-lg py-2 px-4 rounded-lg"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(task._id)}
//                 className="text-red-400 hover:text-red-300 text-lg py-2 px-4 rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskHandle;


import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TaskHandle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const taskToEdit = location.state?.task || null;

  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    assignedTo: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [users, setUsers] = useState([]);
  const [showTasks, setShowTasks] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:2020/work/show", getAuthHeaders());
      setTasks(res.data.notesData);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:2020/user/all", getAuthHeaders());
      setUsers(res.data.users);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        content: taskToEdit.content,
        assignedTo: taskToEdit.assignedTo?._id || "",
      });
      setEditingId(taskToEdit._id);
    }
  }, [taskToEdit]);

  const handleAddOrUpdate = async () => {
    const { title, content, assignedTo } = formData;
    if (!title || !content) return toast.error("Please fill all fields");

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:2020/work/${editingId}`,
          { title, content, assignedTo },
          getAuthHeaders()
        );
        toast.success("Task updated!");
      } else {
        const date = new Date().toLocaleString();
        await axios.post(
          "http://localhost:2020/work/add",
          { title, content, assignedTo, date },
          getAuthHeaders()
        );
        toast.success("Task added!");
      }
      setFormData({ title: "", content: "", assignedTo: "" });
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      toast.error("Error saving task");
    }
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortAsc) return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Manager</h1>

      <div className="flex justify-between max-w-3xl mx-auto mb-4">
        {/* <Link
          to="/task"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md transition-all ease-in"
        >
          Add Task
        </Link> */}
        <button
          onClick={() => setShowTasks(!showTasks)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md transition-all ease-in"
        >
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>
      </div>

      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950 p-6 rounded-2xl shadow-xl max-w-3xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Task title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 text-white p-3 mb-4 rounded"
        />
        <textarea
          placeholder="Task details"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 text-white p-3 mb-4 rounded"
        />
        <select
          value={formData.assignedTo}
          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 text-white p-3 mb-4 rounded"
        >
          <option value="">Select user to assign</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstname} {user.lastname} ({user.email})
            </option>
          ))}
        </select>

        <div className="flex justify-between">
          <button
            onClick={handleAddOrUpdate}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 text-lg rounded text-white font-semibold"
          >
            {editingId ? "Update Task" : "Add Task"}
          </button>

          <Link
            to="/dash"
            className="bg-green-600 hover:bg-green-700 px-5 py-3 text-lg rounded text-white font-semibold"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      {showTasks && (
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
            <input
              type="text"
              placeholder="Search by title"
              className="w-full sm:w-2/3 p-3 rounded bg-gray-800 border border-gray-600 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
            >
              Sort {sortAsc ? "▲" : "▼"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 p-5 rounded-xl shadow-xl"
              >
                <h2 className="text-xl font-bold text-purple-300 mb-2">{task.title}</h2>
                <p className="text-gray-300">{task.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskHandle;

