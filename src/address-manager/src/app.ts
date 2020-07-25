import express from "express";
import { config } from "dotenv";
import { createConnection, Connection } from "typeorm";
import { RegisterRoutes } from "../src/routes/index"
import  { absolutePath }  from "swagger-ui-dist";
import * as path from "path";
import { createContainer, AwilixContainer, asClass, InjectionMode, Lifetime } from "awilix";
import * as Constants from "../src/utils/Constants";
import { AddressController } from "./controllers/AddressController";
import { AddressRepository } from "./models/repositories/AddressRepository";
import { AddressService } from "./models/services/AddressService";

export class Application  {

    public app: express.Express;
    public container: AwilixContainer;
    public server: any;

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
            this.container = createContainer();
            const o : any= {};
            o[Constants.ADDRESS_CONTROLLER] = asClass(AddressController).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON);
            o[Constants.ADDRESS_REPOSITORY] = asClass(AddressRepository).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON);
            o[Constants.ADDRESS_SERVICE] = asClass(AddressService).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON);
            this.container.register(o);
            RegisterRoutes(this);
            console.log(__dirname);
            this.server = this.app.listen(Number(process.env.PORT), process.env.BIND_ADDRESS, () => {
                console.log(`The application is started on port ${process.env.PORT}`);
                resolve(connection);
            });
        });
    }

    async stop(){
        return (new Promise((resolve, reject) => {
            this.server.close(() => {
                resolve(true);
            });
        }));
    }
}

