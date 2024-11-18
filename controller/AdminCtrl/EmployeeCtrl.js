const mongoose = require("mongoose");
const EmployeeModel = require("../../model/userModel");
const bcrypt = require("bcrypt");

const renderEmployeeForm = (req, res) => {
  res.render("admin/addEmployee");
};

const addEmployee = async (req, res) => {
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

    // Validate required fields
    if (
      !name ||
      !userId ||
      !password ||
      !number ||
      !place ||
      !JoiningDate ||
      !DateOfBirth ||
      !BloodGroup
    ) {
      return res.status(400).send("All fields are required");
    }

    // Check if employee with the same userId or number already exists
    const existingEmployee = await EmployeeModel.findOne({
      $or: [{ userId }, { number }],
    });

    if (existingEmployee) {
      return res
        .status(409)
        .send(
          `Employee with ${
            existingEmployee.userId === userId ? "UserId" : "Phone Number"
          } already exists`
        );
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Parse dates to store only the date part
    const joiningDate = new Date(JoiningDate).toISOString().split("T")[0];
    const dateOfBirth = new Date(DateOfBirth).toISOString().split("T")[0];

    // Create a new employee document
    const newEmployee = new EmployeeModel({
      name,
      userId,
      password: hashedPassword,
      number,
      place,
      JoiningDate: joiningDate,
      DateOfBirth: dateOfBirth,
      BloodGroup,
    });

    // Save the employee document to the database
    await newEmployee.save();

    // Redirect to dashboard
    res.status(200).json({ redirectURL: "/dashboard" });
  } catch (err) {
    console.error("Error adding employee:", err);
    res.status(500).send("Error Adding Employee");
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

    // Format the dates
    const formattedEmployee = {
      ...employee._doc, // Spread original employee data
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
        ...employee._doc, // Spread original employee data
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

const editEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id; // Extract employee ID from the URL
    if (!employeeId) {
      return res.status(400).json({ error: "Invalid Employee ID" });
    }

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      employeeId,
      {
        name: req.body.name,
        userId: req.body.userId,
        number: req.body.number,
        place: req.body.place,
        JoiningDate: req.body.JoiningDate,
        DateOfBirth: req.body.DateOfBirth,
        BloodGroup: req.body.BloodGroup,
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ success: true, employee: updatedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update employee details" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id; // Extract the employee ID from the URL
    if (!employeeId) {
      return res.status(400).json({ error: "Invalid Employee ID" });
    }

    // Find and delete the employee
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};


module.exports = {
  renderEmployeeForm,
  addEmployee,
  renderallemployees,
  employeeDetails,
  editEmployee,
  editEmployeePage,
  deleteEmployee,
};
