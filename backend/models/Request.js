const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");



const requestSchema = mongoose.Schema({
    userId: {
      type: String,
      required: true,
      ref: "user",
    },
    creationDate: {
      type: Date,
      default: new Date()// Set the default value to today's date
  },
    status: {
        type: String,
        enum: ['notChecked', 'accepted', 'workInProgress','validated'],
        default: 'notChecked' // You can set a default value if needed
      },
    type:{
        type:String,
        enum:['VPN','VM','AccessPoint'],
        default:'VM'
    }
  });
  const request = mongoose.model("request",requestSchema);
  module.exports = request;