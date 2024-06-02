const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");



const requestSchema = mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    creationDate: {
      type: String,
      default: new Date().toLocaleDateString([],{ year: 'numeric', month: 'long', day: 'numeric' })// Set the default value to today's date
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