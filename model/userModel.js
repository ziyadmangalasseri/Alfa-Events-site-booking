const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  place: {
    type: String,
    required: true,
  },
  JoiningDate: {
    type: Date,
    required: true,
  },
  DateOfBirth: {
    type: Date,
    required: true,
  },
  BloodGroup: {
    type: String,
    required: true,
  },
  CompletedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events", // Reference to the Events collection
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
});

module.exports = mongoose.model("employees", userSchema);
