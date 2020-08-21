const express = require("express");
const path = require("path");

const socketio = require('socket.io');
// Sets up the Express App
// =============================================================
const app = express();
const http = require('http').Server(app);



const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
// ##############  EXPRESS STUFF ######################
// Requiring our models for syncing
var db = require("./models");
const formatMessage = require('./utils/messages');
var passport   = require('./config/passport');
var session    = require('express-session');
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");



// Beginning of Server Stuff ############################################################################
var PORT = process.env.PORT || 8080;

//

// initializing port for chat


const server = http.listen(8081, function(){
    console.log('listening on *:8081');
})
const io = socketio(server);

// #############################

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session());

//require('./config/passport.js')(passport, db.User);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));


// Routes
// =============================================================
require("./routes/api-routes.js")(app);
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

// #########################################  End of Express Stuff ######################


// ######################################    All Chat Stuff 

// ===============================================================
const botName = "Cinder Bot";

 // Run when a client connects
 io.on('connection', socket =>{

    //joining the room here
     socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);
        socket.join(user.room);


         // Welcome current user goes to specific user
        socket.emit('message', formatMessage(botName, 'Welcome to Cinder Chat!'));

     // Broacast when a user connects
    socket.broadcast
        .to(user.room)
        .emit('message', formatMessage(botName, `${user.username} has joined the chat`));
     
        // Send users and room info to the particular Room 
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chnatMessage
    socket.on('chatMessage', (msg) => {

        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username, msg));
    });


    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit(
            'message',
             formatMessage(botName, `${user.username} has left the chat`));
            
             // Update users and room info
             io.to(user.room).emit('roomUsers', {
                 room: user.room,
                 users: getRoomUsers(user.room)
             });
        }
    });

 });




// ====================================================================== End of Sockets Chat App Functionality