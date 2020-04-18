'use strict';
const sqlite = require('sqlite');
const uuid = require('uuid-random');
const fs = require('fs');
const util = require('util');
const path = require('path');

fs.renameAsync = fs.renameAsync || util.promisify(fs.rename);

// function retrieved from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/8/messageboard.js
async function initDb() {
  const db = await sqlite.open('sqlite/dogDB.db', { verbose: true });
  return db;
}

const dbConn = initDb();

async function queryAllDogs() {
  const db = await dbConn;
  return db.all('select * from dogs');
}

async function queryDogSex(sex) {
  const db = await dbConn;
  return db.all(`select * from dogs where sex = "${sex}"`);
}

async function queryDogOwner(owner) {
  const db = await dbConn;
  return db.all(`select * from dogs where owner = ${owner} `);
}

async function queryDogId(id) {
  const db = await dbConn;
  return db.get(`select * from dogs where id = "${id}"`);
}
async function insertDog(dog, file) {
  let newFilename;
  if (file) {
    const fileExt = file.mimetype.split('/')[1] || 'png';
    newFilename = file.filename + '.' + fileExt;
    await fs.renameAsync(file.path, path.join('client', 'images', newFilename));
  }
  const imgFilename = 'images/' + newFilename;

  const db = await dbConn;
  const id = uuid();
  await db.run('insert into dogs values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, imgFilename, dog.name, dog.breed, dog.sex, dog.size, dog.description, dog.features, dog.kennelClub, dog.pedigree, dog.owner, dog.avaliable, dog.email, dog.dob]);
  return queryAllDogs();
}

async function updateDogDB(dog, file) {
  let newFilename;
  if (file) {
    const fileExt = file.mimetype.split('/')[1] || 'png';
    newFilename = file.filename + '.' + fileExt;
    await fs.renameAsync(file.path, path.join('client', 'images', newFilename));
  }
  const imgFilename = 'images/' + newFilename;

  const db = await dbConn;
  const update = await db.run('update dogs set image = ?, name = ?, breed = ?, sex = ?, size = ?, description = ?, features = ?, kennelClub = ?, pedigree = ?, avaliable = ?, dob = ? where id = ?', [imgFilename, dog.name, dog.breed, dog.sex, dog.size, dog.description, dog.features, dog.kennelClub, dog.pedigree, dog.avaliable, dog.dob, dog.id]);
  if (update.changes === 0) throw new Error('dog not found :(');
  return queryDogId(dog.id);
}

module.exports = {
  queryAllDogs,
  queryDogSex,
  queryDogOwner,
  insertDog,
  queryDogId,
  updateDogDB,
};
