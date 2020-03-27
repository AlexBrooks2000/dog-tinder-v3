const el = {};

function setElements() {
  el.proPic = document.querySelector('#dogImg');
  el.name = document.querySelector('#name');
  el.age = document.querySelector('#age');
  el.breed = document.querySelector('#breed');
  el.sex = document.querySelector('#sex');
  el.email = document.querySelector('#email');
  el.about = document.querySelector('#about');
  el.description = document.querySelector('#description');
  el.features = document.querySelector('#features');
  el.kennelClub = document.querySelector('#kennelClub');
  el.pedigree = document.querySelector('#pedigree');
}

async function getDog() {
  const id = window.location.hash.substring(1);
  const response = await fetch(`dogs/id/${id}`);
  let dog;
  if (response.ok) {
    dog = await response.json();
  } else {
    console.log('could not get dogs');
  }
  addTitle(dog.image, dog.name, dog.dob, dog.breed, dog.sex, dog.email);
  addDescription(dog.name, dog.description);
  addFeatures(dog.features);
  addImage(dog.kennelClub, el.kennelClub, 'images/kennelClub.png');
  addImage(dog.pedigree, el.pedigree, 'images/pedigree.png');
}

function findAge(dob) {
  const diff_ms = Date.now() - dob.getTime();
  const age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function addTitle(image, name, dob, breed, sex, email) {
  const age = findAge(new Date(dob));
  el.proPic.setAttribute('src', image);
  el.name.textContent = name;
  el.age.textContent = age;
  el.breed.textContent = breed;
  el.sex.textContent = sex;
  el.email.setAttribute('href', `mailto:${email}`);
}

function addDescription(name, description) {
  el.about.textContent = `About ${name}`;
  el.description.textContent = description;
}

function sqliteToArr(str) {
  const arr = str.split('|');
  return arr;
}

function addFeatures(dogFeatures) {
  const features = sqliteToArr(dogFeatures);
  for (const feature of features) {
    const list = document.createElement('li');
    list.textContent = feature;
    el.features.appendChild(list);
  }
}

function addImage(int, e, img) {
  if (int === 1) {
    e.setAttribute('src', img);
  } else if (int === 0) {
    e.setAttribute('src', 'images/RedCross.png');
  } else {
    console.log('error, int is not 0 or 1');
  }
}

function loadedProfile() {
  setElements();
  getDog();
}

window.addEventListener('load', loadedProfile);
