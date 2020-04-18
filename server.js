'use strict';
const express = require('express');
const app = express();
const multer = require('multer');
const db = require('./database.js');
app.use(express.static('client'));

const uploader = multer({
  dest: 'upload',
  limites: {
    fields: 10,
    fileSize: 1024 * 1024 * 20,
    files: 1,
  },
});

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
  const input = await db.insertDog(req.body, req.file);
  res.json(input);
}

async function updateDog(req, res) {
  const dog = await db.updateDogDB(req.body, req.file);
  res.json(dog);
}

async function getMsgs(req, res) {
  const results = await db.queryMsgs(req.params.userID1, req.params. userID2);
  res.json(results);
}

async function postMsg(req, res) {
  const input = await db.insertMsg(req.body.sender, req.body.receiver, req.body.msg);
  res.json(input);
}

// function retrieved from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/8/svr.js
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
app.get('/msgs/:userID1/:userID2', asyncWrap(getMsgs));
app.put('/dogs/id/:id', uploader.single('image'), express.json(), asyncWrap(updateDog));
app.post('/dogs', uploader.single('image'), express.json(), asyncWrap(addDog));
app.post('/msgs', express.json(), asyncWrap(postMsg));

app.listen(8080);
