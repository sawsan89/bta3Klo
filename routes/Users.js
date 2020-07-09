const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../config/auth");


const User = require('../models/User')


router.post('/signup', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.email, salt, (err, hash) => {
          if (err) throw err;
          console.log
          //add new user to the db
          var value = req.body.service;
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            category:req.body.category,
          });
          console.log(newUser)
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));

        });
      });

    }
  });
});

//login route
router.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({ PasswrdNotCorrect: "password not correct" })
      }
      const accessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: accessToken
      });


    })
    console.log(user)
    // compear with the password

    return res.json({ exist: true })


  });
});

router.post('/signup/update', (req, res) => {
  var id = req.body.id;
  var value = req.body.service;
  User.update({ _id: id }, { $push: { service: value } })
    .then(() => res.json("updated"))
    .catch(err => res.status(400).json('Error: ' + err));
  console.log("Body:", req.body);
})

router.get('/profile', (req, res) => {
  User.find({ service: "service" }).limit(6)
    .then((service) => res.json(service))
    .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;