const Path = require('path');

const controllerPath = Path.join(__dirname, Path.normalize('../controllers/users'))

const UserController = require(controllerPath);

const express = require('express');
const router = express.Router();

/**
 * @typedef Register
 * @property {string} username
 * @property {string} email
 * @property {string} password
 **/

/**
 * This function comment is parsed by doctrine
 * @route POST /register
 * @group register - create a new user
 * @param {Register.model} user.body.required - the new user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @produces routerlication/json routerlication/json
 * @consumes routerlication/json routerlication/json
 **/

router.post("/register", async (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  if (username != undefined && email != undefined && password != undefined) {
    UserController.register(username, email, password).then((value) => {
      res.json({ message: value });
    }).catch((e) => {
      console.log("\x1b[31m[ERROR]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - "+e);
      res.json({ error: e });
    })
  } else {
    res.json({ message: "wrong parameters"});
  }
});

/**
 * @typedef Login
 * @property {string} username
 * @property {string} password
 **/

 /**
  * This function comment is parsed by doctrine
  * @route POST /login
  * @group login - confirm the inscription
  * @param {Login.model} user.body.required - the new user
  * @param {string} v.query.optional - validation code emailed
  * @param {string} r.query.optional - referential code
  * @returns {object} 200 - {}
  * @returns {Error}  default - {}
  */

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const v = req.query.v;
  const r = req.query.r;
  if (username != undefined && password != undefined) {
    res.json({ message: await UserController.logIn(username, password, v)});
  } else {
    res.json({ message: 0});
  }
});

module.exports = router;
