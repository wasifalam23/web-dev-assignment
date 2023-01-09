const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: {
    type: Number,
    set: (v) => Math.round(v),
  },
  email: {
    type: String,
    unique: true,
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
