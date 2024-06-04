const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");



const requestSchema = mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
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
        default:'VPN' //WARNING : DO NOT REMOVE : frontend has onchange in select so this value won't be taken if the user doensn't change the select option
    }
  });
  const request = mongoose.model("request",requestSchema);
  module.exports = request;