const taskmodel = require('../Model/TaskModel')
const user = require('../Model/UserModel')

exports.createrecord = async (req, res) => {
    try {
      
      const emp = new taskmodel(req.body); 
      const data = await emp.save();
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to create task" });
    }
  };

exports.show = async(req, res) =>{
    try {
      
        const notesData = await taskmodel.find()
        .populate("assignedBy", "name email")
        .populate("assignedTo", "name email");
        
        res.status(200).json({ notesData });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes data" });
      }
}


exports.remove = async(req, res) => {
    try {
        const { id } = req.params;
    
    
        const deletedNote = await taskmodel.findByIdAndDelete(id);
    
        if (!deletedNote) {
          return res.status(404).json({ error: "Note not found" });
        }
    
        res.status(200).json({ message: "Note deleted successfully" });
      } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Failed to delete the note" });
      }

  
}

exports.add = async(req, res) => {
    try {
        const newNote = new taskmodel(req.body);
        const savedNote = await newNote.save()
        res.status(201).json({ message: "Note successfully saved", savedNote });

      } catch (error) {
        res.status(500).json({ error: "Failed to save the note" });
      }
    
}

exports.update = async(req, res) => {
    try {
        console.log("Updating note with ID:", req.params.id);
        console.log("New data:", req.body);
        const { title, content } = req.body;
        const updatedNote = await taskmodel.findByIdAndUpdate(
          req.params.id,
          { title, content },
          { new: true }
        );
        res.json(updatedNote);
      } catch (err) {
        res.status(500).json({ error: 'Failed to update note' });
      }
}
  

exports.showAdminDashboard = async (req, res) => {
    try {
        const admins = await user.find({ role: 'admin' }).select('-password');
        const users = await user.find({ role: 'user' }).select('-password');

        const tasks = await taskmodel.find()
          .populate('assignedBy', 'firstname lastname email')
          .populate('assignedTo', 'firstname lastname email');

          console.log(`>>>>tasks>>>>>>>>`)
    
        res.status(200).json({
          totalAdmins: admins.length,
          admins,
          totalUsers: users.length,
          users,
          totalTasks: tasks.length,
          tasks,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
      }
};







exports.showUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

 
    const tasks = await taskmodel.find({ assignedTo: userId })
      .populate('assignedBy', 'firstname lastname')
      .populate('assignedTo', 'firstname lastname');

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user dashboard data' });
  }
};