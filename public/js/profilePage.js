let bootCamps = [
    {
    name: "Columbia Engineering Boot Camps",
    link: "https://bootcamp.cvn.columbia.edu/?utm_source=coursereport&utm_medium=schoolpage"
},
{
    name: "Flatiron School",
    link: "https://flatironschool.com/?utm_source=coursereport&utm_medium=schoolpage"
},
{
    name: "Hack Reactor",
    link: "https://www.hackreactor.com/coding-bootcamp"
},
{
    name: "Codesmith",
    link: "https://www.codesmith.io"
},
{
    name: "App Academy",
    link: "https://www.appacademy.io"
},
{
    name: "Turing",
    link: "https://turing.io"
},
{
    name: "Fullstack Academy",
    link: "https://www.fullstackacademy.com"
},
{
    name: "General Assembly",
    link: "https://generalassemb.ly"
},
{
    name: "Tech Elevator",
    link: "https://www.techelevator.com"
},
{
    name: "Coder Academy",
    link: "https://coderacademy.edu.au/?utm_source=coursereport&utm_medium=schoolpage"
}
]
$(document).ready(function() {

    $.ajax({url: "http://localhost:8080/api/users", success: function(results){
        
        // $("#div1").html(result);
        console.log(results);
    }});
    console.log("test")
});
