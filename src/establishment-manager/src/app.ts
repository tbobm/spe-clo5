import express from "express";
import { config } from "dotenv";
import { createConnection } from "typeorm";
import { absolutePath } from "swagger-ui-dist";
import { join } from "path";
import { createContainer, AwilixContainer, asClass, InjectionMode, Lifetime } from "awilix";
import { EstablishmentRepository } from "./models/repositories/EstablishmentRepository";
import { EstablishmentServiceImpl } from "./models/services/EstablishmentServiceImpl";
import { EstablishmentController } from "./controllers/EstablishmentController";
import { RegisterRoute } from "./routes/index";
import morgan from "morgan";
import { json } from "body-parser";
import { createWriteStream, createReadStream } from "fs";

export class Application  {

    public app: express.Express;
    public server: any;
    public container: AwilixContainer;

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
            console.log(err.stack);
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
            let connection = await createConnection(process.env.NODE_ENV || "development");

            await connection.runMigrations({
                transaction: "all"
            });
            this.container.register({
                "establishmentRepository": asClass(EstablishmentRepository).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON),
                "establishmentService": asClass(EstablishmentServiceImpl).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON),
                "establishmentController": asClass(EstablishmentController).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON)
            });
            RegisterRoute(this);
            this.server = this.app.listen(Number(process.env.PORT), process.env.BIND_ADDRESS, () => {
                console.log(`The application is started on port ${process.env.PORT}`);
                resolve(connection);
            });
        });
    }

    async stop(){
        return (new Promise((resolve, reject) => {
            this.server.close(() => {
                resolve(true)
            });
        }))
    }

}

