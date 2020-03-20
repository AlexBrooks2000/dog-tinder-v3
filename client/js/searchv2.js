const el = {};

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
    response = await fetch(`dogs/${sex}`)
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

function addDogProfile(dogs) {
  clearView();
  for (const dog of dogs) {
    const newDiv = document.createElement('div');
    const secondDiv = document.createElement('div');

    const newImg = document.createElement("IMG");
    newImg.setAttribute('src', dog.image);
    newImg.setAttribute('width', '100em');
    newImg.setAttribute('height', '140em');
    newImg.setAttribute('class', 'dogImage');
    newDiv.appendChild(newImg);

    addDogFeature(dog.name, "name", secondDiv);
    addDogFeature(dog.breed, "breed", secondDiv);
    addDogFeature(dog.sex, "sex", secondDiv);
    addDogFeature(dog.avaliable, "avaliable for breeding", secondDiv);

    const butPro = document.createElement('button');
    butPro.textContent = 'view profile';
    butPro.addEventListener('click', function () {
      console.log(dog.id);
      sessionStorage.setItem('dogId', dog.id);
      window.location.href = 'profile.html';
    });
    secondDiv.appendChild(butPro);

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
  el.filterBtn.addEventListener("click", getDogs);
}

function loadedSearch() {
  setElements();
  addEventListeners();
}

window.addEventListener("load", loadedSearch);
