const EmployeeModel = require('../../model/AddEmployee');


const renderEmployeeForm = (req, res) => 
    { res.render('admin/adminaddemployee');

    }

const Employee=async (req,res)=>{
    try{
     const newEmployee = new EmployeeModel({
     EmployeeName:req.body.EmployeeName,
     Place:req.body.Place,
     DateOfBirth:req.body.DateOfBirth,
     JoinedDate:req.body.JoinedDate,
     BloodGroup:req.body.BloodGroup,
     EmployeeId:req.body.EmployeeId
     });
     await newEmployee.save()
     res.status(200).send('Created Employee successfully')
    }catch(err){
        console.log(err);
        res.status(500).send('Error Adding Employee')
    }
};


const renderallemployees = async (req, res) => {
    try {
      const allemployees = await EmployeeModel.find();
      res.render('admin/adminshowallemployees', { employees: allemployees });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve employees' });
    }
  };


  const detailsOfEditEmployee = async(req,res)=>{
    try {
      
      const employeeId = Number(req.params.id);

      if (isNaN(employeeId)) {
          return res.status(400).send('Invalid Employee ID');
      }
      const employee = await EmployeeModel.findOne({ EmployeeId: employeeId });
    
      if (!employee) {
          return res.status(404).send('Employee not found');
      }

      res.render('admin/editEmployee', { employee });
  } catch (error) {
      console.error(error);
      res.status(500).send('Failed to load employee data');
  }
  }

  const editEmployee = async(req,res)=>{
    try {
      const employeeId = Number(req.params.id);
      if (isNaN(employeeId)) {
          return res.status(400).send('Invalid Employee ID');
      }

      const updatedEmployee = await EmployeeModel.findOneAndUpdate(
          { EmployeeId: employeeId },
          {
              EmployeeName: req.body.EmployeeName,
              Place: req.body.Place,
              DateOfBirth: req.body.DateOfBirth,
              JoinedDate: req.body.JoinedDate,
              BloodGroup: req.body.BloodGroup,
          },
          { new: true } 
      );

      if (!updatedEmployee) {
          return res.status(404).send('Employee not found for update');
      }
      res.redirect('/showemployeespage'); 
  } catch (error) {
      console.error(error);
      res.status(500).send('Failed to update employee details');
  }
  }
module.exports={renderEmployeeForm,Employee,renderallemployees,detailsOfEditEmployee,editEmployee};


