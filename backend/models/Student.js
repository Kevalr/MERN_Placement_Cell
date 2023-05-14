const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  dsa: {
    type: Number,
    required: true,
  },
  webdev: {
    type: Number,
    required: true,
  },
  react: {
    type: Number,
    required: true,
  },
});

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    collage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    scores: scoreSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
