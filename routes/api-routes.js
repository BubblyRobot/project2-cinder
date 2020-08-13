var path = require("path");
const passport = require("../config/passport");
var db = require('../models')
// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    
    console.log('we thit he route')
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.post("/signup", function(req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password
      })
        .then(() => {
          res.redirect(307, "/api/login");
        })
        .catch(err => {
          res.status(401).json(err);
        });
  });

  // cms route loads cms.html

};
