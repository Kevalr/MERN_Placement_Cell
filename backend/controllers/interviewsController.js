const Interview = require("../models/Interview");

const studentDataQuery = {
  path: "students.id",
  modal: "Student",
  select: {
    name: 1,
    collage: 1,
  },
};
// Get All Interview List
const getInterviewsList = async (req, res) => {
  try {
    const interviewList = await Interview.find({}).populate(studentDataQuery);

    if (!interviewList.length) {
      return res.status(200).json({
        data: [],
        message: "No interviews found",
      });
    } else {
      return res.status(200).json({
        data: interviewList,
        message: "Interviews List Fetched Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while fetching Interviews List",
    });
  }
};

// Get Single Interview by id
const getInterviewByID = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id).populate({
      path: "students.id",
      model: "Student",
      select: {
        name: 1,
        collage: 1,
      },
    });
    if (interview) {
      return res.status(200).json({
        data: interview,
        message: "Interview Fetched Successfully",
      });
    } else {
      return res.status(404).json({
        message: "Interview not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while fetching Interview",
    });
  }
};

// Create Interview
const createInterview = async (req, res) => {
  try {
    let result = await Interview.create(req.body);
    if (result) {
      return res.status(200).json({
        data: result,
        message: "Interview created successfully",
      });
    } else {
      return res.status(500).json({
        message: "Error while creating Interview",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while creating Interview",
    });
  }
};

//Can update the interview details and students status
const updateInterview = async (req, res) => {
  //req body will have id of the interview all the students with updated result status
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (interview) {
      return res.status(200).json({
        data: interview,
        message: "Interview updated successfully",
      });
    } else {
      return res.status(404).json({
        message: "Interview not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while updating Interview",
    });
  }
};

// To Delete Interview
const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);
    if (interview) {
      return res.status(200).json({
        data: interview,
        message: "Interview deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Interview not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while deleting Interview",
    });
  }
};

module.exports = {
  getInterviewsList,
  getInterviewByID,
  createInterview,
  updateInterview,
  deleteInterview,
};
