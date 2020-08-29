// var mysql = require("mysql");
// require("dotenv").config(process.env.PRODUCTION);

// var connection;
// if (process.env.JAWSDB_URL) {
//   connection = mysql.createConnection({"use_env_variable": "JAWSDB_URL"});
//   console.log("I'm in the Jawsdb area")
  
// } else {
  
//   connection = mysql.createConnection(process.env.PRODUCTION);
//   console.log("I'm in the MySQL area")
// }

// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// module.exports = connection;