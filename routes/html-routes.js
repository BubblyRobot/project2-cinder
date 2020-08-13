var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/welcomePage.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/loginPage.html"));
  });
  
  app.get("/prompt", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/promptPage.html"));
  });
  // cms route loads cms.html

};
