const express = require("express");
const router = express.Router();
const interviewsController = require("../controllers/interviewsController");

// Get All Interview List
router.get("/", interviewsController.getInterviewsList);

router.get(
  "/detailedInterviewReport",
  interviewsController.getDetailedInterviewReport
);

router
  // Get Single Interview by id
  .get("/:id", interviewsController.getInterviewByID)
  // Create Interview
  .post("/create", interviewsController.createInterview)
  //for updating the interview details and students results
  .put("/update/:id", interviewsController.updateInterview)
  // Delete Interview
  .delete("/delete/:id", interviewsController.deleteInterview);

module.exports = router;
