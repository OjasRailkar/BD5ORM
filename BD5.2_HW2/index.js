const express = require('express');
let { sequelize } = require('./lib/index.js');
let { employee } = require('./models/employee.model.js');

const app = express();
app.use(express.json())
const port = 3000;

// Dummy data
let employees = [
  {
    name: 'Alice',
    salary: 60000,
    department: 'Engineering',
    designation: 'Software Engineer'
  },
  {
    name: 'Bob',
    salary: 70000,
    department: 'Marketing',
    designation: 'Marketing Manager'
  },
  {
    name: 'Charlie',
    salary: 80000,
    department: 'Engineering',
    designation: 'Senior Software Engineer'
  }
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


//1
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

//2 POST BY ID

async function fetchEmployeeById(id) {
  let employeeData = await employee.findOne({ where: { id } })

  return { employee: employeeData }
}

app.get('/employees/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id)

    let result = await fetchEmployeeById(id)

    if (result.employee === null) {
      return res.status(404).json({ message: 'No employee found.' })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

//Exercise 3: Fetch all posts by an department

async function fetchEmployeesByDepartment(department) {
  let employeeData = await employee.findAll({ where: { department } })

  return { employees: employeeData }
}

app.get('/employees/department/:department', async (req, res) => {
  try {
    let department = req.params.department

    let result = await fetchEmployeesByDepartment(department)

    if (result.employees.length === 0) {
      return res.status(404).json({ message: 'No Employees found for the department ' + department })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

//Exercise 4: Sort all the posts by their name

async function sortEmployeesBySalary(order) {
  let sortedEmployees = await employee.findAll({ order: [["salary", order]] })

  return { employees : sortedEmployees }
}

app.get('/employees/sort/salary', async (req, res) => {
  try {
    let order = req.query.order

    let result = await sortEmployeesBySalary(order)

    if (result.employees.length === 0) {
      return res.status(404).json({ message: 'No employees found' })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
