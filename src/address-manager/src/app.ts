import express from "express";
import { config } from "dotenv";
import { createConnection, Connection } from "typeorm";
import { RegisterRoutes } from "../src/routes/index"
import  { absolutePath }  from "swagger-ui-dist";
import { join } from "path";
import { createContainer, AwilixContainer, asClass, InjectionMode, Lifetime } from "awilix";
import * as Constants from "../src/utils/Constants";
import { AddressController } from "./controllers/AddressController";
import { AddressRepository } from "./models/repositories/AddressRepository";
import { AddressService } from "./models/services/AddressService";
import { json } from "body-parser";
import morgan from "morgan";
import { createReadStream, createWriteStream } from "fs";

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
        this.container = createContainer();
        this.app.use(morgan(":method :url :status - :response-time ms - :remote-addr - :date[iso]", {
            stream: createWriteStream(`${__dirname}/../logs/${process.env.APP}.log`, {
                flags: "a+"
            })
        }));
        this.app.use(json());
        this.app.use((err: any, req: any, res: any, next: any) => {
            res.status(500).json({
                message: "internal error",
                httpCode: 500
            });
        });
        this.app.use("/public", express.static(join(__dirname, "..", "public")));
        this.app.use("/swagger", express.static(absolutePath()));
        this.app.use("/logs", (req: express.Request, res: express.Response) => {
            createReadStream(`${__dirname}/../logs/${process.env.APP}.log`).pipe(res);
        });
    }

    async start(){
        return new Promise(async (resolve, reject) => {
            const connection : Connection = await createConnection(process.env.NODE_ENV || "development");
            const o : any= {};

            await connection.runMigrations({
                transaction: "all"
            });
            o[Constants.ADDRESS_CONTROLLER] = asClass(AddressController).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON);
            o[Constants.ADDRESS_REPOSITORY] = asClass(AddressRepository).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON);
            o[Constants.ADDRESS_SERVICE] = asClass(AddressService).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON);
            this.container.register(o);
            RegisterRoutes(this);
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

