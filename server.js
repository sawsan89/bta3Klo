var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var path = require('path')
var mongoose = require('mongoose');
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

require('dotenv').config();
// if(process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"))

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, "client", "build", "index.html"))
//     })
// }

const mongoURI = process.env.ATLAS_URI;

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DataBase connected to the server'))
    .catch(err => console.log(err))

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

var Users = require('./routes/Users')

app.use('/', Users)




const User = require('./models/User');
//function to get all data 
app.get("/search", function(req, res)  {
  User.find(function(err,user)  {
      if(err){
          throw err;
      }
      console.log(user)
      res.json(user);
  });
  })
  











app.listen(port, () => {
    console.log(`Server is running on ${port} Visit https://localhost:${port}`)
})