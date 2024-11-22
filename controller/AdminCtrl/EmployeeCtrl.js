const mongoose = require("mongoose");
const EmployeeModel = require("../../model/userModel");
const bcrypt = require("bcrypt");
const Event = require("../../model/EventSchema");

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

    if (!name || !userId || !password || !number || !place || !JoiningDate || !DateOfBirth || !BloodGroup) {
      return res.status(400).send("All fields are required.");
    }

    const existingEmployee = await EmployeeModel.findOne({
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

    const newEmployee = new EmployeeModel({
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

const editEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
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
    const employeeId = req.params.id; 
    if (!employeeId) {
      return res.status(400).json({ error: "Invalid Employee ID" });
    }

    const deletedEmployee = await EmployeeModel.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

const removeEmployeeFromEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid Event ID or User ID format" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const user = await EmployeeModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await Event.findByIdAndUpdate(
      eventId,
      { $pull: { currentEmployers: userId } },
      { new: true }
    );

    await EmployeeModel.findByIdAndUpdate(
      userId,
      { $pull: { myEvents: eventId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Employee removed from event successfully",
    });
  } catch (error) {
    console.error("Error in removeEmployeeFromEvent:", error.message);
    res.status(500).json({ error: "Internal server error" });
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
  removeEmployeeFromEvent
};
