function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
      x.className += ' responsive';
  } else {
      x.className = 'topnav';
  }
}
// DOM Elements

const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const modalBody = document.querySelector('.modal-body');
const formContent = modalBody.innerHTML;
const close = document.querySelector('.close');
const formData = document.querySelectorAll('.formData');
const inputs = {};
const errors = {};
const regexMail = /^[A-z0-9-.]{1,}[@][A-z-]{2,}[.][A-z]{2,}$/g;

// Errors values

document.querySelectorAll('form .formData input').forEach(input => inputs[input.id] = input);
formData.forEach(form => {
  const errorElement = document.createElement('p');
  const input = Object.values(form.children).find(el => el.name);
  errors[input.name] = errorElement;
  errorElement.classList.add(input.name + '-error');
  errorElement.style.color = '#e54858';
  errorElement.style.fontSize = '0.4em';
  form.append(errorElement);
});

// launch modal event

modalBtn.forEach(btn => btn.addEventListener('click', launchModal));

// launch modal form

function launchModal() {
  modalbg.style.display = 'block';
}

// close modal buton

const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', () => {
const modal = document.querySelector('.bground');
modal.style.display = 'none';
});

// Form submit

const form = document.forms.reserve;

form.addEventListener('submit', function(event) {
  event.preventDefault();
  validate(event);
});



// Form error messages


const validate = event => {
  event.preventDefault();
  let error = false;
  if (!inputs['first'].value || inputs['first'].value.length < 2) {
      errors['first'].textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
      inputs['first'].style.border = '2px solid #e54858';
      inputs['first'].style.borderRadius = '5px';
      error = true;
  } else {
      errors['first'].textContent = '';
      inputs['first'].style.border = '';
      inputs['first'].style.borderRadius = '';
  }
  if (!inputs['last'].value || inputs['last'].value.length < 2) {
      errors['last'].textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
      inputs['last'].style.border = '2px solid #e54858';
      inputs['last'].style.borderRadius = '5px';
      error = true;
  } else {
      errors['last'].textContent = '';
      inputs['last'].style.border = '';
      inputs['last'].style.borderRadius = '';
  }
  if (!inputs['email'].value || !inputs['email'].value.match(regexMail)) {
      errors['email'].textContent = 'Veuillez indiquer une adresse e-mail valide.';
      inputs['email'].style.border = '2px solid #e54858';
      inputs['email'].style.borderRadius = '5px';
      error = true;
  } else {
      errors['email'].textContent = '';
      inputs['email'].style.border = '';
      inputs['email'].style.borderRadius = '';
  }
  if (!inputs['birthdate'].value) {
      errors['birthdate'].textContent = 'Vous devez entrer votre date de naissance.';
      error = true;
  } else {
      errors['birthdate'].textContent = '';
  }
  if (inputs['birthdate'].value) {
      const [year, month, day] = inputs['birthdate'].value.split('-');
      const now = new Date();
      if (+year > now.getFullYear() || +year === now.getFullYear() && +month > now.getMonth() + 1 || +year === now.getFullYear() && +month === now.getMonth() + 1 && +day > now.getDate() || +year === now.getFullYear() && +month === now.getMonth() + 1 && +day === now.getDate()) {
          errors['birthdate'].textContent = 'Vous devez entrer une date de naissance valide.';
          error = true;
      } else {
          errors['birthdate'].textContent = '';
      }
  }
  if (inputs['quantity'].value === '' || isNaN(+inputs['quantity'].value)) {
      errors['quantity'].textContent = 'Veuillez indiquer un nombre.';
      error = true;
  } else {
      errors['quantity'].textContent = '';
  }
  if (!Object.values(inputs).find(input => input.name === 'location' && input.checked)) {
      errors['location'].textContent = 'Veuillez sélectionner une localisation.';
      error = true;
  } else {
      errors['location'].textContent = '';
  }
  if (!inputs['checkbox1'].checked) {
      errors['checkbox'].textContent = 'Vous devez vérifier que vous acceptez les termes et conditions.';
      error = true;
  } else {
      errors['checkbox'].textContent = '';
  }
  if (error)
      return;

  // Hide the form and display confirmation message

  modalBody.innerHTML = '';
  const conf = document.createElement('p');
  conf.textContent = 'Merci ! Votre réservation a été reçue.';
  conf.style.textAlign = 'center';
  conf.style.marginTop = '300px';
  conf.style.marginBottom = '300px';
  modalBody.append(conf);
  const closeBtnConfirm = document.createElement('button');
closeBtnConfirm.textContent = 'Fermer';
closeBtnConfirm.classList.add('btn-submit');
modalBody.append(closeBtnConfirm);
closeBtnConfirm.addEventListener('click', () => {
  const modal = document.querySelector('.bground');
  modal.style.display = 'none';
});
};