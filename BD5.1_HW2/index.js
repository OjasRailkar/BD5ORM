const express = require('express');
let { sequelize } = require('./lib/index.js');
let { employee } = require('./models/employee.model.js');

const app = express();
const port = 3000;

const employeesData = [
  {
    name: 'John Doe',
    department: 'Engineering',
    salary: 75000,
    designation: 'Software Engineer',
  },
  {
    name: 'Jane Smith',
    department: 'Human Resources',
    salary: 60000,
    designation: 'HR Manager',
  },
  {
    name: 'Robert Brown',
    department: 'Finance',
    salary: 80000,
    designation: 'Financial Analyst',
  },
  {
    name: 'Emily Davis',
    department: 'Marketing',
    salary: 70000,
    designation: 'Marketing Specialist',
  },
  {
    name: 'Michael Johnson',
    department: 'IT',
    salary: 85000,
    designation: 'System Administrator',
  },
  {
    name: 'Laura Wilson',
    department: 'Engineering',
    salary: 90000,
    designation: 'Lead Developer',
  },
  {
    name: 'Chris Lee',
    department: 'Customer Support',
    salary: 50000,
    designation: 'Support Specialist',
  },
  {
    name: 'Sarah Martinez',
    department: 'Sales',
    salary: 65000,
    designation: 'Sales Representative',
  },
  {
    name: 'Tom Harris',
    department: 'Legal',
    salary: 95000,
    designation: 'Legal Advisor',
  },
  {
    name: 'Anna Taylor',
    department: 'Engineering',
    salary: 78000,
    designation: 'Quality Assurance Engineer',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await employee.bulkCreate(employeesData);

    return res.status(200).json({ message: 'Database seeding succesful' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error Seeding Data', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
