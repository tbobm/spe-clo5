import express from "express";
import { config } from "dotenv";
import { createConnection, Connection } from "typeorm";
import { RegisterRoutes } from "./routes/index"
import  { absolutePath }  from "swagger-ui-dist";
import { join } from "path";
import { json } from "body-parser";
import morgan from "morgan";
import { createReadStream, createWriteStream } from "fs";

export class Application  {

    public app: express.Express;
    public server: any;

    constructor(){
        config();

        this.app = express();
        this.config();
    }

    config(){
        this.app.use(morgan(":method :url :status - :response-time ms - :remote-addr - :date[iso]", {
            stream: createWriteStream(`${__dirname}/../logs/${process.env.APP}.log`, {
                flags: "a+"
            })
        }));
        this.app.use(json());
        this.app.use((err: any, req: any, res: any, next: any) => {
            if (err instanceof SyntaxError) {
                res.status(400).json({
                    message: "Bad request",
                    httpCode: 400
                });
            } else {
                res.status(500).json({
                    message: "internal error",
                    httpCode: 500
                });
            }
        });
        this.app.use("/public", express.static(join(__dirname, "public")));
        this.app.use("/swagger", express.static(absolutePath()));
        this.app.use("/logs", (req: express.Request, res: express.Response) => {
            createReadStream(`${__dirname}/../logs/${process.env.APP}.log`).pipe(res);
        });
        RegisterRoutes(this);
    }

    async start(){
        return new Promise(async (resolve, reject) => {
            let connection : any = null;

            if (process.env.NODE_ENV !== "test"){
                const connection : Connection = await createConnection(process.env.NODE_ENV || "development");
    
                await connection.runMigrations({
                    transaction: "all"
                });
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
                resolve(true);
            });
        }));
    }
}

