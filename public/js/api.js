
var searchBtn = $("#search-button");
console.log('we loaded js file!!!')
function campusLocation(city){
    
   
    var queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=pizza%20new%20york&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&=AIzaSyBN4HIhuB3jg44HRs46sZvsgD22Z0mY6Uk";



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