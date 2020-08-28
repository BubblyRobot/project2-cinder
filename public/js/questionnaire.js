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
  var jobRole = [];
  var language = $('#language :checkbox:checked').map(function() {
    return $(this).val();
  });

  console.log(language);
  
  
  $('optgroup').each(function() {
    jobRole[this.label] = $(this).find('option').map(function() {
      
      return $(this).text();
      
    }).get();
    console.log($(this).text());
  });
  

  // console.log(JSON.stringify(jobRole));
  // console.log(jobRole)
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

  // var dob = Date.parse(this.selectedMonth + "/" + this.selectedDay + "/" + this.selectedYear);
  // console.log(dob);
  // var dob = selectedYear.toString() + "-" + selectedMonth.toString() + "-" + selectedDay.toString();
  // console.log("month:", selectedMonth);
  // console.log(dob);

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
      experience: selectedWrkExperience
    };

    console.log(userData);
    // if ( !userData.first_name || !userData.last_name || !userData.dob ) {
    //   return;
    // }
    // If we have a first name, last name updateForm function will be triggered
    updateUserInfo(userData);

  });
  // Does a post to the questionnaire route. If successful, we are redirected to the profile page. Otherwise we log any errors
  // function updateUserInfo(user ) {
  //   $.post("/api/questionnaire", user)
  //     .then(function(data) {
  //       window.location.replace("/profilepage");
  //       // If there's an error, handle it by throwing  an alert
  //     })
  //     .catch(handleLoginErr);
  // }
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