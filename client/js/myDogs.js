async function getDogs() {
  const owner = 1;
  const response = await fetch(`dogs/owner/${owner}`);
  let dogs;
  if (response.ok) {
    dogs = await response.json();
  } else {
    console.log('error');
  }
  listDogs(dogs);
}

function createNewElement(value, sideDiv) {
  const el = document.createElement('p');
  el.textContent = value;
  sideDiv.appendChild(el);
}

function addBreak(div) {
  const addBreak = document.createElement('br');
  div.appendChild(addBreak);
}

function listDogs(dogs) {
  for (const dog of dogs) {
    const mainDiv = document.createElement('div');
    const sideDiv = document.createElement('div');

    const newImg = document.createElement('img');
    newImg.setAttribute('src', dog.image);
    newImg.setAttribute('width', '100em');
    newImg.setAttribute('height', '140em');
    newImg.setAttribute('class', 'dogImage');
    mainDiv.appendChild(newImg);

    createNewElement(dog.name, sideDiv);
    createNewElement(dog.breed, sideDiv);
    createNewElement(dog.sex, sideDiv);

    const profile = document.createElement('a');
    profile.textContent = 'profile';
    profile.href = `/profile.html#${dog.id}`;
    sideDiv.appendChild(profile);

    addBreak(sideDiv);

    const edit = document.createElement('a');
    edit.textContent = 'edit profile';
    edit.href = `/editProfile.html#${dog.id}`;
    sideDiv.appendChild(edit);

    sideDiv.setAttribute('class', 'secondDiv');
    mainDiv.appendChild(sideDiv);
    mainDiv.setAttribute('class', 'profileView');

    document.querySelector('#mainView').appendChild(mainDiv);
  }
}


function addDogButton() {
  const addDog = document.createElement('button');
  addDog.textContent = 'Add Dog';
  addDog.addEventListener('click', function () {
    window.location.href = 'add_dog.html';
  });
  document.querySelector('#mainView').appendChild(addDog);
}

function loadedDogs() {
  getDogs();
  // listDogs();
  addDogButton();
}

window.addEventListener('load', loadedDogs);
