// needed on all pages

function loggedIn() {
  const isLoggedIn = true;
  const user = 'Joe Bloggs';

  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'signIn');

  if (isLoggedIn === true) {
    const logInMessage = document.createElement('p');
    logInMessage.textContent = 'Welcome ' + user;
    const signOutButton = document.createElement('button');
    signOutButton.textContent = 'log out';
    logInMessage.setAttribute('class', 'headerText');
    signOutButton.setAttribute('class', 'headerText signInButton');
    newDiv.appendChild(logInMessage);
    newDiv.appendChild(signOutButton);
  } else {
    const signInButton = document.createElement('button');
    signInButton.textContent = 'sign in';
    signInButton.setAttribute('class', 'signInButton');
    newDiv.appendChild(signInButton);
  }
  document.querySelector('#header').appendChild(newDiv);
}

function navButtons() {
  document.querySelector('#searchButton').addEventListener('click', function () {
    window.location.href = 'index.html';
  });
  document.querySelector('#dogButton').addEventListener('click', function () {
    window.location.href = 'dog_list.html';
  });
}
// end of needed code

function loaded() {
  loggedIn();
  navButtons();
}

window.addEventListener('load', loaded);
