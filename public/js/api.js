
var searchBtn = $("#search-button");
console.log('we loaded js file!!!')
//

<<<<<<< HEAD
const appApi = require("dotenv").config(process.env.GOOGLE_API_KEY);
//const PRODUCTION = process.env.PRODUCTION;
=======
// backend interal call db 
// routes backend and call the external api and return teh data to the front
>>>>>>> e8b252f2cbb0c18ffe82de2cf79f62a9bb37ad8d


function campusLocation(){
    
<<<<<<< HEAD
   
    var queryURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=pizza%20new%20york&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${GOOGLE_API_KEY}`;
=======
 var queryURL = "/api/place/"
  //  var queryURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=pizza%20new%20york&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${PRODUCTION}`;
>>>>>>> e8b252f2cbb0c18ffe82de2cf79f62a9bb37ad8d


  $("#saveBut").click(function(){
    console.log("plz work")
    console.log($("#usersInput").val())

    $.ajax({
        data:{
            userInput: $("#usersInput").val()
        },
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response.name)
        $("#location").text(JSON.stringify(response.formatted_address));
        $("#tyler").text(JSON.stringify(response.name));
    }).catch(function(err){
        console.log('ERR!!!',err)
    })

  })

}
campusLocation()