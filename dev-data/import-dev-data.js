const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Person = require('../models/personModel');

dotenv.config({ path: '../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

// Read the JSON file
const persons = JSON.parse(
  fs.readFileSync(`${__dirname}/persons.json`, 'utf-8')
);

// Import Data into DB
const importData = async () => {
  try {
    await Person.create(persons);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all the data from DB
const deleteData = async () => {
  try {
    await Person.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
