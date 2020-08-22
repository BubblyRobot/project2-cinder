$(document).ready(function() {
  // Getting references to our form and input
  var updateForm = $("form.updateForm");
  var firstName = $("input#firstName");
  var lastName = $("input#lastName");
  var nickName = $("input#nickName");
  var phoneNumber = $("input#phoneNumber");
  var workPlace = $("input#workPlace");

  var jobRole = {};
  var language = $('#language :checkbox:checked').map(function() {
    return $(this).val();
  });

  console.log(language);
  
  
  $('optgroup').each(function() {
    jobRole[this.label] = $(this).find('option').map(function() {
      // console.log($(this).text());
    return $(this).text();
  }).get();
  });
  

  // console.log(JSON.stringify(jobRole));
  // console.log(jobRole)

  var dobMonth = $("select#dobMonth").change(function(){
      var selectedMonth = $(this).children("option:selected").val();
  });
  var dobDay = $("select#dobDay").change(function(){
      var selectedDay = $(this).children("option:selected").val();
   });


  var dobYear = $("select#dobYear").change(function(){
      var selectedYear = $(this).children("option:selected").val();
  });

  var dob = Date.parse(this.selectedMonth + "/" + this.selectedDay + "/" + this.selectedYear);
  console.log(dob);

  var workExperience =  $("select#workExperience").change(function(){
      var selectedWrkExperience = $(this).children("option:selected").val();
  });



  // When the update form button is clicked, we validate the email and password are not blank
  updateForm.on('update', function(event) {
    event.preventDefault();
    var userData = {
      first_name: firstName.val().trim(),
      last_name: lastName.val().trim(),
      nickname: nickName.val().trim(),
      dob: dob,
      phone_number: phoneNumber.val().trim(),
      work_place: workPlace.val().trim(),
      job_role: jobRole,
      work_experience: workExperience.val().trim(),
    };
    console.log(userData);
    if ( !userData.first_name || !userData.last_name || !userData.dob ) {
      return;
    }
    // If we have a first name, last name updateForm function will be triggered
    updateUserInfo(userData);
    firstName.val("");
    lastName.val("");
    nickName.val("");
    dob.val("");
    phoneNumber.val("");
    workPlace.val("");
    jobRole.val("");
    workExperience.val("");
  });
  // Does a post to the questionnaire route. If successful, we are redirected to the profile page. Otherwise we log any errors
  function updateUserInfo(user ) {
    $.post("/api/questionnaire", user)
      .then(function(data) {
        window.location.replace("/profilepage");
        // If there's an error, handle it by throwing  an alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});