let breeds = ["breed", "pug", "labrador", "corgi", "unknown"];
let sex = ["sex", "male", "female"];
let size = ["size", "small", "medium", "large", "extra large", "chonky"];

let breedFilter = "any";
let sexFilter = "any";
let sizeFilter = "any";

let profileName = "";
let profileImage = "";
let profileBreed = "";
let profileSex = "";
let profileFeatures = [];
let profileDescription = "";
let profileKennelClub = false;
let profilePedegree = false;

let dogs = [];

async function getDogs() {
  const response = await fetch('dogs');
  if (response.ok) {
    dogs = await response.json();
  } else {
    console.log("error");
  }
  console.log(dogs);
}

function filter(arr, type) {
  const dropBox = document.createElement("select");
  for (const item of arr) {
    view = document.createElement("option");
    view.setAttribute("value", item);
    view.textContent = item;
    dropBox.appendChild(view);
  }
  dropBox.setAttribute("class", "dropBox");
  dropBox.setAttribute("id", type);
  document.querySelector("#firstView").appendChild(dropBox);
}

function addSearchButton() {
  const but = document.createElement("button");
  but.textContent = "Filter";
  but.addEventListener("click", setFilters);
  document.querySelector("#firstView").appendChild(but);
}

function setFilters() {

  breedFilter = document.querySelector("#breedFilter").value;
  sexFilter = document.querySelector("#sexFilter").value;
  sizeFilter = document.querySelector("#sizeFilter").value;
  addDogProfile(dogs)
}

function addDogProfile(dogs) {

  document.querySelector("#secondView").innerHTML = "";
  for (const dog of dogs) {
    if (dog.breed == breedFilter || breedFilter == "breed") {
      if (dog.sex == sexFilter || sexFilter == "sex") {
        if (dog.size == sizeFilter || sizeFilter == "size") {
          let newDiv = document.createElement("div"); //creates div
          let secondDiv = document.createElement("div");

          //adds image to the d iv
          const newImg = document.createElement("IMG");
          newImg.setAttribute("src", dog.image);
          newImg.setAttribute("width", "100em");
          newImg.setAttribute("height", "140em");
          newImg.setAttribute("class", "dogImage");
          newDiv.appendChild(newImg);

          //add dog name to the div
          const dogName = document.createElement("p");
          dogName.textContent = "Name: " + dog.name;
          secondDiv.appendChild(dogName);

          //add dog breed to div
          const dogBreed = document.createElement("p");
          dogBreed.textContent = "Breed: " + dog.breed;
          secondDiv.appendChild(dogBreed);

          //add dog sex to div
          const dogSex = document.createElement("p");
          dogSex.textContent = "sex: " + dog.sex;
          secondDiv.appendChild(dogSex);

          const avaliable = document.createElement("p");
          avaliable.textContent = "avaliable: " + dog.avaliable;
          secondDiv.appendChild(avaliable);

          //add view profile button
          const butPro = document.createElement("button");
          butPro.textContent = "view profile";
          butPro.addEventListener("click", function() {
            sessionStorage.setItem("dogId", dog.id);
            window.location.href = "profile.html";
          });
          secondDiv.appendChild(butPro);

          //add contact
          const email = document.createElement("a");
          email.textContent = "email";
          email.setAttribute("href", "mailto:" + dog.email);
          secondDiv.appendChild(email);

          //add message button
          const messageBtn = document.createElement("button");
          messageBtn.textContent = "message";
          messageBtn.addEventListener("click", function() {
            sessionStorage.setItem("senderID", "1");
            sessionStorage.setItem("otherUserId", dog.owner);
            window.location.href = "messages.html";
          });
          secondDiv.appendChild(messageBtn);

          //Adds div to the main body
          secondDiv.setAttribute("class", "secondDiv")
          newDiv.appendChild(secondDiv);
          newDiv.setAttribute("class", "profileView")
          document.querySelector("#secondView").appendChild(newDiv);
        }
      }
    }
  }
}

function addDivs() {
  const main = document.querySelector("#mainView");
  const fview = document.createElement("div");
  const sview = document.createElement("div");

  fview.setAttribute("id", "firstView");
  sview.setAttribute("id", "secondView");
  main.appendChild(fview);
  main.appendChild(sview);
}

function loadedSearch() {
  getDogs();
  addDivs();
  filter(breeds, "breedFilter");
  filter(sex, "sexFilter");
  filter(size, "sizeFilter");
  addSearchButton();
}

window.addEventListener("load", loadedSearch);
