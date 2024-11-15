const express = require('express');
let { sequelize } = require('./lib/index.js');
let { company } = require('./models/company.model.js');


const app = express();
app.use(express.json());
const port = 3000;

// Dummy data
let companies = [
  {
    name: 'Tech Innovators',
    industry: 'Technology',
    foundedYear: 2010,
    headquarters: 'San Francisco',
    revenue: 75000000,
  },
  {
    name: 'Green Earth',
    industry: 'Renewable Energy',
    foundedYear: 2015,
    headquarters: 'Portland',
    revenue: 50000000,
  },
  {
    name: 'Innovatech',
    industry: 'Technology',
    foundedYear: 2012,
    headquarters: 'Los Angeles',
    revenue: 65000000,
  },
  {
    name: 'Solar Solutions',
    industry: 'Renewable Energy',
    foundedYear: 2015,
    headquarters: 'Austin',
    revenue: 60000000,
  },
  {
    name: 'HealthFirst',
    industry: 'Healthcare',
    foundedYear: 2008,
    headquarters: 'New York',
    revenue: 80000000,
  },
  {
    name: 'EcoPower',
    industry: 'Renewable Energy',
    foundedYear: 2018,
    headquarters: 'Seattle',
    revenue: 55000000,
  },
  {
    name: 'MediCare',
    industry: 'Healthcare',
    foundedYear: 2012,
    headquarters: 'Boston',
    revenue: 70000000,
  },
  {
    name: 'NextGen Tech',
    industry: 'Technology',
    foundedYear: 2018,
    headquarters: 'Chicago',
    revenue: 72000000,
  },
  {
    name: 'LifeWell',
    industry: 'Healthcare',
    foundedYear: 2010,
    headquarters: 'Houston',
    revenue: 75000000,
  },
  {
    name: 'CleanTech',
    industry: 'Renewable Energy',
    foundedYear: 2008,
    headquarters: 'Denver',
    revenue: 62000000,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await company.bulkCreate(companies);

    return res.status(200).json({ message: 'Database seeding succesful' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error Seeding Data', error: error.message });
  }
});

//1. fetch All companies

async function fetchAllCompanies() {
  let response = await company.findAll()

  return { companies: response }
}

app.get('/companies', async (req, res) => {
  try {
    let result = await fetchAllCompanies()

    if (result.companies.length === 0) {
      return res.status(404).json({ message: "No companies found" })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

//Exercise 2: Add a new company in the database.
async function addNewCompany(newCompany) {
  let newCompanyData = await company.create(newCompany)
  if (!newCompanyData) {
    return {}
  }

  return { message: "New Company added successfully", newCompanyData }
}

app.post("/companies/new", async (req, res) => {
  try {
    let newCompany = req.body.newCompany

    let result = await addNewCompany(newCompany)

    if (!result.message) {
      return res.status(404).json({ message: "Company not Found." })
    }
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// Exercise 3: Update companies information
async function updateCompanyById(id, newCompanyData) {
  let companyDetails = await company.findOne({ where: { id } })

  if (!companyDetails) {
    return {}
  }

  companyDetails.set(newCompanyData)
  let updatedCompany = companyDetails.save()

  return { message: "Company details updated successfully", updatedCompany }
}

app.post("/companies/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id)
    let newCompanyData = req.body

    let result = await updateCompanyById(id, newCompanyData)

    if (!result.message) {
      return res.status(404).json({ message: "Company not Found." })
    }
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

//Exercise 4: Delete an company from the database
async function deleteCompanyById(id) {
  let response = await company.destroy({where : { id }})

  if(!response) return {}

  return { message: "Company deleted successfully", response}
}

app.post("/companies/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id)

    let result = await deleteCompanyById(id)

    if (!result.message) {
      return res.status(404).json({ message: "Company not Found." })
    }

    return res.status(200).json(result)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
