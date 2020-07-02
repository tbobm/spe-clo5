import express from "express";
import { EstablishmentRouter } from "./routes/EstablishmentRouter";
import { config } from "dotenv";
import { createConnection, Connection } from "typeorm";

export class Application  {

    public app: express.Application;

    constructor(){
        config();

        this.app = express();
        this.config();
    }

    config(){
        const bodyParser = require("body-parser");

        this.app.use(bodyParser.json());
    }

    async start(){
        return new Promise(async (resolve, reject) => {
            const connection : Connection = await createConnection(process.env.NODE_ENV || "development");
            const establishmentRouter = new EstablishmentRouter();

            await connection.runMigrations({
                transaction: "all"
            });
            this.app.use(establishmentRouter.toRouter());
            this.app.listen(Number(process.env.PORT), process.env.BIND_ADDRESS, () => {
                console.log(`The application is started on port ${process.env.PORT}`);
                resolve(connection);
            });
        });
    }

}

