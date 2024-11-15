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

//Exercise 2: Fetch companies details by ID

async function fetchCompanyById(id) {
  let response = await company.findOne({ where: { id: id } })

  return { company: response }
}

app.get('/companies/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id)

    let result = await fetchCompanyById(id)

    if (result.company === null) {
      return res.status(404).json({ message: "No company found" })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

//Exercise 3: Fetch all companies by industry

async function fetchCompaniesByIndustry(industry) {
  let response = await company.findAll({ where: { industry } })

  return { companies: response }
}

app.get('/companies/industry/:industry', async (req, res) => {
  try {
    let industry = req.params.industry

    let result = await fetchCompaniesByIndustry(industry)

    if (result.companies.length === 0) {
      return res.status(404).json({ message: "No companies found" })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// Exercise 4: Sort all the companies by their revenue
async function sortCompaniesByRevenue(order) {
  let response = await company.findAll({ order: [['revenue', order]] })

  return { companies: response }
}

app.get('/companies/revenue', async (req, res) => {
  try {
    let order = req.query.order

    let result = await sortCompaniesByRevenue(order)

    if (result.companies.length === 0) {
      return res.status(404).json({ message: "No companies found" })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
