class Dog {
  constructor(image, name, breed, sex, size, description, features, kennelClub, pedigree, avaliable, email, owner, dob) {
    this.image = image;
    this.name = name;
    this.breed = breed;
    this.sex = sex;
    this.size = size;
    this.description = description;
    this.features = features;
    this.kennelClub = kennelClub;
    this.pedigree = pedigree;
    this.avaliable = avaliable;
    this.email = email;
    this.owner = owner;
    this.dob = dob;
  }
}

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


  const newDog = new Dog(el.proPic.value, el.name.value, el.breed.value, el.sex.value, el.size.value, el.description.value, features, getKennelClub, getPedigree, getAvaliable, el.email.value, owner, el.dob.value);

  postToServer(newDog);
}

async function postToServer(newDog) {
  console.log(newDog);
  const response = await fetch('dogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newDog),
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
