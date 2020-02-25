const express = require('express');
const app = express();
app.use(express.static('client'));

let dogs = [{image: "images/pug.jpg", name: "mike", breed: "pug", sex: "male", size:"small", kennelClub: true, pedigree: true, owner: "not me", email: "mmclagain0@fema.gov"},
{image: "images/lab.jpg", name: "Susan", breed: "labrador", sex: "female", size: "large", kennelClub:true, pedigree: true, owner: "not me", email: "rlorkings1@reddit.com"},
{image: "images/corgi.jpg", name: "ralph", breed: "corgi", sex: "male", size: "medium", kennelClub: true, pedigree: true, owner: "me", email: "cmccrisken2@whitehouse.gov"},
{image: "images/yoda.jpg", name: "Baby Yoda", breed: "unknown", sex: "unknown", size: "small", kennelClub: true, pedigree: true, owner: "not me", email: "rwinslett3@shop-pro.jp"},
{image: "images/chickpea.jpg", name: "Chickpea", breed: "corgi", sex: "female", size: "medium", kennelClub: true, pedigree: true, owner: "me", email: "haskham4@lycos.com"}];

app.get('/dogs', (req, res) => {
  res.json(dogs);
});

app.post('/dogs', express.json(), (req, res) => {
  const newDog = {
    image: req.body.image,
    name: req.body.name,
    breed: req.body.breed,
    sex: req.body.sex,
    size: req.body.size,
    kennelClub: req.body.kennelClub,
    pedigree: req.body.pedigree,
    email: req.body.email,
  };
  dogs.push(newDog)
  res.json(dogs);
  console.log(dogs);
})

app.listen(8080);
