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
  el.featuresBtn = document.querySelector('#featuresBtn');
  el.editBtn = document.querySelector('#editBtn');
  el.dob = document.querySelector('#dob');
}

console.log(window.location.hash.substring(1));

async function getDog() {
  const id = window.location.hash.substring(1);
  const response = await fetch(`dogs/id/${id}`);
  let dog;
  if (response.ok) {
    dog = await response.json();
  } else {
    console.log('could not get dogs');
  }
  setValues(dog);
}

function correctDate(date1) {
  const dateArr = date1.split('/');
  const date2 = `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`;
  return date2;
}

function setValues(dog) {
  //el.proPic.value = dog.image;
  el.name.value = dog.name;
  el.breed.value = dog.breed;
  el.description.value = dog.description;
  el.email.value = dog.email;
  el.sex.vale = dog.sex;
  el.dob.value = correctDate(dog.dob);
  el.kennelClub = binaryToString(dog.kennelClub);
  el.pedigree = binaryToString(dog.pedigree);
  el.avaliable = binaryToString(dog.avaliable);
  setFeatures(featuresToArr(dog.features));
}

function setFeatures(features) {
  for (let i = 0; i < features.length; i++) {
    el.features[i].value = features[i];
    if (i !== features.length - 1) {
      addField();
    }
  }
}

function addField() {
  const newField = document.createElement('input');
  newField.setAttribute('class', 'features');
  const addBreak = document.createElement('br');
  el.featuresDiv.append(newField, addBreak);
}

function featuresToArr(string) {
  return string.split('|');
}

function binaryToString(bin) {
  let retVal;
  if (bin === 0) {
    retVal = 'no';
  } else if (bin === 1) {
    retVal = 'yes';
  } else {
    console.log('value not 1 or 0');
  }
  return retVal;
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
  const id = window.location.hash.substring(1);
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

  postToServer(id, newDog);
}

async function postToServer(id, dog) {
  const response = await fetch(`dogs/id/${id}`, {
    method: 'PUT',
    body: dog,
  });

  if (response.ok) {
    console.log('dog has been updated successfully');
  } else {
    console.log('error updating');
  }
}

function addEventListeners() {
  el.editBtn.addEventListener('click', createDogobject);
  el.featuresBtn.addEventListener('click', addField);
}

function loadedEdit() {
  setElements();
  getDog();
  addEventListeners();
}

window.addEventListener('load', loadedEdit);
