/*for terms and agreement*/
<script>

function checkForm(form)
{
  if(!form.terms.checked) {
    alert("Please indicate that you accept the Terms and Conditions");
    form.terms.focus();
    return false;
  }
  return true;
}

</script>


<h3>{{nickname}}</h3>
<div>  
  {{this.User.dataValues.first_name}}, {{last_name}}<br>
  {{email}}<br>
</div>

<ul class="chat-users">
{{#each users}}
  {{> users/user}}
{{/each}}
</ul>


<h3>{{nickname}}</h3>
<div>  
{{first_name}}, {{last_name}}<br>
{{email}}<br>
</div>