import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

const TaskHandle = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);

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
      const res = await axios.get('http://localhost:2020/work/show', getAuthHeaders());
      setTasks(res.data.notesData);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddOrUpdate = async () => {
    const { title, content } = formData;
    if (!title || !content) return toast.error("Please fill all fields");

    try {
      if (editingId) {
        await axios.put(`http://localhost:2020/work/${editingId}`, formData, getAuthHeaders());
        toast.success("Task updated!");
      } else {
        const date = new Date().toLocaleString();
        await axios.post('http://localhost:2020/work/add', { ...formData, date }, getAuthHeaders());
        toast.success("Task added!");
      }
      setFormData({ title: '', content: '' });
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      toast.error("Error saving task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2020/work/${id}`, getAuthHeaders());
      toast.success("Task deleted!");
      fetchTasks();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = (task) => {
    setFormData({ title: task.title, content: task.content });
    setEditingId(task._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>


      <div className="bg-white p-4 rounded shadow mb-6">
  <input
    type="text"
    placeholder="Task title"
    value={formData.title}
    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    className="w-full border p-2 mb-2 rounded"
  />
  <textarea
    placeholder="Task details"
    value={formData.content}
    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
    className="w-full border p-2 mb-4 rounded"
  />

  <div className="flex justify-between">
    <button
      onClick={handleAddOrUpdate}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {editingId ? 'Update Task' : 'Add Task'}
    </button>

    <Link to={'/dash'}
      onClick={() => navigate('/dashboard')}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Go to Dashboard
    </Link>
  </div>
</div>


      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg">{task.title}</h2>
                <p className="text-sm text-gray-600">{task.content}</p>
                <p className="text-xs text-gray-400 mt-1">{task.date}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskHandle;

