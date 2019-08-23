const router = require("express").Router();

const users = require("./users-model.js");

router.get("/", (req, res) => {
  users
    .find()
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

module.exports = router;
