'use strict';
const express = require('express');
const app = express();
const db = require('./database.js');
app.use(express.static('client'));

const msgs = [
  { sender: '1', reciever: '2', msg: 'hi there' },
  { sender: '2', reciever: '1', msg: 'you good?' },
  { sender: '3', reciever: '1', msg: 'hi is the dog avaliable for breeding?' },
  { sender: '1', reciever: '3', msg: 'yes it is' },
  { sender: '1', reciever: '4', msg: 'hello there' },
  { sender: '4', reciever: '1', msg: 'general Kanobi' },
];

async function getAllDogs(req, res) {
  res.json(await db.queryAllDogs());
}

async function getDogSex(req, res) {
  const result = await db.queryDogSex(req.params.sex);
  res.json(result);
}

async function getDogOwner(req, res) {
  const result = await db.queryDogOwner(req.params.owner);
  res.json(result);
}

async function getDogId(req, res) {
  const result = await db.queryDogId(req.params.id);
  res.json(result);
}

async function addDog(req, res) {
  const input = await db.insertDog(req.body.image, req.body.name, req.body.breed, req.body.sex, req.body.size, req.body.description, req.body.features, req.body.kennelClub, req.body.pedigree, req.body.owner, req.body.avaliable, req.body.email, req.body.dob);
  res.json(input);
}

async function updateDog(req, res) {
  const dog = await db.updateDogDB(req.body);
  res.json(dog);
}

async function getMsgs(req, res) {
  const gotMsgs = [];
  for (const msg of msgs) {
    if (msg.sender === req.params.userID1 || msg.sender === req.params.userID2) {
      if (msg.reciever === req.params.userID1 || msg.reciever === req.params.userID2) {
        gotMsgs.push(msg);
      }
    }
  }
  res.send(gotMsgs);
}

async function postMsg(req, res) {
  const newMsg = {
    sender: req.body.sender,
    reciever: req.body.reciever,
    msg: req.body.msg,
  };
  msgs.push(newMsg);
  res.json(msgs);
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/dogs', asyncWrap(getAllDogs));
app.get('/dogs/sex/:sex', asyncWrap(getDogSex));
app.get('/dogs/owner/:owner', asyncWrap(getDogOwner));
app.get('/dogs/id/:id', asyncWrap(getDogId));
app.get('/msgs/:userID1/:userID2', getMsgs);
app.put('/dogs/id/:id', express.json(), asyncWrap(updateDog));
app.post('/dogs', express.json(), asyncWrap(addDog));
app.post('/msgs', express.json(), postMsg);

app.listen(8080);
