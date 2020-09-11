$(document).ready(function() {

  // Getting references to our form and input
  var updateForm = $("form.updateForm");
  var firstName = $("input#firstName");
  var lastName = $("input#lastName");
  var nickName = $("input#nickName");
  var phoneNumber = $("input#phoneNumber");
  var workPlace = $("input#workPlace");
  var aboutme = $("input#aboutme");
  var id;
  var selectedWrkExperience;
  var cancelBtn = $("input#cancel");
  // var url = window.location.search;

  // This file does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    id = data.id;
    // $(".member-name").text(data.email);
    $("input#firstName").text(data.first_name);
    
  });
  
  var langString = "";
  $("input[type=checkbox]").click(function(){
    var language = [];
    $.each($("input[name='language']:checked"), function(){
      // console.log($(this).val());
      language.push($(this).val());
      langString = language.join(", ")
    })
    console.log(langString);
  })
  
  
  var jobRole;
  var selectJobRole = $("select#jobRole").change(function(){
    jobRole = $(this).children("option:selected").val();
  });

  var selectedMonth;
  var selectedDay;
  var selectedYear;
  var dobMonth = $("select#dobMonth").change(function(){
    selectedMonth = $(this).children("option:selected").val();
  });
  var dobDay = $("select#dobDay").change(function(){
    selectedDay = $(this).children("option:selected").val();
   });
  var dobYear = $("select#dobYear").change(function(){
    selectedYear = $(this).children("option:selected").val();
  });
  var workExperience =  $("select#workExperience").change(function(){
    selectedWrkExperience = $(this).children("option:selected").val();
  });
  cancelBtn.on('click', function(event) {
    event.preventDefault();
    console.log("cancel clicked");
    window.location.href = "/profilepage";
  })
  // When the update form button is clicked, we validate the email and password are not blank
  updateForm.on('submit', function(event) {
    event.preventDefault();
    var dob = selectedYear.toString() + "-" + selectedMonth.toString() + "-" + selectedDay.toString();
    console.log("the language is ", langString);
    console.log("we hitted submit btn")
    console.log("month:", selectedMonth);
    console.log("day:", selectedDay);
    console.log("year:", selectedYear);
    console.log("work experience:", selectedWrkExperience);
    console.log(jobRole);
    var userData = {
      first_name: firstName.val().trim(),
      last_name: lastName.val().trim(),
      nickname: nickName.val().trim(),
      aboutme: aboutme.val().trim(),
      dob: dob,
      phone: phoneNumber.val().trim(),
      work_place: workPlace.val().trim(),
      job_role: jobRole,
      experience: selectedWrkExperience,
      language: langString
    };
    console.log(userData);
    // if ( !userData.first_name || !userData.last_name || !userData.dob ) {
    //   return;
    // }
    // If we have a first name, last name updateForm function will be triggered
    updateUserInfo(userData);
  });
  function updateUserInfo(user) {
    $.ajax({
      method: "PUT",
      url: "/api/questionnaire/" + id,
      data: user
    })
      .then(function() {
        window.location.href = "/profilepage";
      });
  }

  // function handleLoginErr(err) {
  //   $("#alert .msg").text(err.responseJSON);
  //   $("#alert").fadeIn(500);
  // }
});