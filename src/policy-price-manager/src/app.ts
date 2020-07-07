import express from "express";
import { config } from "dotenv";
import { createConnection, Connection } from "typeorm";
import { RegisterRoutes } from "../src/models/routes/index";
import { absolutePath } from "swagger-ui-dist";
import { join } from "path";
import { createContainer, AwilixContainer, asClass, InjectionMode, Lifetime } from "awilix";
import * as Constants from "../src/models/utils/Constants";
import { PeriodRepository } from "./models/repositories/PeriodRepository";
import { PolicyPriceController } from "./controllers/PolicyPriceController";
import { PolicyPriceEstablishmentRepository } from "./models/repositories/PolicyPriceEstablishmentRepository";
import { PolicyPricePeriodRepository } from "./models/repositories/PolicyPricePeriodRepository";
import { PolicyPriceRepository } from "./models/repositories/PolicyPriceRepository";
import { PolicyPriceService } from "./models/services/PolicyPriceService";
import { PersonRepository } from "./models/repositories/PersonRepository";

export class Application  {

    public app: express.Express;
    public container: AwilixContainer;

    constructor(){
        config();

        this.app = express();
        this.config();
    }

    config(){
        const bodyParser = require("body-parser");

        this.container = createContainer(); 
        this.app.use(bodyParser.json());
        this.app.use("/swagger", express.static(absolutePath()));
        this.app.use("/public", express.static(join(__dirname, "..", "public")));
    }

    async start(){
        return new Promise(async (resolve, reject) => {
            const connection : Connection = await createConnection(process.env.NODE_ENV || "development");

            RegisterRoutes(this);
            const o : any= {};

            o[Constants.PERIOD_REPOSITORY] = asClass(PeriodRepository).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
            o[Constants.POLICY_PRICE_CONTROLLER] = asClass(PolicyPriceController).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
            o[Constants.POLICY_PRICE_ESTABLISHMENT_REPOSITORY] = asClass(PolicyPriceEstablishmentRepository).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
            o[Constants.POLICY_PRICE_PERIOD_REPOSITORY] = asClass(PolicyPricePeriodRepository).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
            o[Constants.POLICY_PRICE_REPOSITORY] = asClass(PolicyPriceRepository).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
            o[Constants.POLICY_PRICE_SERVICE] = asClass(PolicyPriceService).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
            o[Constants.PERSON_REPOSITORY] = asClass(PersonRepository).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
            this.container.register(o);
            await connection.runMigrations({
                transaction: "all"
            });
            this.app.listen(Number(process.env.PORT), process.env.BIND_ADDRESS, () => {
                console.log(`The application is started on port ${process.env.PORT}`);
                resolve(connection);
            });
        });
    }

}

