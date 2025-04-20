const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    firstname: {
        type: String,
        require: true
      },
      lastname: {
        type: String,
        require: false
      },
      email: {
        type: String,
        require: true
      },

      password: {
        type: String,
        require: true
      },

    AdminId: {
    type: schema.Types.ObjectId,
    ref: 'admin'
  },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      },
      status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
      }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('userdata', userSchema)