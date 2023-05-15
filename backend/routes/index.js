const express = require("express");
const router = express.Router();
const path = require("path");
const { isAuthenticatedUser } = require("../middleware/auth");

//For Testing
router.get("/", (req, res) => res.send("<h1>Hello World</h1>"));

// All the users(employees) will be redirected to users routes page
router.use("/users", require("./users"));

//All students routes will be redirected to students routes page
router.use("/students", isAuthenticatedUser, require("./students"));

//All interviews routes will be redirected to interviews routes page
router.use("/interviews", isAuthenticatedUser, require("./interviews"));

//All undefine routes will into this routes and respose with 404 page
router.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

module.exports = router;
