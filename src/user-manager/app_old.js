/*******************************************************************************
**  API DEMO
*******************************************************************************/

////////////////////////////////DEPENDENCIES////////////////////////////////////

const Express = require('express');
const BodyParser = require('body-parser');
const Nodemailer = require('nodemailer');
const Bcrypt = require('bcrypt')
const Jwt  =  require('jsonwebtoken');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

////////////////////////////////CONFIG//////////////////////////////////////////

const SECRET_KEY = "S3456G34D5354892D3D4H2O982D3423O";
const PORT = 3000;
const SWAGGER_PORT = 3001;
const CONNECTION_STRING = 'postgres://postgres:test123@37.187.180.133:5432/postgres';
const EMAIL_ADDRESS = "dev.team213@gmail.com";
const EMAIL_PASSWORD = "test1234&";
const EMAIL_SERVICE = "gmail";
const STRIPE_KEY = "sk_test_51H3P9wLuVDLUm2MBfLyWzbGoVN9NE6DGIGpn9hWLudGveYQaJRlI0ru6WFyTJaVIXpQtS0h59l3QG6VScLMO2fJI00KitVpcP4";

////////////////////////////////DB MODEL////////////////////////////////////////

const db = new Sequelize(CONNECTION_STRING);
db.options.logging = false;

const testDB = new Promise(async (resolve, reject) => {
  // console.log("trying to connect to the DB ...");
  try {
    await db.authenticate();
    // console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.log("\x1b[31m[ERROR]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - "+"Unable to connect to the database: "+error.message);
    process.kill(process.pid);
  } finally {
    resolve(true);
  }
});

testDB.then((value) => {});

var User = db.define('users', {
  id: { type: Sequelize.STRING, primaryKey: true },
  username: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  inscription_confirmed: { type: Sequelize.BOOLEAN },
  password: { type: Sequelize.STRING },
  role: { type: Sequelize.INTEGER },
  stripe_id: { type: Sequelize.STRING },
  last_connection: {type: Sequelize.DATE}
}, {
  underscored: true,
  paranoid: true,
  freezeTableName: true, // Model tableName will be the same as the model name
  tableName: 'users'
});

User.sync({force: false}).then(function () {
    // console.log("OK !\n");
});

//////////////////////////////EMAIL FUNCTIONS//////////////////:////////////////

function sendMailRegister(user, email, inscription_code) {
  var transporter = Nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD
    }
  });
  var content = "Hello "+user
      +", <br><br> To validate your inscription click on the link below,"
      +" this link will expire in 1 hour <br><br>"
      +"http://localhost:"+PORT+"/login/"+inscription_code
      +" <br><br>Regards,<br>the Team"
  var mailOptions = {
    from: EMAIL_ADDRESS,
    to: email,
    subject: "Active your account",
    text: content,
    html: content,
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('\x1b[38;5;224m[INFO]\x1b[0m '+new Date().toISOString().slice(0, 16).replace('T',' ')+' - email sent: ' + info.response);
  });
}

function sendMailPassword(user, email, inscription_code) {
  var transporter = Nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD
    }
  });
  var content = "Hello "+user
      +", <br><br> To change your password click on the link below,"
      +" this link will expire in 1 hour <br><br>"
      +"http://localhost:"+PORT+"/password/"+inscription_code
      +" <br><br>Regards,<br>the Team"
  var mailOptions = {
    from: EMAIL_ADDRESS,
    to: email,
    subject: "Active your account",
    text: content,
    html: content,
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('\x1b[38;5;224m[INFO]\x1b[0m '+new Date().toISOString().slice(0, 16).replace('T',' ')+' - email sent: ' + info.response);
  });
}

//////////////////////////////STRIPE FUNCTIONS//////////////////////////////////

let stripe = require('stripe') (STRIPE_KEY);

async function createStripeCustomer (id, email, username) {
  return new Promise(async (resolve, reject) => {
    stripe.customers.create({
        description: username,
        name: id,
        email: email
      },
      function(err, customer) {
        if (err)
          resolve(0);
        else
          resolve(customer.id);
      }
    );
  });
}

////////////////////////////// JWT FUNCTIONS ///////////////////////////////////

function createToken(username) {
  const  expiresIn  =  24  *  60  *  60;
  const  accessToken  =  Jwt.sign({ username:  username }, SECRET_KEY, {
    expiresIn:  expiresIn
  });
  return accessToken;
}

function tokenVerification(token) {
  Jwt.verify(token, SECRET_KEY, (err, verifiedJwt) => {
    if(err){
      res.send(err.message)
    } else {
      res.send(verifiedJwt)
    }
  })
}

//////////////////////////////USER FUNCTIONS////////////////////////////////////

function checkPwd(str) {
  if (str.length < 8) {
    return(false);
  }  else if (str.search(/\d/) == -1) {
    return(false);
  } else if (str.search(/[a-zA-Z]/) == -1) {
    return(false);
  } else if (str.search(/\W/) == -1) {
    return(false);
  }
  return(true);
}

function checkEmail(email) {
  if (email.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == -1){
    return (false)
  }
  return (true)
}

