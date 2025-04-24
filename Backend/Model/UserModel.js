const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: false
      },
      email: {
        type: String,
        required: true
      },

      password: {
        type: String,
        required: true
      },

      otp: {
        type: Number,
       
      },
    timer:{
        type: Date
    },
    isVerified: { type: Boolean, default: false },

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