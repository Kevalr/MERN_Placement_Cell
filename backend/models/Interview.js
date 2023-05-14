const mongoose = require("mongoose");

const assignedStudentSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  status: {
    type: String,
    default: "On Hold",
  },
});

const interviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  requiredTechnogies: {
    type: Array,
    required: true,
  },
  students: {
    type: [assignedStudentSchema],
  },
});

module.exports = mongoose.model("Interview", interviewSchema);
