const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please Enter all fields",
    });
  }
  const existuser = await User.findOne({ email });
  if (existuser) {
    return res.status(400).json({
      status: "fail",
      message: "User already exist with this email",
    });
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    return res.status(201).json({
      status: "success",
      message: "register successfull",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
    });
  } else {
   return res.status(400).json({ message: error.message });
  }
});

// login api
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
   return res.status(200).json({
      user:{
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
      status:"success",
      message:"Login Successful"
    });
  } else {
    // res.status(401);
    // throw new Error("Invalid ID or Password");
    return res.status(401).json({ message: "Invalid ID or Password" , status:"fail"});
  }
});

module.exports = { registerUser, userLogin };
