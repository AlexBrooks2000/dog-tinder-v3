class Dog {
  constructor(image, name, breed, sex, size, description, features, kennelClub, pedigree, email, owner) {
    this.image = image;
    this.name = name;
    this.breed = breed;
    this.sex = sex;
    this.size = size;
    this.description = description;
    this.features = features;
    this.kennelClub = kennelClub;
    this.pedigree = pedigree;
    this.email = email;
    this.owner = owner;
  }
}

function addField(div, className) {
  const newField = document.createElement('input');
  newField.setAttribute('class', className);
  const addBreak = document.createElement('br');
  div.append(newField, addBreak);
}

function addDiv(label, divName, className, title) {
  const inputLabel = document.createElement('label');
  inputLabel.textContent = label;
  const div = document.createElement('div');
  div.id = divName;
  const btn = document.createElement('button');
  btn.textContent = 'add' + title;
  btn.addEventListener('click', function () {
    addField(div, className);
  });
  addField(div, className);
  const addBreak = document.createElement('br');
  document.querySelector('#mainView').append(inputLabel, div, btn, addBreak);
}

function addDog() {
  function addInput(inputName, inputID, isTF = false) {
    const inputLabel = document.createElement('label');
    inputLabel.textContent = inputName;
    document.querySelector('#mainView').appendChild(inputLabel);


    if (isTF === false) {
      const newInput = document.createElement('input');
      newInput.setAttribute('type', 'text');
      newInput.setAttribute('id', inputID);
      document.querySelector('#mainView').appendChild(newInput);
    } else if (isTF === true) {
      const newInput = document.createElement('select');
      newInput.setAttribute('id', inputID);

      const yesInput = document.createElement('option');
      yesInput.setAttribute('value', true);
      yesInput.textContent = 'yes';

      const noInput = document.createElement('option');
      noInput.setAttribute('value', false);
      noInput.textContent = 'no';

      newInput.appendChild(yesInput);
      newInput.appendChild(noInput);
      document.querySelector('#mainView').appendChild(newInput);
    }

    const addBreak = document.createElement('br');
    document.querySelector('#mainView').appendChild(addBreak);
  }

  addInput('Profile Picture:', 'dogProfile');
  addInput('dog name:', 'dogName');
  addInput('dog Breed:', 'dogBreed');

  const breedLabel = document.createElement('label');
  breedLabel.textContent = 'Dog sex:';
  document.querySelector('#mainView').appendChild(breedLabel);
  const inputDogBreed = document.createElement('select');
  inputDogBreed.setAttribute('id', 'dogSex');

  const maleInput = document.createElement('option');
  maleInput.setAttribute('value', 'male');
  maleInput.textContent = 'male';

  const femaleInput = document.createElement('option');
  femaleInput.setAttribute('value', 'female');
  femaleInput.textContent = 'female';

  inputDogBreed.appendChild(maleInput);
  inputDogBreed.appendChild(femaleInput);
  document.querySelector('#mainView').appendChild(inputDogBreed);
  const addbreak = document.createElement('br');
  document.querySelector('#mainView').appendChild(addbreak);


  addInput('dog Size:', 'dogSize');
  addDiv('Features:', 'features', 'features', 'features');
  addInput('Description:', 'description');
  addInput('Is your dog registered to the kennel club?', 'dogKennel', true);
  addInput('Is your dog a pedigree?', 'dogPedigree', true);
  addInput('Is your dog avaliable for breeding?', 'avaliable', true);
  addInput('contact email', 'email');
}

function addButton() {
  const btn = document.createElement('button');
  btn.textContent = 'add Dog';
  btn.setAttribute('id', 'addDog');
  btn.addEventListener('click', createDogobject);
  document.querySelector('#mainView').appendChild(btn);
}

function createDogobject() {
  const features = [];
  const getFeatures = document.getElementsByClassName('features');
  for (const feature of getFeatures) {
    features.push(feature.value);
  }

  const profile = document.querySelector('#dogProfile').value;
  const name = document.querySelector('#dogName').value;
  const breed = document.querySelector('#dogBreed').value;
  const sex = document.querySelector('#dogSex').value;
  const size = document.querySelector('#dogSize').value;
  const kennelClub = document.querySelector('#dogKennel').value;
  const pedigree = document.querySelector('#dogPedigree').value;
  const description = document.querySelector('#description').value;
  const owner = 1;
  const email = document.querySelector('#email').value;

  const newDog = new Dog(profile, name, breed, sex, size, description, features, kennelClub, pedigree, email, owner);

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

function loadAddDogs() {
  addDog();
  addButton();
}

window.addEventListener('load', loadAddDogs);
