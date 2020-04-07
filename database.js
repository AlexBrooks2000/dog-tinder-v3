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
async function insertDog(image, name, breed, sex, size, description, features, kennelClub, pedigree, owner, avaliable, email, dob) {
  const db = await dbConn;
  const id = uuid();
  await db.run(`insert into dogs (id, image, name, breed, sex, size, description, features, kennelClub, pedigree, owner, avaliable, email, dob) values ("${id}", "${image}", "${name}", "${breed}", "${sex}", "${size}", "${description}", "${features}", ${kennelClub}, ${pedigree}, ${owner}, ${avaliable}, "${email}", "${dob}")`);
  return queryAllDogs();
}

async function updateDogDB(dog) {
  console.log(dog);
  const db = await dbConn;
  await db.run(`update dogs set image = "${dog.image}", name = "${dog.name}", breed = "${dog.breed}", sex = "${dog.sex}", size = "${dog.size}", description = "${dog.description}", features = "${dog.features}", kennelClub = ${dog.kennelClub}, pedigree = ${dog.pedigree}, avaliable = ${dog.avaliable}, email = "${dog.email}", dob = "${dog.dob}" where id = "${dog.id}"`);
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
