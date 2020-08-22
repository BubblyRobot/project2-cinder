
var searchBtn = $("#search-button");
console.log('we loaded js file!!!')
//


// backend interal call db 
// routes backend and call the external api and return teh data to the front

<<<<<<< HEAD
=======

>>>>>>> 589d224b7f4e3bc061aa100f363133d7c9123c39

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



<<<<<<< HEAD
=======

>>>>>>> 589d224b7f4e3bc061aa100f363133d7c9123c39
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
// function photoLocation() {
//     var photo = "/api/place/"
//     var photoRef;
//     var photoURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.GOOGLE_API_KEY}` 


//     $("#saveBut").click(function () {
//         $("input:text").val("library");
//         console.log("plz work")
//         console.log($("#usersInput").val())



//         $.ajax({
//             data: {
//                 userInput: $("#usersInput").val()
//             },
//             url: photo,
//             method: "GET"
//         }).then(function (response) {



//             $("#imageThree").text(response.photos[0].photo_reference)

//             photoRef = response.photos[0].photo_reference;

//             console.log("i worked", $('#imageThree'))
//         }).catch(function (err) {
//             console.log('ERR!!!', err)
//         })
//         $.ajax({

//             url: photoURL,
//             method: "GET"
//         }).then(function (response) {
//             $("#imageThree").text(response.photos[0].photo_reference)
//             var img = $("<img>").appendto($("#imageThree"))
//             img.attr("src", photoURL)
//         });

//     })

// }
campusLocation()
cafeLocation()
libraryLocation()
// photoLocation()