const express = require('express');
const uuid = require("uuid-random");
const app = express();
app.use(express.static('client'));

let dogs = [{id: "wby6env6ekb4", image: "images/pug.jpg", name: "mike", breed: "pug", sex: "male", size:"small", description: "this is a description", features: ["these", "are", "some", "features"], kennelClub: true, pedigree: true, owner: "not me", avaliable: true, email: "mmclagain0@fema.gov"},
{id: "bh6rv20bgr6s", image: "images/lab.jpg", name: "Susan", breed: "labrador", sex: "female", size: "large", description: "this is a description", features: ["these", "are", "some", "features"], kennelClub:true, pedigree: true, owner: "not me", avaliable: false, email: "rlorkings1@reddit.com"},
{id: "6hb2nduyt5csi2", image: "images/corgi.jpg", name: "ralph", breed: "corgi", sex: "male", size: "medium", description: "this is a description", features: ["these", "are", "some", "features"], kennelClub: true, pedigree: true, owner: "me", avaliable: true, email: "cmccrisken2@whitehouse.gov"},
{id: "ngw76vke2b6jg", image: "images/yoda.jpg", name: "Baby Yoda", breed: "unknown", sex: "unknown", size: "small", description: "this is a description", features: ["these", "are", "some", "features"], kennelClub: true, pedigree: true, owner: "not me", avaliable: false, email: "rwinslett3@shop-pro.jp"},
{id: "nf5wmfk64las", image: "images/chickpea.jpg", name: "Chickpea", breed: "corgi", sex: "female", size: "medium", description: "this is a description", features: ["these", "are", "some", "features"], kennelClub: true, pedigree: true, owner: "me", avaliable: true, email: "haskham4@lycos.com"}];

function getDog(id) {
  for (const dog of dogs) {
    if (dog.id === id) {
      return dog;
    }
  }
  return null;
}

app.get('/dogs', (req, res) => {
  res.json(dogs);
});

app.get('/dogs/:id', (req, res) => {
  const dog = getDog(req.params.id);
  res.json(dog);
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
  dogs.push(newDog)
  res.json(dogs);
});

app.listen(8081);
