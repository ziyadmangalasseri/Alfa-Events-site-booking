/**
 * 
 * {
  "_id": {
    "$oid": "672ddfd0321e6de463d46076"
  },
  "name": "ziyad",
  "userId": "1001",
  "password":"$2b$10$bqQq5XV2LZOtaWsYV6LJxOmHWrPOsfnXPnEpQj/n6bQ706CUZ63r.",
  "number":"8111807089",
  "place": "pallippurma",
  "joiningDate": "08/11/2024",
  "dateOfBirth": "10/20/2004",
  "bloodGroup": "A+",
  "isAdmin": true
}
 */
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
});

module.exports = mongoose.model("employees", userSchema);
