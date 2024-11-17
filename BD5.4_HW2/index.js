const express = require('express');
let { course } = require('./models/course.model.js')
// let {} = require('./models/studentCourse.model.js')
let { student } = require('./models/student.model.js')
let { sequelize } = require('./lib/index.js');

const app = express();
const port = 3000;
app.use(express.json());

//DATA 

// courses
let courses = [
  { title: 'Math 101', description: 'Basic Mathematics' },
  { title: 'History 201', description: 'World History' },
  { title: 'Science 301', description: 'Basic Sciences' },
]

// students
let students = [
  { name: 'John Doe', age: 24 },
  { name: 'alex harris', age: 25 },
  { name: 'emillia joseph', age: 26 }
]

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await course.bulkCreate(courses);
    await student.bulkCreate(students);

    res.status(200).json({ message: 'Database seeding succesful' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

//Exercise 1: Create New Student.
async function addNewStudent(newStudent) {
  let studentDetails = await student.create(newStudent)

  if (!studentDetails) return {}

  return { message: "Student added successfully", studentDetails }
}

app.post("/students/new", async (req, res) => {
  try {
    let newStudent = req.body.newStudent

    let result = await addNewStudent(newStudent)

    if (!result.message) {
      return res.status(404).json({ message: "Student Not Found."})
    }

    return res.status(200).json(result)

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Exercise 2: Update Student by ID.
async function updateStudentById(id, newStudentData) {
  let studentDetails = await student.findOne({ where: { id } })


  if (!studentDetails) return {}

  studentDetails.set(newStudentData)  //set new details(update)

  let updatedStudentDetails = await studentDetails.save()  // save record into DB

  return { message: "Student details updated successfully", updatedStudentDetails }
}

app.post('/students/update/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id)
    let newStudentData = req.body

    let result = await updateStudentById(id, newStudentData)

    if (!result.message) {
      return res.status(404).json({ message: "Student Not Found." })
    }

    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
