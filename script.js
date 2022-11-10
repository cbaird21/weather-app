// Variable declarations
var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-sbt");

// functions
function handleFormSubmit(e) {
  e.preventDefault();

  var input = userInput.value;
}

// Event listners
userForm.addEventListener("submit", handleFormSubmit);
