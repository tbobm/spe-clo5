const Path = require('path');

const configPath = Path.join(__dirname, "../config/config.json");
const config = require(configPath);
const userPath = Path.join(__dirname, "../models/users");
const User = require(userPath);

const Nodemailer = require('nodemailer');
const Bcrypt = require('bcrypt')
const Jwt  =  require('jsonwebtoken');
const { Op } = require('sequelize');
const stripe = require('stripe') (config.STRIPE_KEY);

//////////////////////////////EMAIL FUNCTIONS//////////////////:////////////////

module.exports = {
  sendMailRegister(user, email, inscription_code) {
    var transporter = Nodemailer.createTransport({
      service: config.EMAIL_SERVICE,
      auth: {
        user: config.EMAIL_ADDRESS,
        pass: config.EMAIL_PASSWORD
      }
    });
    var content = "Hello "+user
    +", <br><br> To validate your inscription click on the link below,"
    +" this link will expire in 1 hour <br><br>"
    +"http://localhost:"+PORT+"/login/"+inscription_code
    +" <br><br>Regards,<br>the Team"
    var mailOptions = {
      from: config.EMAIL_ADDRESS,
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
  },

  sendMailPassword(user, email, inscription_code) {
    var transporter = Nodemailer.createTransport({
      service: config.EMAIL_SERVICE,
      auth: {
        user: config.EMAIL_ADDRESS,
        pass: config.EMAIL_PASSWORD
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
  },

  //////////////////////////////STRIPE FUNCTIONS//////////////////////////////////

  async createStripeCustomer (id, email, username) {
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
  },

  ////////////////////////////// JWT FUNCTIONS ///////////////////////////////////

  createToken(username) {
    const  expiresIn  =  24  *  60  *  60;
    const  accessToken  =  Jwt.sign({ username:  username }, config.SECRET_KEY, {
      expiresIn:  expiresIn
    });
    return accessToken;
  },

  tokenVerification(token) {
    Jwt.verify(token, config.SECRET_KEY, (err, verifiedJwt) => {
      if(err){
        res.send(err.message)
      } else {
        res.send(verifiedJwt)
      }
    })
  },

  //////////////////////////////USER FUNCTIONS////////////////////////////////////

  checkPwd(str) {
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
  },

  checkEmail(email) {
    if (email.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == -1){
      return (false)
    }
    return (true)
  },

  makeInscriptionCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  async register(username, email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        if (username.match(/^[^a-zA-Z0-9]+$/) == null && username.length < 4) {
          resolve("username need to be alphanumerical");
        } else if (!this.checkPwd(password)) {
          resolve("password is too weak");
        } else if (!this.checkEmail(email)) {
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
            var id = this.makeInscriptionCode(16);
            var current_user = await User.findAll({where: {id: id}});
            while (current_user.length != 0 ) {
              id = this.makeInscriptionCode(16);
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
              this.sendMailRegister(username, email, id);
            });
            resolve("Registration successfull, please check your email")
          }
        }
      } catch (e) {
        console.log("\x1b[31m[ERROR]\x1b[0m "+new Date().toISOString().slice(0, 16).replace('T',' ')+" - "+e);
        reject(e);
      }
    });
  },

  async logIn(username, password, validation) {
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

};
