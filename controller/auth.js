const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const asyncHandler = require("async-handler");

const signup = (req, res) => {
  res.render("signup");
};
const logout = async (req,res) => {
  req.session.destroy();
  res.redirect("/");
}
const createAccount = async (req, res) => {
  const {
    name,
    userId,
    password,
    number,
    place,
    JoiningDate,
    DateofBirth,
    bloodGroup,
  } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ userId }, { number }] });
    if (existingUser) {
      const errorMessage =
        existingUser.userId === userId
          ? "User ID already exists."
          : "Phone number already in use.";
      return res.status(400).json({ success: false, message: errorMessage });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      userId,
      password: hashedPassword,
      number,
      place,
      JoiningDate,
      DateofBirth,
      bloodGroup,
    });

    await newUser.save();


    // req.session.isLoggedIn = true;
    // req.session.userId = newUser.userId;
    // req.session.userDataId = newUser._id

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      redirectUrl: "/home",
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      const errorMessage =
        duplicateField === "userId"
          ? "User ID already exists."
          : "Phone number already in use.";
      return res.status(400).json({ success: false, message: errorMessage });
    }

    console.error("Error creating account:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
};

const login = (req, res) => {
  res.render("login");
};
const userLogin = async (req, res) => {
  console.log("User login process started");
  const { userId, password } = req.body;
  console.log("Login attempt with:", req.body);

  try {
    const findUser = await User.findOne({ userId: userId });

    if (!findUser) {
      console.log("User not found");
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId" });
    }

    console.log("User found");
    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) {
      console.log("Invalid password");
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    console.log("Password verified");

   

    const response = {
      success: true,
    };
      if(findUser.isAdmin){
        req.session.adminisLoggedIn = true;
        req.session.userId = findUser.userId;
        req.session.userDataId = findUser._id
          
        response.message="Admin login successfully";
        response.redirectUrl = "/dashboard"
      }else{
        req.session.userisLoggedIn = true;
        req.session.userId = findUser.userId;
        req.session.userDataId = findUser._id
          
        response.message = "User login successfully";
        response.redirectUrl = "/home"
      }
    
    res.status(200).json(response);
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
};

module.exports = { login, userLogin, signup, createAccount,logout };
