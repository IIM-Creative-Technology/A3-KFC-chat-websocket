require('dotenv').config()
const Conv = require('../models/conv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/* Conversations */
router.get('/', function (req, res, next) {

  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function (err, decoded) {
    Conv.find({ "members": decoded._id }).lean().exec(function (error, records) {
      res.status(200).json({
        convs: records
      })
    })
  });
});

router.post('/', function (req, res, next) {

  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function (err, decoded) {
    req.body.members.push(decoded._id)
    let conv = new Conv({
      name: req.body.name,
      members: req.body.members,
      created_by: decoded._id
    });
    conv.save();

    res.status(200).json({
      conv: conv
    })
  })
});

module.exports = router;