function makeInscriptionCode(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function register(username, email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      if (username.match(/^[^a-zA-Z0-9]+$/) == null && username.length < 4) {
        resolve("username need to be alphanumerical");
      } else if (!checkPwd(password)) {
        resolve("password is too weak");
      } else if (!checkEmail(email)) {
        resolve("wrong email");
      } else {
        current_user1 = await User.findAll({where: {email: email}});
        current_user2 = await User.findAll({where: {username: username}});
        if (current_user1.length != 0) {
          console.log("\x1b[38;5;224m[INFO]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - User already exists, email: "+email);
          resolve("User already exists, email: "+email);
        } else if (current_user2.length != 0) {
          console.log("\x1b[38;5;224m[INFO]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - User already exists, username: "+username);
          resolve("User already exists, username: "+username);
        } else {
          var id = makeInscriptionCode(16);
          var current_user = await User.findAll({where: {id: id}});
          while (current_user.length != 0 ) {
            id = makeInscriptionCode(16);
            current_user = await User.findAll({where: {id: id}});
          }
          Bcrypt.hash(password,10).then((hashedPassword) => {
            User.create({
              id: id,
              username: username,
              email: email,
              inscription_confirmed: false,
              role: 0,
              password: hashedPassword,
            }).then((val) => {
              console.log("\x1b[38;5;224m[INFO]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - Registration successfull "+id);
            }).catch((err) => {
              console.log("\x1b[31m[ERROR]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - "+err);
            });
            sendMailRegister(username, email, id);
            resolve("Registration successfull, please check your email")
          })
        }
      }
    } catch (e) {
      console.log("\x1b[31m[ERROR]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - "+e);
      reject(e);
    }
  });
}

async function logIn(username, password, validation) {
  return new Promise(async (resolve, reject) => {
    try {
      var current_user = await User.findAll({
        where: {[Op.or]: [{ email: username }, { username: username }]}}
      );
      if (current_user.length == 0) {
        console.log("\x1b[38;5;224m[INFO]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - Invalid login no result for "+username);
        resolve(0);
      } else {
        console.log("\x1b[38;5;224m[INFO]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - New login request for "+username);
        Bcrypt.compare(password, current_user[0].password, async function(err, res) {
          if(res) {
            if (current_user[0].inscription_confirmed == false) {
              if ( current_user[0].id == validation) {
                var stripeId = await createStripeCustomer(validation, current_user[0].email, current_user.username);
                if (stripeId == 0) resolve(1);
                await User.update({ inscription_confirmed: true, stripe_id: stripeId, last_connection: new Date().toISOString().slice(0, 16).replace('T',' ')}, {
                  where: {[Op.or]: [{ email: username }, { username: username }]}}
                );
                console.log("\x1b[38;5;224m[INFO]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - "+username+" is logged ");
                resolve(createToken(current_user[0].username));
              } else {
                console.log("\x1b[38;5;224m[INFO]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - "+username+" invalid validation code");
                resolve(0);
              }
            } else {
              console.log("\x1b[38;5;224m[INFO]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - "+username+" is logged ");
              resolve(createToken(current_user[0].username));
            }
          } else {
            console.log("\x1b[38;5;224m[INFO]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - "+username+" wrong password ");
            resolve(0);
          }
        });
      }
    } catch (e) {
      console.log("\x1b[31m[ERROR]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - "+e);
      reject(e);
    }
  });
}

//////////////////////////////INIT EXPRESS//////////////////////////////////////

let app = Express();

app.use(BodyParser.json()); // support json encoded bodies
app.use(BodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//////////////////////////////INIT EXPRESS SWAGGER//////////////////////////////

const app2 = Express();
const expressSwagger = require('express-swagger-generator')(app2);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'User microservice',
            version: '1.0.0',
        },
        host: 'localhost:'+PORT,
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['index.js'] //Path to the API handle folder
};

//////////////////////////////USER ROUTES///////////////////////////////////////

/**
 * @typedef Register
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /register
 * @group register - create a new user
 * @param {Register.model} user.body.required - the new user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @produces application/json application/json
 * @consumes application/json application/json
 */

app.post("/register", async (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  if (username != undefined && email != undefined && password != undefined) {
    register(username, email, password).then((value) => {
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
 */

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

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const v = req.query.v;
  const r = req.query.r;
  if (username != undefined && password != undefined) {
    res.json({ message: await logIn(username, password, v)});
  } else {
    res.json({ message: 0});
  }
});

//////////////////////////////START SERVERS/////////////////////////////////////

async function run() {
  console.log("\nStart User microservice ... \n");
  await new Promise(resolve => setTimeout(resolve, 500));
  app.listen(PORT);
  console.log("User microservice started on : \x1b[7mhttp://localhost:" + PORT+"\x1b[0m\n");

  console.log("Start Swagger documentation ... \n");
  await new Promise(resolve => setTimeout(resolve, 500));
  expressSwagger(options)
  app2.listen(SWAGGER_PORT);
  console.log("swagger started: \x1b[7mhttp://localhost:"+SWAGGER_PORT+"/api-docs\x1b[0m\n");
}

run();
