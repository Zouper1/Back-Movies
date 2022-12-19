const express = require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname;

//TODO movies.js [movies, js]
const removeExtension = (fileName) => {
  return fileName.split(".").shift();
}

fs.readdirSync(PATH_ROUTES).filter((file) => {

  const name = removeExtension(file); //TODO users, storage, movies

  if (name !== "index") {
    router.use(`/${name}`, require(`./${file}`)); //TODO http://localhost:4000/api/users <==== el ultimo valor es dinamico y se obtiene del nombre del archivo
  }
})

module.exports = router;
