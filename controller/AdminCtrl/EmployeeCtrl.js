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
module.exports={renderEmployeeForm,Employee,renderallemployees};
