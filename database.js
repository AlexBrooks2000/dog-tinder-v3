'use strict';
const sqlite = require('sqlite');
const uuid = require('uuid-random');

async function initDb() {
  const db = await sqlite.open('sqlite/dogDB.db', { verbose: true});
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
async function insertDog(image, name, breed, sex, size, description, features, kennelClub, pedigree, owner, avaliable, email) {
  const db = await dbConn;
  const id = uuid();
  await db.run(`insert into dogs (id, image, name, breed, sex, size, description, features, kennelClub, pedigree, owner, avaliable, email) values ("${id}", "${image}", "${name}", "${breed}", "${sex}", "${size}", "${description}", "${features}", ${kennelClub}, ${pedigree}, ${owner}, ${avaliable}, "${email}")`);
  return queryAllDogs();
}

module.exports = {
  queryAllDogs,
  queryDogSex,
  queryDogOwner,
  insertDog,
  queryDogId,
};
