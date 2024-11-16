const EmployeeModel = require("../../model/userModel");

const renderEmployeeForm = (req, res) => {
  res.render("admin/addEmployee");
};
const Employee = async (req, res) => {
  try {
    const newEmployee = new EmployeeModel({
      name: req.body.name,
      userId: req.body.userId,
      password: req.body.password,
      number: req.body.number,
      place: req.body.place,
      JoiningDate: req.body.JoiningDate,
      DateOfBirth: req.body.DateOfBirth,
      BloodGroup: req.body.BloodGroup,
    });

    await newEmployee.save();
    res.status(200).send("Created Employee successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Adding Employee");
  }
};

const renderallemployees = async (req, res) => {
  try {
    const allemployees = await EmployeeModel.find();
    res.render("admin/showallemployees", { employees: allemployees });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve employees" });
  }
};
module.exports = { renderEmployeeForm, Employee, renderallemployees };
