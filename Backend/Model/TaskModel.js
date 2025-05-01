const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: String,
  status: { type: String, default: 'Pending' },
  completed: {
    type: Boolean,
    default: false,
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userdata',
  
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userdata',
    
  },
  image: {
    type: String, 
  },
  
}, {
  timestamps: true,versionKey: false
});

module.exports = mongoose.model('Task', taskSchema);
