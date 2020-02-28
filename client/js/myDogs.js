let dogs = [];

async function getDogs() {
  const response = await fetch('dogs');
  if (response.ok) {
    dogs = await response.json();
  } else {
    console.log("error");
  }
}

function listDogs(dogs) {
  console.log("Look I am working");
  for (const dog of dogs) {
    if (dog.owner === "me") {
      const mainDiv = document.createElement("div");
      const sideDiv = document.createElement("div");

      const newImg = document.createElement("img");
      newImg.setAttribute("src", dog.image);
      newImg.setAttribute("width", "100em");
      newImg.setAttribute("height", "140em");
      newImg.setAttribute("class", "dogImage");
      mainDiv.appendChild(newImg);

      function createNewElement(value) {
        let el = document.createElement("p");
        el.textContent = value;
        sideDiv.appendChild(el);
      }

      createNewElement(dog.name);
      createNewElement(dog.breed);
      createNewElement(dog.sex);

      sideDiv.setAttribute("class", "secondDiv");
      mainDiv.appendChild(sideDiv);
      mainDiv.setAttribute("class", "profileView");
      document.querySelector("#mainView").appendChild(mainDiv);
    }
  }
}

function addDogButton() {
  const addDog = document.createElement("button");
  addDog.textContent = "Add Dog";
  addDog.addEventListener("click", function() {
    window.location.href = "add_dog.html";
  });
  document.querySelector("#mainView").appendChild(addDog);
}

function loadedDogs() {
  getDogs();
  listDogs(dogs);
  addDogButton();
}

window.addEventListener("load", loadedDogs);
