import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const TaskHandle = () => {
  const [tasksAssignedToUser, setTasksAssignedToUser] = useState([]);
  const [tasksAssignedByUser, setTasksAssignedByUser] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [loadingTaskId, setLoadingTaskId] = useState(null);

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
      const res = await axios.get(
        "http://localhost:2020/work/show",
        getAuthHeaders()
      );
      const tasks = res.data.notesData;
      const currentUserEmail = res.data.currentUserEmail;

      setUserEmail(currentUserEmail);

      const assignedToUser = tasks.filter(
        (task) => task.assignedTo?.email === currentUserEmail
      );

      const assignedByUser = tasks.filter(
        (task) => task.assignedBy?.email === currentUserEmail
      );

      setTasksAssignedToUser(assignedToUser);
      setTasksAssignedByUser(assignedByUser);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2020/work/${id}`, getAuthHeaders());
      toast.success("Task deleted!");
      fetchTasks();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleComplete = async (id) => {
    setLoadingTaskId(id);
    try {
      await axios.put(
        `http://localhost:2020/work/${id}/complete`,
        {},
        getAuthHeaders()
      );
      toast.success("Task marked as complete");
      fetchTasks();
    } catch (err) {
      console.error("Error completing task:", err);
      toast.error("Failed to mark task as complete");
    } finally {
      setLoadingTaskId(null);
    }
  };


  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-extrabold text-purple-300">
          Tasks
        </h1>
        <Link
          to="/task"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md transition-all ease-in"
        >
          + Add Task
        </Link>
      </div>

      <div className="max-w-7xl mx-auto space-y-14">
        <section>
          <h2 className="text-2xl font-semibold text-green-400 mb-6">
            Tasks Assigned By Me ({tasksAssignedByUser.length})
          </h2>
          {tasksAssignedByUser.length === 0 ? (
            <p className="text-gray-400 text-center">
              You haven't assigned any tasks yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {tasksAssignedByUser.map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-700/70 hover:shadow-xl transition-shadow p-6 rounded-xl border border-gray-600"
                >
                  <h2 className="text-xl font-bold text-purple-200">
                    {task.title}
                  </h2>
                  <p className="text-gray-300 mt-2">{task.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{task.date}</p>

                  <div className="mt-4 text-sm space-y-1">
                    <p className="text-purple-400 font-semibold">
                      Assigned to:
                    </p>
                    <p>
                      {task.assignedTo?.firstname} {task.assignedTo?.lastname}
                    </p>
                    <p className="text-xs text-purple-500">
                      {task.assignedTo?.email}
                    </p>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <Link to="/task" state={{ task }} title="Edit">
                      <Pencil className="text-blue-400 hover:text-blue-300 cursor-pointer" />
                    </Link>

                    <Trash2
                      onClick={() => handleDelete(task._id)}
                      className="text-red-400 hover:text-red-300 cursor-pointer"
                      title="Delete"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-6">
            Tasks Assigned To Me ({tasksAssignedToUser.length})
          </h2>
          {tasksAssignedToUser.length === 0 ? (
            <p className="text-gray-400 text-center">
              No tasks assigned to you yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {tasksAssignedToUser.map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-700/70 hover:shadow-xl transition-shadow p-6 rounded-xl border border-gray-600"
                >
                  <h2 className="text-xl font-bold text-purple-200">
                    {task.title}
                  </h2>
                  <p className="text-gray-300 mt-2">{task.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{task.date}</p>

                  <div className="mt-4 text-sm space-y-1">
                    <p className="text-gray-300 font-semibold">Assigned by:</p>
                    <p>
                      {task.assignedBy?.firstname} {task.assignedBy?.lastname}
                    </p>
                    <p className="text-xs text-gray-400">
                      {task.assignedBy?.email}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    {task.completed ? (
                      <span className="text-green-400 font-medium">
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => handleComplete(task._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                        disabled={loadingTaskId === task._id}
                      >
                        {loadingTaskId === task._id ? "Loading..." : "Complete"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TaskHandle;
