$(document).ready(function() {
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
    // bootcamps
    for (var i = 0; i < bootCamps.length; i ++) {
        var bootcamp = $("<li>").appendTo($("#bootcamp"));
        var pbootcamp = $("<a>").appendTo($("#bootcamp"));
        bootcamp.attr("value", bootCamps[i][name]);
        pbootcamp.attr("href", bootCamps[i].link);
        pbootcamp.attr("target", "_blank"); 
        bootcamp.text(bootCamps[i].name);
        pbootcamp.text("Website link");
    } 










    //   users api

    $.ajax({url: "http://localhost:8080/api/users", success: function(results){
        
        // $("#div1").html(result);
        console.log(results);
    }}).then(

    )
    console.log("test")
});
