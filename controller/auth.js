const User = require("../model/userMode");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const asyncHandler = require("async-handler");

const signup = (req, res) => {
  res.render("signup");
};
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
    res
      .status(201)
      .json({
        success: true,
        message: "Account created successfully!",
        redirectUrl: "/api/user/home",
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
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred. Please try again later.",
      });
  }
};

const login = (req, res) => {
  res.render("login");
};

const userLogin = async (req, res) => {
  console.log("userlogin process started");
  const { userId, password } = req.body;
  console.log(req.body);
  try {
    const findUser = await User.findOne({ userId: userId });

    if (!findUser) {
      return res
        .status(401)
        .json({ success: false, message: "invalid userId" });
      console.log("user is not found");
    }
    if (findUser) {
      console.log("find User");

      const hashPassword = await bcrypt.compare(password, findUser.password);
      if (!hashPassword) {
        console.log("hashing password is error");

        return res
          .status(401)
          .json({ success: false, message: "invalid password" });
      }
      if (hashPassword) {
        console.log("password is hashed");
        //   req.session.isLoggedIn = true;
        //   req.session.email = findUser.email;
        //   req.session.userId = findUser._id

        if (findUser.isAdmin) {
          res.status(200).json({
            success: true,
            message: "admin login successfully",
            redirectUrl: "/api/admin/dashboard",
          });
          //   req.session.isAdminLoggedIn = true;
        } else {
          res.status(200).json({
            success: true,
            message: "successfully",
            redirectUrl: "/home",
          });
          //   console.log(req.session.email);
          // res.status(200).json({ messege: "uesr invalid" });
        }
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error logging in" });
  }
};

module.exports = { login, userLogin, signup, createAccount };
