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
  try {
    const {
      name,
      userId,
      password,
      number,
      place,
      JoiningDate,
      DateOfBirth,
      BloodGroup,
    } = req.body;

    if (!name || !userId || !password || !number || !place || !JoiningDate || !DateOfBirth || !BloodGroup) {
      return res.status(400).send("All fields are required.");
    }

    const existingEmployee = await User.findOne({
      $or: [{ userId }, { number }],
    });
    if (existingEmployee) {
      return res.status(409).send(
        `Employee with ${
          existingEmployee.userId === userId ? "UserId" : "Phone Number"
        } already exists`
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new User({
      name,
      userId,
      password: hashedPassword,
      number,
      place,
      JoiningDate,
      DateOfBirth,
      BloodGroup,
    });

    await newEmployee.save();
    res.status(200).json({ redirectURL: "/dashboard" });
  } catch (err) {
    res.status(500).send(`Error Adding Employee: ${err.message}`);
  }
};

const login = (req, res) => {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.API_PRODUCTION_URL
      : process.env.API_DEVELOPMENT_URL;
      
  res.render("login",{apiUrl});
};
const userLogin = async (req, res) => {
 // console.log("User login process started");
  const { userId, password } = req.body;
 // console.log("Login attempt with:", req.body);

  try {
    const findUser = await User.findOne({ userId: userId });

    if (!findUser) {
    //  console.log("User not found");
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId" });
    }

   // console.log("User found");
    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) {
     // console.log("Invalid password");
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

   // console.log("Password verified");

   

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
