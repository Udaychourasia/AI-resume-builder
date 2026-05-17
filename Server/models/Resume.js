const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true,
  },

  skills: {
    type: String,
    required: true,
  },

  education: {
    type: String,
    required: true,
  },

  experience: {
    type: String,
    required: true,
  },

  summary: {
    type: String,
  },

  // 🔥 USER ID

  userId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: true,

  },

});

module.exports = mongoose.model("Resume", resumeSchema);