//Testing one two three
$(document).ready(function() {
    let codingWebSites = [
        {
            name: "Code Wars",
            link: "https://www.codewars.com"
        },
        {
            name: "Code Conquest",
            link: "https://www.codeconquest.com"
        }, 
        {
            name: "GA Dash",
            link: "https://dash.generalassemb.ly/"
        },
        {
            name: "MIT Open Courseware",
            link: "https://ocw.mit.edu/"
        },
        {
            name: "The Odin Project",
            link: "https://www.theodinproject.com/"
        },
        {
            name: "Udacity",
            link: "https://www.udacity.com/"
        },
        {
            name: "SoloLearn",
            link: "https://www.sololearn.com/"
        },
    ];
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
    //Coding Websites
    for (var i = 0; i < codingWebSites.length; i ++) {
        var codingSites = $("<li>").appendTo($("#codingsites"));
        var pcodingSites = $("<a>").appendTo($("#codingsites"));
        codingSites.attr("value", codingWebSites[i][name]);
        pcodingSites.attr("href", codingWebSites[i].link);
        pcodingSites.attr("target", "_blank"); 
        codingSites.text(codingWebSites[i].name);
        pcodingSites.text("Website link");
    } 

    var source = `<li class="person-info">
    <h3>{{nickname}}</h3>
    <div>
        <h4>{{first_name}} {{last_name}}</h4>
        Contact me at: {{email}}<br><br>
    </div>
    </li>`;
    var template = Handlebars.compile(source);
    var person = "";
    var placeHolder = $("ul.persons");
    $.get("/api/users", function (data) {
        $.each(data, function (idx, val) {
            person = template(val);
            placeHolder.append(person);
        });
    });
});
