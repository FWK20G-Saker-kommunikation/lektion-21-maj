const usernameElem = document.querySelector('#username');
const passwordElem = document.querySelector('#password');
const emailElem = document.querySelector('#email');
const firstnameElem = document.querySelector('#firstname');
const lastnameElem = document.querySelector('#lastname');
const buttonElem = document.querySelector('button');


async function createAccount(account) {
  const response = await fetch('http://localhost:8000/api/auth/create', {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return await data.success;
}


function validatePassword(password) {
  let validation = {
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialCharacter: false
  }

  if (password.length >= 8) {
    validation.length = true;
  }

  const lowerCaseRegex = /[a-z]/;
  if (password.match(lowerCaseRegex)) {
    validation.lowercase = true;
  }

  const uppercaseRegex = /[A-Z]/;
  if (password.match(uppercaseRegex)) {
    validation.uppercase = true;
  }

  const numberRegex = /[0-9]/;
  if (password.match(numberRegex)) {
    validation.number = true;
  }

  const specialCharacterRegex = /\W/;
  if (password.match(specialCharacterRegex)) {
    validation.specialCharacter = true;
  }

  console.log(validation);

  return validation;
}

function checkValidation(validation) {
  if (validation.length && validation.lowercase
    && validation.uppercase && validation.number
    && validation.specialCharacter) {
      return true;
  } else {
    return false;
  }
}

passwordElem.addEventListener('keyup', () => {
  validatePassword(passwordElem.value);
})

buttonElem.addEventListener('click', async () => {
  let account = {
    username: usernameElem.value,
    password: passwordElem.value,
    email: emailElem.value,
    firstname: firstnameElem.value,
    lastname: lastnameElem.value
  }
  
  const passwordValidated = validatePassword(account.password);
  
  if (checkValidation(passwordValidated)) {
    const createdAccount = await createAccount(account);

    if (createdAccount) {
      location.href = 'http://localhost:8000';
    }
  }
});