const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");

// for getting the students list
router.get("/", studentsController.getStudentList);

router
  // get method for getting student by id
  .get("/:id", studentsController.getStudentById)
  // post method for creating student
  .post("/create", studentsController.createStudent)
  // put method for updating student
  .put("/update/:id", studentsController.updateStudent)
  // delete method for deleting student
  .delete("/delete/:id", studentsController.deleteStudent);

module.exports = router;
