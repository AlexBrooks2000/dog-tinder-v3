'use strict';
const express = require('express');
const app = express();
const db = require('./database.js');
app.use(express.static('client'));

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
app.put('/dogs/id/:id', express.json(), asyncWrap(updateDog));
app.post('/dogs', express.json(), asyncWrap(addDog));

app.listen(8080);
