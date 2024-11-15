const express = require('express');
let { sequelize } = require('./lib/index.js');
let { employee } = require('./models/employee.model.js');

const app = express();
app.use(express.json())
const port = 3000;

// Dummy data
let employees = [
  {
    name: 'John Doe',
    designation: 'Manager',
    department: 'Sales',
    salary: 90000,
  },
  {
    name: 'Anna Brown',
    designation: 'Developer',
    department: 'Engineering',
    salary: 80000,
  },
  {
    name: 'James Smith',
    designation: 'Designer',
    department: 'Marketing',
    salary: 70000,
  },
  {
    name: 'Emily Davis',
    designation: 'HR Specialist',
    department: 'Human Resources',
    salary: 60000,
  },
  {
    name: 'Michael Wilson',
    designation: 'Developer',
    department: 'Engineering',
    salary: 85000,
  },
  {
    name: 'Sarah Johnson',
    designation: 'Data Analyst',
    department: 'Data Science',
    salary: 75000,
  },
  {
    name: 'David Lee',
    designation: 'QA Engineer',
    department: 'Quality Assurance',
    salary: 70000,
  },
  {
    name: 'Linda Martinez',
    designation: 'Office Manager',
    department: 'Administration',
    salary: 50000,
  },
  {
    name: 'Robert Hernandez',
    designation: 'Product Manager',
    department: 'Product',
    salary: 95000,
  },
  {
    name: 'Karen Clark',
    designation: 'Sales Associate',
    department: 'Sales',
    salary: 55000,
  },
]



app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await employee.bulkCreate(employees);

    return res.status(200).json({ message: 'Database seeding succesful' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error Seeding Data', error: error.message });
  }
});


//1. fetch All Employees
async function fetchAllEmployees() {
  let allEmployees = await employee.findAll()

  return { employees: allEmployees }
}

app.get('/employees', async (req, res) => {
  try {
    let result = await fetchAllEmployees()

    if (result.employees.length === 0) {
      return res.status(404).json({ message: 'No employees found.' })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 2: Add a new employee in the database

async function addNewEmployee(newEmployee) {
  let response = await employee.create(newEmployee)

  return { message: "New Employee added successfully", response }
}

app.post('/employees/new', async (req, res) => {
  try {
    let newEmployee = req.body.newEmployee

    let result = await addNewEmployee(newEmployee)
    
    if (!result.message) {
      return res.status(404).json({ message: "Employee not found" })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

//Exercise 3: Update employee information
async function updateEmployeeById(id, newEmployeeData) {
let employeeDetails = await employee.findOne({where : { id }})

if(!employeeDetails){
  return {}
}

employeeDetails.set(newEmployeeData)
let updatedEmployee = await employeeDetails.save()

return { message: "Employee details updated successfully", updatedEmployee }
}

app.post('/employees/update/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id)
    let newEmployeeData = req.body.newEmployee

    let result = await updateEmployeeById(id, newEmployeeData)
    
    if (!result.message) {
      return res.status(404).json({ message: "Employee not found" })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

async function deleteEmployeeById(id){
  let response = await employee.destroy({where : {id}})

  if(!response) return {}

  return { message: "Employee deleted successfully", response }
}

app.post('/employees/delete', async (req, res) => {
  try {
    let id = parseInt(req.body.id)
    let result = await deleteEmployeeById(id)
    
    if (!result.message) {
      return res.status(404).json({ message: "Employee not found" })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
