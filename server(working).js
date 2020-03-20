const express = require('express');
const uuid = require('uuid-random');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.static('client'));

let dogs = [{id: 'wby6env6ekb4', image: 'images/pug.jpg', name: 'mike', breed: 'pug', sex: 'male', size:'small', description: 'this is a description', features: ['these', 'are', 'some', 'features'], kennelClub: true, pedigree: true, owner: 2, avaliable: true, email: 'mmclagain0@fema.gov'},
{id: 'bh6rv20bgr6s', image: 'images/lab.jpg', name: 'Susan', breed: 'labrador', sex: 'female', size: 'large', description: 'this is a description', features: ['these', 'are', 'some', 'features'], kennelClub:true, pedigree: true, owner: 3, avaliable: false, email: 'rlorkings1@reddit.com'},
{id: '6hb2nduyt5csi2', image: 'images/corgi.jpg', name: 'ralph', breed: 'corgi', sex: 'male', size: 'medium', description: 'this is a description', features: ['these', 'are', 'some', 'features'], kennelClub: true, pedigree: true, owner: 1, avaliable: true, email: 'this is a description'},
{id: 'ngw76vke2b6jg', image: 'images/yoda.jpg', name: 'Baby Yoda', breed: 'unknown', sex: 'unknown', size: 'small', description: 'this is a description', features: ['these', 'are', 'some', 'features'], kennelClub: true, pedigree: true, owner: 4, avaliable: false, email: 'rwinslett3@shop-pro.jp'},
{id: 'nf5wmfk64las', image: 'images/chickpea.jpg', name: 'Chickpea', breed: 'corgi', sex: 'female', size: 'medium', description: 'this is a description', features: ['these', 'are', 'some', 'features'], kennelClub: true, pedigree: true, owner: 1, avaliable: true, email: 'haskham4@lycos.com'}];

let messages =
[{userIDs: [1, 2], senderID: 1, msg: 'this is messaging'},
{userIDs: [2, 1], senderID: 2, msg: 'hello how are you?'},
{userIDs: [1, 2], senderID: 1, msg: 'good thanks yourself'},
{userIDs: [2, 1], senderID: 2, msg: 'is the dog still avaliable?'},
{userIDs: [2, 1], senderID: 2, msg: 'I wanna bread!!!'},
{userIDs: [1, 3], senderID: 1, msg: 'this should not be displayed with others'},
{userIDs: [3, 1], senderID: 3, msg: 'wow thats great'}];

function getDog(id) {
  console.log("hello there");
  for (const dog of dogs) {
    if (dog.id === id) {
      console.log(dog);
      return dog;
    }
  }
  return null;
}

function getOwnedDogs(owner) {
  let ownedDogs = [];
  for (const dog of dogs) {
      if (dog.owner === owner) {
        ownedDogs.push(dog);
      }
  }
  console.log(ownedDogs);
  return ownedDogs;
}

function getMessages(arr) {
  let gotMessages = [];
  for (const message of messages) {
    if (message.userIDs.includes(arr[0]) && message.userIDs.includes(arr[1])) {
      gotMessages.push(message);
    }
  }
  return gotMessages;
}

function getTestMessages(id) {
  let gotMessages = [];
  for (const message of messages) {
    if (message.senderID === id) {
      gotMessages.push(message);
    }
  }
  return gotMessages;
}

function getDogSex(sex) {
  let gotDogs = [];
  for (const dog of dogs) {
    if (dog.sex === sex) {
      gotDogs.push(dog);
    }
  }
  return gotDogs;
}

app.get('/dogs', (req, res) => {
  console.log("this has been called");
  res.json(dogs);
});

app.get('/dogs/:sex', (req, res) => {
  const gotDogs = getDogSex(req.params.sex);
  res.json(gotDogs);
});

app.get('/messages/:userIDs', (req, res) => {
  const gotMessages = getMessages(req.params.userIDs);
  res.json(messages);
});

app.get('/dogs/:id', (req, res) => {
  console.log(req.params.id);
  const dog = getDog(req.params.id);
  res.json(dog);
});

app.get('/dogs/:owner', (req, res) => {
  const ownedDogs = getOwnedDogs(req.params.owner);
  res.json(ownedDogs);
});

app.get('/messages/:senderID', (req, res) => {
  const gotMessages = getTestMessages(req.params.senderID);
  res.json(gotMessages);
});

app.post('/dogs', express.json(), (req, res) => {
  const newDog = {
    id: uuid(),
    image: req.body.image,
    name: req.body.name,
    breed: req.body.breed,
    sex: req.body.sex,
    size: req.body.size,
    description: req.body.description,
    features: req.body.features,
    kennelClub: req.body.kennelClub,
    pedigree: req.body.pedigree,
    avaliable: req.body.avaliable,
    email: req.body.email,
  };
  dogs.push(newDog);
  res.json(dogs);
});

app.post('/messages', express.json(), (req, res) => {
  const newMessage = {
    userIDs: req.body.userIDs,
    senderID: req.body.senderID,
    msg: req.body.msg,
  }
  messages.push(newMessage)
  res.json(messages);
})

app.listen(8080);
