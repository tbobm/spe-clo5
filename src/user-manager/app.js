const Express = require('express');
const Sequelize = require('sequelize');
const Path = require('path');
const BodyParser = require('body-parser');

const configPath = Path.normalize(__dirname + '/config/config.json');
const routesPath = Path.normalize(__dirname + '/routes/users');

const config = require(configPath);
const routes = require(routesPath);

const db = new Sequelize(config.CONNECTION_STRING);

let app = Express();

app.use(BodyParser.json()); // support json encoded bodies
app.use(BodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

async function run() {

  await testDB.then((value) => {});

  // console.log("\nStart Swagger documentation ... \n");

  const app2 = Express();
  const expressSwagger = require('express-swagger-generator')(app2);

  let options = {
    swaggerDefinition: {
      info: {
        description: 'This is a sample server',
        title: 'User microservice',
        version: '1.0.0',
      },
      host: 'localhost:'+config.PORT,
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
    files: [Path.join(__dirname, "../routes/users")] //Path to the API handle folder
  };

  await new Promise(resolve => setTimeout(resolve, 500));
  expressSwagger(options)
  app2.listen(config.SWAGGER_PORT);
  console.log("swagger started: on port "+config.SWAGGER_PORT);

  // console.log("Start User microservice ... \n");
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("test1\n");
  app.use('/', routes);
  console.log("test2\n");
  app.listen(config.PORT);
  console.log("test3\n");
  console.log("User microservice started on port " + config.PORT);

}

run();
