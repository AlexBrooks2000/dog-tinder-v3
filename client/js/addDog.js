const el = {};

function setElements() {
  el.proPic = document.querySelector('#dogProfile');
  el.name = document.querySelector('#dogName');
  el.breed = document.querySelector('#dogBreed');
  el.sex = document.querySelector('#dogSex');
  el.size = document.querySelector('#dogSize');
  el.features = document.getElementsByClassName('features');
  el.featuresDiv = document.querySelector('#features');
  el.description = document.querySelector('#description');
  el.kennelClub = document.querySelector('#dogKennel');
  el.pedigree = document.querySelector('#dogPedigree');
  el.avaliable = document.querySelector('#avaliable');
  el.email = document.querySelector('#email');
  el.dob = document.querySelector('#dob');
  el.featuresBtn = document.querySelector('#featuresBtn');
  el.addBtn = document.querySelector('#addBtn');
  el.dob = document.querySelector('#dob');
}

function addField() {
  const newField = document.createElement('input');
  newField.setAttribute('class', 'features');
  const addBreak = document.createElement('br');
  el.featuresDiv.append(newField, addBreak);
}

function binaryTF(value) {
  let retval;
  if (value === 'yes') {
    retval = 1;
  } else if (value === 'no') {
    retval = 0;
  } else {
    retval = 'error';
  }
  return retval;
}

function convertFeatures(featureEl) {
  let features = '';
  for (const feature of featureEl) {
    features += `| ${feature.value}`;
  }
  return features;
}

function createDogobject() {
  const features = convertFeatures(el.features);
  const getKennelClub = binaryTF(el.kennelClub.value);
  const getPedigree = binaryTF(el.pedigree.value);
  const getAvaliable = binaryTF(el.pedigree.value);
  const owner = 1;

  const newDog = new FormData();
  newDog.append('image', el.proPic.files[0]);
  newDog.append('name', el.name.value);
  newDog.append('breed', el.breed.value);
  newDog.append('sex', el.sex.value);
  newDog.append('description', el.description.value);
  newDog.append('features', features);
  newDog.append('kennelClub', getKennelClub);
  newDog.append('pedigree', getPedigree);
  newDog.append('avaliable', getAvaliable);
  newDog.append('email', el.email.value);
  newDog.append('owner', owner);
  newDog.append('dob', el.dob.value);

  postToServer(newDog);
}

async function postToServer(newDog) {
  const response = await fetch('dogs', {
    method: 'POST',
    body: newDog,
  });

  if (response.ok) {
    console.log('posted to the server');
  } else {
    console.log('could not post to server');
  }
}

function addEventListeners() {
  el.featuresBtn.addEventListener('click', addField);
  el.addBtn.addEventListener('click', createDogobject);
}

function loadAddDogs() {
  setElements();
  addEventListeners();
}

window.addEventListener('load', loadAddDogs);
