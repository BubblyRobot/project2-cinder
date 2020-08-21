const PRODUCTION = process.env.PRODUCTION;
const axios = require("axios");
var path = require("path");
const passport = require("../config/passport");
var db = require('../models')
require("dotenv").config();


// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html

  app.post("/api/login", passport.authenticate("local"), (req, res) => {

    console.log('we hit this route')
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.post("/api/signup", function (req, res) {
    db.User.create({

        first_name: req.body.first_name,
        last_name: req.body.last_name,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        picture: null,
        aboutme: null,
        dob: null,
        phone: null,
        work_place: null,
        job_role: null,
        experience: null,
        language: null
      })
        .then(() => {
          // res.redirect(307, "/api/questionnaire");
          res.sendFile(path.join(__dirname, "../public/questionnaire.html"));
        })
        .catch(err => {
          res.status(401).json(err);
        });
  });

  // route to get users list
  app.get("/api/users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findAll({ 
    }).then(function(dbUser) {
      res.json(dbUser);

    });
  });

  // route for rendering one specific user
  app.get("/api/users/:id", function (req, res) {

    db.User.findOne({
      where: {
        id: req.params.id
      }

    }).then(function(data) {
      var hbsObject = {
        users: data
      };
      console.log(hbsObject);
      res.render("user", hbsObject);

    }).catch(err => {
      console.log(err);
    });
  });
  // db.User.findAll({}).then(
  //   function(data) {
  //     var hbsObject = {
  //       users: data
  //     };
      // console.log(hbsObject);
      // console.log(hbsObject.users[0].dataValues);
      // for (var i = 0; i < users.length; i ++){
      //   var user = hbsObject.users[i].dataValues;
      //   res.render("index", {
      //     first_name: user.first_name,
      //     last_name: user.last_name
      //   });
      // }
    // });
  app.put("/api/questionnaire", function(req, res) {
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });


  app.get("/api/place", function (req, response) {
    
    console.log("this hit the quereyurl")
    const queryUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.query.userInput}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${process.env.GOOGLE_API_KEY}`;
    axios.get(queryUrl).then(function (result) {
      console.dir(result.data.candidates[0]);
      response.json(result.data.candidates[0])
      // const places = result.data.map(function (place) {
      //   console.log(place)
      //   response.json(place);
      // });
    });


  });
  // cms route loads cms.html

};
