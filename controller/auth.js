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

const renderallemployees = async (req, res) => {
  try {
    const allemployees = await EmployeeModel.find();
    res.render("admin/showEmployees", { employees: allemployees });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve employees" });
  }
};

const employeeDetails = async (req, res) => {
  const employeeId = req.params.id;
  try {
    if (!employeeId) {
      return res.status(400).send("Invalid Employee ID");
    }
    const employee = await EmployeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

   
    const formattedEmployee = {
      ...employee._doc,
      JoiningDate: new Date(employee.JoiningDate).toISOString().split("T")[0],
      DateOfBirth: new Date(employee.DateOfBirth).toISOString().split("T")[0],
    };

    res.render("admin/employeeDetails", { employee: formattedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to load employee data");
  }
};
const editEmployeePage = async (req, res) => {
  try {
    const employeeId = req.params.id;
    if (employeeId) {
      const employee = await EmployeeModel.findById(employeeId);
      const formattedEmployee = {
        ...employee._doc,
        JoiningDate: new Date(employee.JoiningDate).toISOString().split("T")[0],
        DateOfBirth: new Date(employee.DateOfBirth).toISOString().split("T")[0],
      };
      if (employee) {
        res.render("admin/editEmployee", { employee: formattedEmployee });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "employee id is error" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "employee id is not recived" });
    }
  } catch (err) {
    console.error(err.message);
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
