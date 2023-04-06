function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal buton

const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', () => {
  const modal = document.querySelector('.bground');
  modal.style.display = 'none';
});

// Form inputs selection 

const firstName= document.getElementById('first');
const lastName= document.getElementById('last');
const emailInput = document.getElementById("email");
const birthDate = document.getElementById("birthdate");


//Listener firstname and lastname inputs 

firstName.addEventListener('focusout',function checkTheName() {
  checkName(firstName,"firstNameID");
});

lastName.addEventListener('focusout',function checkTheName() {
  checkName(lastName,"lastNameID");
});

// Check firstname and lastname registration 

function checkName($name,$id) {
  if ($name.value.length<=2 && document.getElementById($id) == null )
  {
    createElement("p",$id,$name,"Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  }
  else if($name.value.length>2 && document.getElementById($id) != null) {
    const element= document.getElementById($id);
    element.parentElement.removeChild(element);
  }}

// Birthdate limitation

  var today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todaysDate = `${year}-${month}-${day}`;
  birthDate.max = todaysDate;
  

  // Name and firstname error message

  function createElement($typeElem="p",$id="",$element,$message="Veuillez saisir une information"){
    const errorMessage = document.createElement($typeElem);
    errorMessage.setAttribute("id",$id);
    errorMessage.textContent = $message;
    errorMessage.classList.add("data-error");
    $element.insertAdjacentElement("afterend", errorMessage);
  }
  