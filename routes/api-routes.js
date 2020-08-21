var path = require("path");
const passport = require("../config/passport");
var db = require('../models')
// Routes
// =============================================================
module.exports = function(app) {

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

  app.post("/api/signup", function(req, res) {
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
  app.get("/api/users/:id", function(req, res) {

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
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

};
