var searchBtn = $("#search-button");
console.log('we loaded js file!!!')
//
// backend interal call db 
// routes backend and call the external api and return teh data to the front
function campusLocation() {
    var queryURL = "/api/place/"
    //  var queryURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=pizza%20new%20york&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${PRODUCTION}`;
    $("#saveBut").click(function () {
        console.log("plz work")
        console.log($("#usersInput").val())
        $("input:text").val("coworking");
        $.ajax({
            data: {
                userInput: $("#usersInput").val()
            },
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.name)
            $("#location").text(JSON.stringify(response.formatted_address));
            $("#tyler").text(JSON.stringify(response.name));
            $("#image").text(response.photos[1])
        }).catch(function (err) {
            console.log('ERR!!!', err)
        })
    })
}
function cafeLocation() {
    var cafe = "/api/place/"
    $("#saveBut").click(function () {
        $("input:text").val("cafe");
        console.log("plz work")
        console.log($("#usersInput").val())
        $.ajax({
            data: {
                userInput: $("#usersInput").val()
            },
            url: cafe,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            $("#locationTwo").text(JSON.stringify(response.formatted_address));
            $("#tylerTwo").text(JSON.stringify(response.name));
            $("#imageTwo").text(response.photos[1].photo_reference[0])
        }).catch(function (err) {
            console.log('ERR!!!', err)
        })
    })
}
function libraryLocation() {
    var cafe = "/api/place/"
    $("#saveBut").click(function () {
        $("input:text").val("library");
        console.log("plz work")
        console.log($("#usersInput").val())
        $.ajax({
            data: {
                userInput: $("#usersInput").val()
            },
            url: cafe,
            method: "GET"
        }).then(function (response) {
            console.log(response.photos[0].photo_reference)
            $("#locationThree").text(JSON.stringify(response.formatted_address));
            $("#tylerThree").text(JSON.stringify(response.name));
        }).catch(function (err) {
            console.log('ERR!!!', err)
        })
    })
}
campusLocation()
cafeLocation()
libraryLocation()