const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    // Check for duplicate email
    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: "Duplicate email" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userObject = { username, email, password: hashedPwd };
    // Create user
    const user = await User.create(userObject);
    res.status(201).json({
      message: "User created Successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error while creating user",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "nothing",
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "User signed in Successfully",
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error while signing in user",
    });
  }
};

module.exports = { signUp, signIn };
