
var searchBtn = $("#search-button");
require("dotenv").config(process.env.GOOGLE_API_KEY);

const api_key = process.env.GOOGLE_API_KEY;



console.log('we loaded js file!!!')
function campusLocation(city){
    
   
    var queryURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=pizza%20new%20york&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${api_key}`;



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)

        


    }).catch(function(err){
        console.log('ERR!!!',err)
    })
}
campusLocation()