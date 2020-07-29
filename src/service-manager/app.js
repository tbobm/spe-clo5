const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");
// set port, listen for requests
const PORT = process.env.PORT || 8080;
const indexRoutes = require('./routes/index');

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", indexRoutes);


module.exports = {
    server: null,
    app: app,
    start:() => (new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === "test"){
            this.server = app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}.`);
                resolve(true);
            });
            return;
        }
        db.sequelize.sync().then(() => {
           this.server = app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}.`);
                resolve(true);
            });
        }).catch((err) => {
            reject(err);
        });
    })),
    stop: () => {
        return new Promise((resolve, reject) => {
            if (this.server == null){
                console.log("the server isn't running !");
                resolve(true);
                return;
            }
            this.server.close((err) => {
                if (err){
                    resolve(true);
                    return;
                }
                console.log("stop server...");
                resolve(true);
            });
        });
    }
};
