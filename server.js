var express = require("express");
var path = require("path");
// if(process.env.NODE_ENV !== "production"){
//   require('dotenv').config(); 
// } 


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;


//Added Code here for Chat App susan added

// app is an express app, do what you usually do with express

const http = require('http').Server(app);

const io = require('socket.io')(http);


// Requiring our models for syncing
var db = require("./models");
var passport   = require('./config/passport');
var session    = require('express-session');
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session());

//require('./config/passport.js')(passport, db.User);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

//Sockets Stuff goes here
io.sockets.on('connection', function(socket) {
  socket.on('username', function(username) {
      socket.username = username;
      io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
  });

  socket.on('disconnect', function(username) {
      io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
  })

  socket.on('chat_message', function(message) {
      io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
  });

});


// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/api-external.js")(app);
require("./routes/html-routes.js")(app);

// using controllers for routes
// var routes = require("./controllers/profilePage_controller.js");
// app.use(routes);

// handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// Public Views

app.set("view engine", "handlebars");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

const server = http.listen(8081, function() {
  console.log('listening on *:8081');
});