const express = require('express');
const app = express();
app.use(express.static('client'));

// let dogs = [];
//
// async function getData() {
//   const response = await fetch('dogs.json');
//   const data = await response.json();
//
//   dogs = data.dogs;
// }
//
// getData();
//console.log(dogs);

app.listen(8080);
