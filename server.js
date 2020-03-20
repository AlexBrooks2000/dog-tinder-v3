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
}

async function addDog(req, res) {
  const input = await db.insertDog(req.body.image, req.body.name, req.body.breed, req.body.sex, req.body.size, req.body.description, req.body.features, req.body.kennelClub, req.body.pedigree, req.body.owner, req.body.avaliable, req.body.email);
  res.json(input);
}


function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/dogs', asyncWrap(getAllDogs));
app.get('/dogs/:sex', asyncWrap(getDogSex));
app.get('/dogs/:owner', asyncWrap(getDogOwner));
app.post('/dogs', express.json(), asyncWrap(addDog));

app.listen(8080);
