const path = require("path");
const http = require('http');
const express = require("express");
const socketio = require('socket.io');
var fileNameMulter = "1.jpg";


// ##############  EXPRESS STUFF ######################
// Requiring our models for syncing
var db = require("./models");


const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

var passport   = require('./config/passport');
var session    = require('express-session');
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var multer = require('multer');

//multer stuff

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "/public/img/uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, fileNameMulter );
      
        //+ path.extname(file.originalname)

      // var filename = Date.now();

        
      //   switch (file.mimetype) {
      //     case 'image/png':
      //     filename = filename + ".png";
      //     break;
      //     case 'image/jpeg':
      //     filename = filename + ".jpeg";
      //     break;
      //     default:
      //     break;
      //   }
      // cb(null, filename);
    }
  });
   
  var upload = multer({ storage: storage })





//const upload = multer({dest: __dirname + '/public/img/uploads'});
// Sets up the Express App
// =============================================================
const app = express();
const server = http.createServer(app);
const io = socketio(server);


// const server = http.listen(8081, function(){
//     console.log('listening on *:8081');
// })
// const io = socketio(server);

// #############################
//file upload stuff
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// end of file upload stuff

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session());

//require('./config/passport.js')(passport, db.User);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));
// set static folder
app.use(express.static(path.join(__dirname, "public")));

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


// Syncing our sequelize models and then starting our Express app
// =============================================================
// force: true 
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

// Beginning of file upload
app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file){
        fileNameMulter = req.file.originalname;
        console.log(fileNameMulter)
    }
    else throw 'error';
   });



// ######################### en dof file uploa

// Beginning of Server Stuff ############################################################################
var PORT = process.env.PORT || 8080;
const PORT2 = process.env.PORT || 3000;

//

// initializing port for chat
server.listen(PORT2, () => console.log(`Server running on port ${PORT2}`));

