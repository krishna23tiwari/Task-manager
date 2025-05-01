const taskmodel = require('../Model/TaskModel')
const user = require('../Model/UserModel')
const admin = require('../Model/AdminModel')
const senderemail = "jangiddummy6375@gmail.com";
const mailkey = "hneo ulux pgln lgts";
const { sendTaskAssignedEmail } = require('../Utils/EmailService');
const { sendTaskUpdatedEmail } = require("../Utils/EmailService");
const fileupload = require('express-fileupload')
const{uploadFile} = require('../Utils/ImagesUpload')

exports.ShowUserInDropDown = async (req, res) => {
    try {
      
      const emp = new taskmodel(req.body); 
      const data = await emp.save();
      
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to create task" });
    }
  };


  

exports.ShowAllTasks = async(req, res) =>{
    try {
      
        const notesData = await taskmodel.find()
        .populate("assignedBy", "firstname lastname email")
        .populate("assignedTo", "firstname lastname email");

        console.log(notesData)

        const currentUserEmail = req.user?.email;
        const currentUserId = req.user?._id;
        
        res.status(200).json({ notesData, currentUserEmail,
            currentUserId, });
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



exports.add = async (req, res) => {
    try {
      const { title, content, assignedTo, date } = req.body;
        
      console.log(req.user)
      const newTask = new taskmodel({
        title,
        content,
        assignedBy: req.user._id,
        assignedTo,
        date
      });
  
      await newTask.save();
  
      const assignedUser = await user.findById(assignedTo);
      const assigner = await user.findById(req.user._id);
  
      if (!assignedUser || !assigner) {
        return res.status(400).json({ error: "Assigned user or assigner not found" });
      }
  
      const emailsent = await sendTaskAssignedEmail(
        assignedUser.email,
        assignedUser.firstname,
        title,
        content,
        date,
        assigner.firstname,
        senderemail,
        mailkey
    );

      if (!emailsent) {
        return res.status(500).json({ success: false, error: "Task added but failed to send email" });
      }
  
      return res.status(201).json({ success: true, message: "Task added and email sent" });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Failed to add task" });
    }
  };
  
  

exports.updatetask = async(req, res) => {
    const { id } = req.params;
    try {
      const updatedTask = await taskmodel.findByIdAndUpdate(id, { completed: true }, { new: true });
      res.json({ message: "Task marked as complete", updatedTask });
    } catch (err) {
      res.status(500).json({ error: "Failed to mark as complete" });
    }
}
  

// exports.addTaskWithImage = async (req, res) => {
//     try {
//       let imageUrl = '';
  
//       // If user has uploaded an image
//       if (req.files && Object.keys(req.files).length > 0) {
//         const uploadResult = await uploadFile(req.files);
//         if (uploadResult && uploadResult.length > 0) {
//           imageUrl = uploadResult[0].secure_url;
//         }
//       }
  
//       const { title, content, assignedTo, date } = req.body;
  
//       const newTask = new taskmodel({
//         title,
//         content,
//         assignedBy: req.user._id,
//         assignedTo,
//         date,
//         image: imageUrl, // Save uploaded image URL
//       });
  
//       await newTask.save();
  
//       // Optional: send email after task creation if you want (like you did in other `add` API)
//       const assignedUser = await user.findById(assignedTo);
//       const assigner = await user.findById(req.user._id);
  
//       if (!assignedUser || !assigner) {
//         return res.status(400).json({ error: "Assigned user or assigner not found" });
//       }
  
//       const emailsent = await sendTaskAssignedEmail(
//         assignedUser.email,
//         assignedUser.firstname,
//         title,
//         content,
//         date,
//         assigner.firstname,
//         senderemail,
//         mailkey
//       );
  
//       if (!emailsent) {
//         return res.status(500).json({ success: false, error: "Task added but failed to send email" });
//       }
  
//       res.status(201).json({
//         success: true,
//         message: "Task added with image and email sent successfully",
//         task: newTask
//       });
  
//     } catch (error) {
//       console.error('Error adding task with image:', error);
//       res.status(500).json({ error: 'Failed to add task with image' });
//     }
//   };



exports.addTaskWithImage = async (req, res) => {
    try {
     
      let imageUrl = ''
      if (req.files) {
        const uploadResults = await uploadFile(req.files)
        if (uploadResults.length) imageUrl = uploadResults[0].secure_url
      }
  

      const { title, content, assignedTo, date } = req.body
      const newTask = new taskmodel({
        title,
        content,
        assignedBy: req.user._id,
        assignedTo,
        date,
        image: imageUrl,
      })
      await newTask.save()
  
    
      const assignedUser = await user.findById(assignedTo)
      if (!assignedUser) {
        return res.status(400).json({ error: "Assigned user not found" })
      }
      const assigner = await user.findById(req.user._id)
      if (!assigner) {
        return res.status(400).json({ error: "Assigning user not found" })
      }
  
     
      const emailSent = await sendTaskAssignedEmail(
        assignedUser.email,        
        assignedUser.firstname,    
        title,                     
        content,                   
        date,                      
        assigner.firstname,        
        senderemail,               
        mailkey                    
      )
  
      if (!emailSent) {
        return res
          .status(500)
          .json({ success: false, error: "Task created but failed to send email" })
      }
  
      // 5) All done
      res.status(201).json({
        success: true,
        message: "Task added with image and email sent",
        task: newTask
      })
  
    } catch (error) {
      console.error("Error in addTaskWithImage:", error)
      res.status(500).json({ error: "Failed to add task with image" })
    }
  }
  


exports.update = async (req, res) => {
    try {
      console.log("Updating note with ID:", req.params.id);
      console.log("New data:", req.body);
      const { title, content, assignedTo } = req.body;
  
      const updatedNote = await taskmodel.findByIdAndUpdate(
        req.params.id,
        { title, content, assignedTo },
        { new: true }
      ).populate('assignedTo');
  
      if (!updatedNote) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      // Fetch assigned user and updater info
      const assignedUser = await user.findById(assignedTo);
      const updatedBy = await user.findById(req.user._id);
  
      if (assignedUser && updatedBy) {
        await sendTaskUpdatedEmail(
          assignedUser.email,
          assignedUser.firstname,
          title,
          content,
          updatedBy.firstname,
          senderemail,
          mailkey
        );
      }
  
      res.json(updatedNote);
    } catch (err) {
      console.error("Error updating task:", err);
      res.status(500).json({ error: 'Failed to update note' });
    }
  };
  

exports.showAdminDashboard = async (req, res) => {
    try {
        const admins = await admin.find().select('-password');
        const users = await user.find({ role: 'user' }).select('-password');

            const tasks = await taskmodel.find()
            .populate('assignedBy', 'firstname lastname email')
            .populate("assignedTo", "firstname lastname email");
           
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



exports.mark = async(req, res) => {
    try {
        const { id } = req.params;
    
        const updatedTask = await taskmodel.findByIdAndUpdate(
          id,
          { completed: true, status: 'Completed' },
          { new: true }
        );
    
        if (!updatedTask) {
          return res.status(404).json({ message: 'Task not found' });
        }
    
        res.status(200).json(updatedTask);
      } catch (error) {
        console.error("Error marking task complete:", error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}






exports.showUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

 
    // const tasks = await taskmodel.find({ assignedTo: userId })
    //   .populate('assignedBy', 'firstname lastname')
    //   .populate('assignedTo', 'firstname lastname');

    const tasksAssignedTo = await taskmodel.find({ assignedTo: userId })
    .populate('assignedBy', 'firstname lastname')
    .populate('assignedTo', 'firstname lastname');

  const tasksAssignedBy = await taskmodel.find({ assignedBy: userId })
    .populate('assignedBy', 'firstname lastname')
    .populate('assignedTo', 'firstname lastname');

    res.status(200).json({ tasksAssignedTo, tasksAssignedBy });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user dashboard data' });
  }
};