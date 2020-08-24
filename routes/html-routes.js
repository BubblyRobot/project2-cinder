var path = require("path");
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/profilepage");
    }
    res.sendFile(path.join(__dirname, "../public/loginPage.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/profilepage");
    }
    res.sendFile(path.join(__dirname, "../public/loginPage.html"));
  });
  
  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/profilepage");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  app.get("/questionnaire", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/questionnaire.html"));
  });

  app.get("/chatroom", function(req,res){
    res.sendFile(path.join(__dirname, "../public/chatroom.html"));
  })

  app.get("/upload", function(req,res){
    res.sendFile(path.join(__dirname, "../public/upload.html"));
  })

  app.get('/photo/:id', (req, res) => {
    var filename = req.params.id;
     
    db.collection('mycollection').findOne({'_id': ObjectId(filename) }, (err, result) => {
     
        if (err) return console.log(err)
     
       res.contentType('image/jpeg');
       res.send(result.image.buffer)
       
        
      })
    })

  app.get("/profilepage", function(req, res) {
    // res.sendFile(path.join(__dirname, "../views/layouts/main.handlebars"));
    // res.render(path.join(__dirname, "../views/index.handlebars"));
    // res.render('index', {
    //   first_name: 'test1',
    //   last_name:'test2',
    //   nickname: 'test3',
    //   email: 'email'
    // })

    db.User.findAll({}).then(
    function(data) {
      // var hbsObject = {
      //   users: [data]
      // };
      console.log(data);
      res.render("index", data);
    });
  });
};
