const el = {};

const user = 1;

function setElements() {
  el.sexFilter = document.querySelector('#sexFilter');
  el.filterBtn = document.querySelector('#filterBtn');
  el.secondView = document.querySelector('#secondView');
}

function clearView() {
  el.secondView.textContent = '';
}

async function getDogs() {
  let dogs;
  let response;
  const sex = el.sexFilter.value;
  if (sex === 'any') {
    response = await fetch('dogs');
  } else {
    response = await fetch(`dogs/sex/${sex}`);
  }
  if (response.ok) {
    dogs = await response.json();
  } else {
    console.log('could not get dogs');
  }
  addDogProfile(dogs);
}

function addDogFeature(feature, featureName, div) {
  const addFeature = document.createElement('p');
  addFeature.textContent = `${featureName}: ${feature}`;
  div.appendChild(addFeature);
}

function binaryToString(bin) {
  let str = '';
  if (bin === 1) {
    str = 'yes';
  } else if (bin === 0) {
    str = 'no';
  } else {
    str = 'error';
  }
  return str;
}

function addDogProfile(dogs) {
  clearView();
  for (const dog of dogs) {
    const newDiv = document.createElement('div');
    const secondDiv = document.createElement('div');

    const newImg = document.createElement('img');
    newImg.setAttribute('src', dog.image);
    newImg.setAttribute('width', '100em');
    newImg.setAttribute('height', '140em');
    newImg.setAttribute('class', 'dogImage');
    newDiv.appendChild(newImg);

    addDogFeature(dog.name, 'name', secondDiv);
    addDogFeature(dog.breed, 'breed', secondDiv);
    addDogFeature(dog.sex, 'sex', secondDiv);

    const avaliable = binaryToString(dog.avaliable);
    addDogFeature(avaliable, 'avaliable for breeding', secondDiv);

    const linkProfile = document.createElement('a');
    linkProfile.textContent = 'view profile';
    linkProfile.href = `/profile.html#${dog.id}`;
    secondDiv.appendChild(linkProfile);

    const addbreak = document.createElement('br');
    secondDiv.appendChild(addbreak);

    console.log(dog.owner);
    if (dog.owner !== user) {
      const msg = document.createElement('a');
      msg.textContent = 'message';
      msg.href = `messages.html#${dog.owner}`;
      secondDiv.appendChild(msg);
    }

    const email = document.createElement('a');
    email.textContent = 'email';
    email.setAttribute('href', 'mailto:' + dog.email);
    secondDiv.appendChild(email);

    secondDiv.setAttribute('class', 'secondDiv');
    newDiv.appendChild(secondDiv);
    newDiv.setAttribute('class', 'profileView');
    el.secondView.appendChild(newDiv);
  }
}

function addEventListeners() {
  el.filterBtn.addEventListener('click', getDogs);
}

function loadedSearch() {
  setElements();
  addEventListeners();
}

window.addEventListener('load', loadedSearch);
