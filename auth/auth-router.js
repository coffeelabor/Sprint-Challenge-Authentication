const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwtoken = require("jsonwebtoken");

const users = require("../users/users-model.js");
const secrets = require("../config/secrets.js");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  users
    .add(user)
    .then(hashed => {
      res.status(201).json(hashed);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  users
    .findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getWebToken(user);

        res.status(200).json({
          message: `O hey there ${user.username}`,
          token
        });
      } else {
        res.status(401).json({ message: "Those creds dont work!" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

function getWebToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  return jwtoken.sign(payload, secrets.jsonWebTokenSecret, options);
}

module.exports = router;
