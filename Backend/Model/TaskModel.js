// const mongoose = require("mongoose")
// const Schema = mongoose.Schema

// const notesSchema = new Schema({
//   title: String,
//   content: String,
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'userdata'
//   },
//   assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "userdata" }, 
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "userdata" },
// },{ timestamps: true, versionKey: false })

// module.exports = mongoose.model("task", notesSchema)

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  content: String,
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userdata',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userdata',
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
