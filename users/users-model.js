const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findById
};

function find() {
  return db("users").select("id", "username");
}

function add() {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
