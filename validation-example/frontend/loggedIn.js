const nameElem = document.querySelector('#name');
const emailElem = document.querySelector('#email');
const formElem = document.querySelector('#change');
const bodyElem = document.querySelector('body');


async function changePassword(pass) {
  let obj = {
    password: pass
  }

  const response = await fetch('http://localhost:8000/api/user/change', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
}

async function removeAccount() {
  const response = await fetch('http://localhost:8000/api/user/remove', {
    method: 'DELETE'
  });
  const data = await response.json();
  console.log(data);
}

function createForm() {
  const inputElem = document.createElement('input');
  inputElem.setAttribute('type', 'password');

  const buttonElem = document.createElement('button');
  buttonElem.setAttribute('id', 'changeButton');
  buttonElem.innerHTML = 'Byt lösenord';

  buttonElem.addEventListener('click', () => {
    console.log(inputElem.value);
    changePassword(inputElem.value);
  });

  formElem.append(inputElem);
  formElem.append(buttonElem);
}

function createRemoveButton() {
  const buttonElem = document.createElement('button');
  buttonElem.innerHTML = 'Ta bort mitt konto';

  buttonElem.addEventListener('click', () => {
    removeAccount();
  });

  bodyElem.append(buttonElem);
}


async function getAllUsers() {
  const response = await fetch('http://localhost:8000/api/user/all');
  const data = await response.json();

  console.log(data);
}

function saveToken(token) {
  return new Promise((resolve, reject) => {
    sessionStorage.setItem('auth', token);

    resolve('Done');
  });
}

async function getUserInfo() {
  const token = getToken();
  const response = await fetch('http://localhost:8000/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }});
  const data = await response.json();

  await saveToken(data.token);

  console.log(data);
  nameElem.innerHTML = `${data.user.firstname} ${data.user.lastname}`;
  emailElem.innerHTML = data.user.email;

  if (data.user.role === 'admin') {
    getAllUsers();
    createForm();
  } else if (data.user.role === 'user') {
    createRemoveButton();
  }
}

function getToken() {
  return sessionStorage.getItem('auth');
}

async function isLoggedIn() {
  const token = getToken();
  const response = await fetch('http://localhost:8000/api/auth/loggedin', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();

  if (!data.loggedIn) {
    location.href = 'http://localhost:8000';
  } else {
    getUserInfo();
  }
}

isLoggedIn();