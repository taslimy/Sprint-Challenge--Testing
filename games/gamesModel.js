const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById
};

async function insert(game) {
  return db("games")
    .insert(game, "id")
    .then(ids => {
      return db("games")
        .where({ id: ids[0] })
        .first();
    });
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db("games");
}

function findById(id) {
  return null;
}
