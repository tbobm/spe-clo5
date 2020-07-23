import express from "express";
import { config } from "dotenv";
import { createConnection, Connection } from "typeorm";
import { RegisterRoutes } from "../routes"
import  { absolutePath }  from "swagger-ui-dist";
import * as path from "path";

export class Application  {

    public app: express.Express;

    constructor(){
        config();

        this.app = express();
        this.config();
    }

    config(){
        const bodyParser = require("body-parser");

        this.app.use("/swagger", express.static(absolutePath()));
        this.app.use("/public", express.static(path.join(__dirname, "..", 'public')));
        this.app.use(bodyParser.json());
    }

    async start(){
        return new Promise(async (resolve, reject) => {
            const connection : Connection = await createConnection(process.env.NODE_ENV || "development");

            await connection.runMigrations({
                transaction: "all"
            });
            RegisterRoutes(this.app);
            console.log(__dirname);
            this.app.listen(Number(process.env.PORT), process.env.BIND_ADDRESS, () => {
                console.log(`The application is started on port ${process.env.PORT}`);
                resolve(connection);
            });
        });
    }

}
