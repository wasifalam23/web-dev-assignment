const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Person = require('../models/personModel');

exports.getAllPerson = catchAsync(async (req, res, next) => {
  const persons = await Person.find();

  res.status(200).json({
    status: 'success',
    results: persons.length,
    data: {
      persons,
    },
  });
});

exports.getpersonById = catchAsync(async (req, res, next) => {
  const person = await Person.findById(req.params.id);

  if (!person) {
    return next(new AppError('No person found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      person,
    },
  });
});

exports.createPerson = catchAsync(async (req, res, next) => {
  const person = await Person.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    email: req.body.email,
  });

  res.status(201).json({
    status: 'success',
    data: {
      person,
    },
  });
});

exports.updatePersonById = catchAsync(async (req, res, next) => {
  const person = await Person.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
    },
    { new: true, runValidators: true }
  );

  if (!person) {
    return next(new AppError('No person found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      person,
    },
  });
});

exports.deletePersonById = catchAsync(async (req, res, next) => {
  const person = await Person.findByIdAndDelete(req.params.id);

  if (!person) {
    return next(new AppError('No person found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
