// const express = require('express');
// const users = express.Router();
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// const User = require('../models/User');

// users.use(cors());
// require('dotenv').config(); // to read .env file

// users.post('/signUp', (req, res) => {
//     const userData = {
//         name : req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     }

//         User.findOne({
//             email: req.body.email
//         })
//         .then(user => {
//             if(!user) {
//                 bcrypt.hash(req.body.password, 10, (err, hash) => {
//                     userData.password = hash;
//                     User.create(userData)
//                     .then(user => {
//                         res.json({status: user.email + 'added'})
//                     })
//                     .catch(err=> {
//                         res.send('error: ' + err)
//                     })
//                 })
//             } else {
//                         res.json({error: 'email already exist'})
//             }
//         })
//         .catch(res => {
//             res.send('error: ' + err)
//         })
// })

// users.post('/login', (req, res) => {
//     User.findOne({
//         email: req.body.email
//     })
//     .then(user => {
//         if(user) {
//             if(bcrypt.compareSync(req.body.password, user.password)) {
//                 const payload = {
//                     _id: user._id,
//                     name: user.name,
//                     email: user.email
//                 }
//                 let token = jwt.sign(payload, process.env.JWT_KEY, {
//                     expiresIn: 1440
//                 })
//                 res.send(token)
//             } else {
//                 res.json({error: "User dose not exist"})
//             }
//         } else {
//             res.json({error: "User dose not exist"})
//         }
//     })
//     .catch(err => {
//         res.send('error: ' + err)
//     })
// })

// users.get('/profile', (req, res) => {
//     var decoded = jwt.verify(req.headers['authorization'], process.env.JWT_KEY)

//     User.findOne({
//         _id: decoded._id
//     })
//     .then(user => {
//         if(user) {
//             res.json(user)
//         } else {
//             res.send("User does not exist")
//         }
//     })
//     .catch(err => {
//         res.send('error: ' + err)
//     })
// })


// module.exports = users

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
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
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



module.exports = router;