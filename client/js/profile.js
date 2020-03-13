async function setProfileDog() {
  const id = sessionStorage.getItem('dogId');
  const response = await fetch(`dogs/${id}`);
  let profileDog = [];
  if (response.ok) {
    profileDog = await response.json();
  } else {
    console.log('could not fetch from server');
  }
  createProfileTop(profileDog);
  addDescription(profileDog);
  addFeatures(profileDog);
  addKennelClub(profileDog);
  addPedigree(profileDog);
}

function createProfileTop(profileDog) {
  console.log('this is running');
  const newDiv = document.createElement('div');
  const secondDiv = document.createElement('div');
  const newImg = document.createElement('IMG');

  newImg.setAttribute('src', profileDog.image);
  newImg.setAttribute('class', 'profilePic');
  newDiv.appendChild(newImg);

  const name = document.createElement('h2');
  name.textContent = profileDog.name;
  name.setAttribute('class', 'dogName');
  secondDiv.appendChild(name);

  const breed = document.createElement('p');
  breed.textContent = profileDog.breed;
  breed.setAttribute('class', 'dogBreed');
  secondDiv.appendChild(breed);

  const sex = document.createElement('p');
  sex.textContent = profileDog.sex;
  sex.setAttribute('class', 'dogSex');
  secondDiv.appendChild(sex);

  const email = document.createElement('a');
  email.textContent = 'email';
  email.setAttribute('href', 'mailto:' + profileDog.email);
  secondDiv.appendChild(email);
  // let newButton = document.createElement('button');
  // newButton.textContent = 'Chat Now!';
  // newButton.setAttribute('id', 'chatButton')
  // secondDiv.appendChild(newButton);

  newDiv.setAttribute('class', 'displayViews');
  secondDiv.setAttribute('class', 'nameDiv');
  newDiv.appendChild(secondDiv);
  document.querySelector('#mainView').appendChild(newDiv);
}

function addFeatures(profileDog) {
  const newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'middleDivs');
  const featuresTitle = document.createElement('h3');
  featuresTitle.textContent = 'Features';
  featuresTitle.setAttribute('class', 'titles');
  newDiv.appendChild(featuresTitle);
  const newNav = document.createElement('nav');
  for (const feature of profileDog.features) {
    const newFeature = document.createElement('li');
    newFeature.textContent = feature;
    newNav.appendChild(newFeature);
  }
  newDiv.appendChild(newNav);

  document.querySelector('#mainView').appendChild(newDiv);
}

function addDescription(profileDog) {
  const newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'middleDivs');
  const aboutDog = document.createElement('h3');
  aboutDog.textContent = 'About ' + profileDog.name;
  aboutDog.setAttribute('class', 'titles');
  newDiv.appendChild(aboutDog);
  const newDes = document.createElement('p');
  newDes.textContent = profileDog.description;
  newDiv.appendChild(newDes);
  document.querySelector('#mainView').appendChild(newDiv);
}

function addKennelClub(profileDog) {
  const newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'middleDivs');
  const title = document.createElement('h3');
  title.textContent = 'Kennel Club';
  title.setAttribute('class', 'titles');
  newDiv.appendChild(title);

  const kennelImg = document.createElement('IMG');
  kennelImg.setAttribute('id', 'kennelClub');
  if (profileDog.kennelClub === true) {
    kennelImg.setAttribute('src', 'images/kennelClub.png');
  } else {
    kennelImg.setAttribute('src', 'images/RedCross.png');
  }
  newDiv.appendChild(kennelImg);
  document.querySelector('#mainView').appendChild(newDiv);
}

function addPedigree(profileDog) {
  const newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'middleDivs');
  const title = document.createElement('h3');
  title.textContent = 'Pedigree';
  title.setAttribute('class', 'titles');
  newDiv.appendChild(title);

  const pedigreeImg = document.createElement('IMG');
  pedigreeImg.setAttribute('id', 'pedigree');
  if (profileDog.pedigree === true) {
    pedigreeImg.setAttribute('src', 'images/pedigree.png');
  } else {
    pedigreeImg.setAttribute('src', 'images/RedCross.png');
  }
  newDiv.appendChild(pedigreeImg);
  document.querySelector('#mainView').appendChild(newDiv);
}

function loadedProfile() {
  setProfileDog();
}

window.addEventListener('load', loadedProfile);
