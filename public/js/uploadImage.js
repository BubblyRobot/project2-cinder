$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.upload");
    var imageElement = document.getElementById(profileImage);
    var profilePic;

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
//      event.preventDefault();
      imageElement.src="/img/uploads/1.jpg";
      
    });


});