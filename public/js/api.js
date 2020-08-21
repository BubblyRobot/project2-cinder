
var searchBtn = $("#search-button");
console.log('we loaded js file!!!')
//


// backend interal call db 
// routes backend and call the external api and return teh data to the front

function campusLocation(){
    
 var queryURL = "/api/place/"
  //  var queryURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=pizza%20new%20york&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${PRODUCTION}`;


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