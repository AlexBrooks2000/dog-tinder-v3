async function setProfileDog(){
  const id = sessionStorage.getItem("dogId");
  const response = await fetch(`dogs/${id}`);
  let profileDog = [];
  if (response.ok) {
    profileDog = await response.json();
  } else {
    console.log("couldn't fetch from server");
  }
  createProfileTop(profileDog);
  addDescription(profileDog);
  addFeatures(profileDog);
  addKennelClub(profileDog);
  addPedigree(profileDog);
};

function createProfileTop(profileDog) {
  console.log("this is running");
  let newDiv = document.createElement("div");
  let secondDiv = document.createElement("div");
  let newImg = document.createElement("IMG");

  newImg.setAttribute("src", profileDog.image);
  newImg.setAttribute("class", "profilePic");
  newDiv.appendChild(newImg);

  let name = document.createElement("h2");
  name.textContent = profileDog.name;
  name.setAttribute("class", "dogName");
  secondDiv.appendChild(name);

  let breed = document.createElement("p");
  breed.textContent = profileDog.breed;
  breed.setAttribute("class", "dogBreed");
  secondDiv.appendChild(breed);

  let sex = document.createElement("p");
  sex.textContent = profileDog.sex;
  sex.setAttribute("class", "dogSex");
  secondDiv.appendChild(sex);

  const email = document.createElement("a");
  email.textContent = "email";
  email.setAttribute("href", "mailto:" + profileDog.email);
  secondDiv.appendChild(email);
  // let newButton = document.createElement("button");
  // newButton.textContent = "Chat Now!";
  // newButton.setAttribute("id", "chatButton")
  // secondDiv.appendChild(newButton);

  newDiv.setAttribute("class", "displayViews");
  secondDiv.setAttribute("class", "nameDiv");
  newDiv.appendChild(secondDiv);
  document.querySelector("#mainView").appendChild(newDiv);
}

function addFeatures(profileDog) {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("class", "middleDivs");
  let featuresTitle = document.createElement("h3");
  featuresTitle.textContent = "Features";
  featuresTitle.setAttribute("class", "titles");
  newDiv.appendChild(featuresTitle);
  let newNav = document.createElement("nav");
  for (const feature of profileDog.features) {
    let newFeature = document.createElement("li");
    newFeature.textContent = feature;
    newNav.appendChild(newFeature);
  }
  newDiv.appendChild(newNav);

  document.querySelector("#mainView").appendChild(newDiv);
}

function addDescription(profileDog) {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("class", "middleDivs");
  let aboutDog = document.createElement("h3");
  aboutDog.textContent = "About " + profileDog.name;
  aboutDog.setAttribute("class", "titles");
  newDiv.appendChild(aboutDog);
  let newDes = document.createElement("p");
  newDes.textContent = profileDog.description;
  newDiv.appendChild(newDes);
  document.querySelector("#mainView").appendChild(newDiv);
}

function addKennelClub(profileDog) {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("class", "middleDivs");
  let title = document.createElement("h3");
  title.textContent = "Kennel Club";
  title.setAttribute("class", "titles");
  newDiv.appendChild(title);

  let kennelImg = document.createElement("IMG");
  kennelImg.setAttribute("id", "kennelClub");
  if (profileDog.kennelClub === true) {
    kennelImg.setAttribute("src", "images/kennelClub.png");
  } else {
    kennelImg.setAttribute("src", "images/RedCross.png");
  }
  newDiv.appendChild(kennelImg);
  document.querySelector('#mainView').appendChild(newDiv);
}

function addPedigree(profileDog) {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("class", "middleDivs");
  let title = document.createElement("h3");
  title.textContent = "Pedigree";
  title.setAttribute("class", "titles");
  newDiv.appendChild(title);

  let pedigreeImg = document.createElement("IMG");
  pedigreeImg.setAttribute("id", "pedigree");
  if (profileDog.pedigree === true) {
    pedigreeImg.setAttribute("src", "images/pedigree.png");
  } else {
    pedigreeImg.setAttribute("src", "images/RedCross.png");
  }
  newDiv.appendChild(pedigreeImg);
  document.querySelector("#mainView").appendChild(newDiv);
}

function loadedProfile() {
  setProfileDog();
}

window.addEventListener("load", loadedProfile)
