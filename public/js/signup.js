$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var firstName = $("input#name");
    var lastName = $("input#lastName");
    var nickName = $("input#nickName")
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        first_name: firstName.val().trim(),
        last_name: lastName.val().trim(),
        nickname: nickName.val().trim(),
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };

      if (!userData.email || !userData.password || !userData.first_name || !userData.last_name) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData);
      firstName.val("");
      lastName.val("");
      nickName.val("");
      emailInput.val("");
      passwordInput.val("");

    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(user) {
      $.post("/api/signup", user)
        .then(function(data) {
          window.location.replace("/questionnaire");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
