$(document).ready(function() {
    // Getting references to our form and input
    var questContainer = $("div.login-in-container");
    var firstName = $("input#name");
    var lastName = $("input#lastName");
    var nickName = $("input#nickName");

    var phoneNumber = $("input#phone");
    var workPlace = $("input#workPlace");

    var jobRole = {};

    var gender = $('#gender input').on('change', function() {
        alert($('input[name=sch-radio-item-5]:checked', '#gender').val()); 
     });

    
    
     $('optgroup').each(function() {
        jobRole[this.label] = $(this).find('option').map(function() {
         console.log($(this).text());
        return $(this).text();
    }).get();
    });
    

    console.log(JSON.stringify(jobRole));

    var dobMonth = $("select#dob-month").change(function(){
        var selectedMonth = $(this).children("option:selected").val();
    });
    var dobDay = $("select#dob-day").change(function(){
        var selectedDay = $(this).children("option:selected").val();
     });


    var dobYear = $("select#dob-year").change(function(){
        var selectedYear = $(this).children("option:selected").val();
    });

    var dob = dobMonth + "/" + dobDay + "/" + dobYear;
    console.log(dob);

    var dobYear = $("select#dob-year").change(function(){
    var selectedYear = $(this).children("option:selected").val();
    });

    var workExperience =  $("select#work-experience").change(function(){
        var selectedWrkExperience = $(this).children("option:selected").val();
    });


    // When the update form button is clicked, we validate the email and password are not blank
    up.on("updateForm", function(event) {
      event.preventDefault();
      var userData = {
        first_name: firstName.val().trim(),
        last_name: lastName.val().trim(),
        nickname: nickName.val().trim(),
        dob: dob.val().trim(),
        phone_number: phoneNumber.val().trim(),
        work_place: workPlace.val().trim(),
        job_name: jobName.val().trim(),
        work_experience: workExperience.val().trim(),
        gender:gender.val().trim(),
      };
  
      if ( !userData.first_name || !userData.last_name || !userData.dob ) {
        return;
      }
      // If we have a first name, last name askQuest function will be triggered
      askQuest(userData.first_name, userData.last_name, userData.nickname, userData.dob,userData.phone_number, userData.work_place, userData.job_name, userData.work_experience, userData.gender);
      firstName.val("");
      lastName.val("");
      nickName.val("");
      dob.val("");
      phoneNumber.val("");
      workPlace.val("");
      jobName.val("");
      workExperience.val("");
      gender.val("");
    });
  
    // Does a post to the questionnaire route. If successful, we are redirected to the profile page
    // Otherwise we log any errors
    function updateForm(first_name, last_name, nickname, dob, phone_number, job_name, work_experience, gender ) {
      $.post("/api/questionnaire", {
        firstName: first_name,
        lastName: last_name,
        nickName: nickname,
        dob: dob,
        phone_number: phoneNumber,
        work_place: workPlace,
        job_name: jobName,
        work_experience: workExperience,
        gender: gender, 

      })
        .then(function(data) {
          window.location.replace("/profilePage");
          // If there's an error, handle it by throwing up an alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
});
  