require('dotenv').config()
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/* Register */
router.post('/register', function (req, res, next) {

  let user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  });
  user.save();

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res.status(200).json({ token: token })
});

/* Login */
router.post('/login', function (req, res, next) {

  User.findOne({
    'email': req.body.email,
    'password': req.body.password,
  }).lean().exec(function (error, record) {
    if (record) { // If user found
      const token = jwt.sign({ _id: record._id }, process.env.JWT_SECRET);
      res.status(200).json({ token: token })
    } else { // If user not found
      res.status(400).json({ error: "Wrong credentials" })
    }
  })
});

module.exports = router;
