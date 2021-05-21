const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#pass');
const loginButton = document.querySelector('#login');

async function login(user, pass) {
  const obj = {
    username: user,
    password: pass
  }

  const response = await fetch('http://localhost:8000/api/auth/', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();

  console.log('Login:', data);

  return await data;
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

  if (data.loggedIn) {
    location.href = 'http://localhost:8000/loggedIn.html';
  }
}

function saveToken(token) {
  return new Promise((resolve, reject) => {
    sessionStorage.setItem('auth', token);

    resolve('Done');
  });
}

loginButton.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  const loggedIn = await login(username, password);

  if (loggedIn.success) {
    await saveToken(loggedIn.token);
    location.href = 'http://localhost:8000/loggedIn.html';
  }
});

isLoggedIn();