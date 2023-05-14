const Student = require("../models/Student");

// get student list
const getStudentList = async (req, res) => {
  try {
    const studentsList = await Student.find({});

    //if students list is empty then this block executes
    if (!studentsList.length) {
      return res.status(200).json({
        data: [],
        message: "No students Present in the database",
      });
    }
    // if students list is available then sending it into response
    return res.status(200).json({
      data: studentsList,
      message: "Students List Fetched successfully",
    });
  } catch (error) {
    // If error occur while getting data from the database
    console.log(error);
    return res.status(500).json({
      message: "Error While Fetching StudentList",
    });
  }
};

// get indivisual student details
const getStudentById = async (req, res) => {
  try {
    const result = await Student.findById(req.params.id);

    if (result) {
      return res.status(200).json({
        data: result,
        message: "Student Details Fetched Successfully",
      });
    } else {
      return res.status(404).json({
        message: "Student Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error While Fetching Student Details",
    });
  }
};

//Create a new Student
const createStudent = (req, res) => {
  const student = new Student(req.body);
  student
    .save()
    .then((student) => {
      return res.status(201).json({
        data: student,
        message: "Student Created Successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        data: {},
        message: "Error While Creating Student",
      });
    });
};

//Update Student Details
const updateStudent = async (req, res) => {
  try {
    // update the given  fields and leave the other fileds as it is
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // { new: true } - this is for getting the updated document

    if (student) {
      return res.status(200).json({
        data: student,
        message: "Student Updated Successfully",
      });
    } else {
      return res.status(404).json({
        message: "Student Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error While Updating Student",
    });
  }
};

//Delete Student Details
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (student) {
      return res.status(200).json({
        data: student,
        message: "Student Deleted Successfully",
      });
    } else {
      return res.status(404).json({
        message: "Student Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error While Deleting Student",
    });
  }
};

module.exports = {
  getStudentList,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
