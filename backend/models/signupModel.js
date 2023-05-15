const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  date : {
    type : 
    Date,
    default : Date.now()
  }
});
const signupModel = mongoose.model("signupModel", schema);
module.exports = signupModel;
