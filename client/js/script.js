//needed on all pages

// let dogs = [{image: "images/pug.jpg", name: "mike", breed: "pug", sex: "male", size:"small", owner: "not me"},
// {image: "images/lab.jpg", name: "Susan", breed: "labrador", sex: "female", size: "large", owner: "not me"},
// {image: "images/corgi.jpg", name: "ralph", breed: "corgi", sex: "male", size: "medium", owner: "me"},
// {image: "images/yoda.jpg", name: "Baby Yoda", breed: "unknown", sex: "unknown", size: "small", owner: "not me"},
// {image: "images/chickpea.jpg", name: "Chickpea", breed: "corgi", sex: "female", size: "medium", owner: "me"}];

let dogs = [];

async function getDogs() {
  const response = await fetch('dogs');
  if (response.ok) {
    dogs = await response.json();
  } else {
    console.log("error");
  }
}

function loggedIn() {
  const isLoggedIn = true;
  const user = "Joe Bloggs"

  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", "signIn");

  if (isLoggedIn === true) {
    let logInMessage = document.createElement("p");
    logInMessage.textContent = "Welcome " + user;
    let signOutButton = document.createElement("button");
    signOutButton.textContent = "log out";
    logInMessage.setAttribute("class", "headerText");
    signOutButton.setAttribute("class", "headerText signInButton");
    newDiv.appendChild(logInMessage);
    newDiv.appendChild(signOutButton);
  } else {
    let signInButton = document.createElement("button");
    signInButton.textContent = "sign in";
    signInButton.setAttribute("class", "signInButton");
    newDiv.appendChild(signInButton);
  }
  document.querySelector("#header").appendChild(newDiv);
}

function navButtons() {
  document.querySelector("#searchButton").addEventListener("click", function(){
    window.location.href = "index.html";
  });
  document.querySelector("#dogButton").addEventListener("click", function() {
    window.location.href = "dog_list.html";
  });
}
// end of needed code

function loaded() {
  getDogs();
  loggedIn();
  navButtons();
}

window.addEventListener("load", loaded);
