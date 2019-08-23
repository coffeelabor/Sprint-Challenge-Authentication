const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function add() {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
