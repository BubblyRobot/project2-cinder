var express = require("express");
const db = require("../models");

var router = express.Router();

// Import the model (user.js) to use its database functions.
// var profile = require("../models/profilePage.js");

router.get("/", function(req, res) {

  db.User.findAll({})
  .then(
    function(data) {
      var hbsObject = {
        users: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    })
    .catch(err => console.log(err));
});
  
router.post("/api/burgers", function(req, res) {
//   console.log(req.body);
//   burger.insertOne([
//     "burger_name"
//   ], [
//     req.body.name
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
//   // res.end();
});
  
router.put("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition ", condition);

//   burger.updateOne({
//     devoured: req.body.devoured
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
});
  
router.delete("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;
//   burger.delete(condition, function(result) {
//     if (result.affectedRows === 0) {
//       return res.status(404).end();
//     }
//     res.status(200).end();
//   });
});

module.exports = router;