var path = require("path");
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/loginPage.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/loginPage.html"));
  });
  
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  app.get("/questionnaire", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/questionnaire.html"));
  });

  app.get("/chatroom", function(req,res){
    res.sendFile(path.join(__dirname, "../public/chatroom.html"));
  })

  app.get("/profilepage", function(req, res) {
    // res.render(path.join(__dirname, "../views/layouts/main.handlebars"));
    res.sendFile(path.join(__dirname, "../public/profilePage.html"));

    db.User.findAll({}).then(
    function(data) {
      var hbsObject = {
        users: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
};
