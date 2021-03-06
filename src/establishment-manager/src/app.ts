import express from "express";
import { config } from "dotenv";
import { createConnection } from "typeorm";
import { absolutePath } from "swagger-ui-dist";
import { join } from "path";
import { RegisterRoute } from "./routes/index";
import morgan from "morgan";
import { json } from "body-parser";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Establishment } from "./models/entities/Establishment";
import { EstablishmentAddress } from "./models/entities/EstablishmentAddress";

export class Application  {

    public app: express.Express;
    public server: any;

    constructor(){
        config();

        this.app = express();
        this.config();
    }

    config(){
        this.app.use(morgan(":method :url :status - :response-time ms - :remote-addr - :date[iso]"));
        this.app.use(json());
        this.app.use((err: any, req: any, res: any, next: any) => {
            console.log(err.stack);
            res.status(500).json({
                message: "internal error",
                httpCode: 500
            });
        });
        this.app.use("/public", express.static(join(__dirname, "public")));
        this.app.use("/swagger", express.static(absolutePath()));
        RegisterRoute(this);
    }

    async start(){
        return new Promise(async (resolve, reject) => {
            let connection : any = null;
            
            if (process.env.NODE_ENV !== "test"){
                const opts : PostgresConnectionOptions = {
                    type: "postgres",
                    url: process.env.DB_URL,
                    entities: [
                        Establishment,
                        EstablishmentAddress
                    ],
                    migrations: [
                        "models/migrations/**/*.js",
                        "src/models/migrations/**/*.ts"
                    ],
                    cli: {
                        migrationsDir: "models/migrations"
                    }
                };
                connection = await createConnection(opts);
                console.log(connection);
                const ret = await connection.runMigrations({
                    transaction: "all"
                });
                console.log(ret);
            }
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

