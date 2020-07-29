import { createContainer, AwilixContainer, asClass, InjectionMode, Lifetime } from "awilix";
import { Application } from "./app";
import {
    PERIOD_REPOSITORY, 
    POLICY_PRICE_CONTROLLER, 
    POLICY_PRICE_ESTABLISHMENT_REPOSITORY, 
    POLICY_PRICE_PERIOD_REPOSITORY, 
    POLICY_PRICE_REPOSITORY, 
    POLICY_PRICE_SERVICE, 
    PERSON_REPOSITORY, 
    APP
} from "./models/utils/Constants";
import { PeriodRepository } from "./models/repositories/PeriodRepository";
import { PolicyPriceController } from "./controllers/PolicyPriceController";
import { PolicyPriceEstablishmentRepository } from "./models/repositories/PolicyPriceEstablishmentRepository";
import { PolicyPricePeriodRepository } from "./models/repositories/PolicyPricePeriodRepository";
import { PolicyPriceRepository } from "./models/repositories/PolicyPriceRepository";
import { PolicyPriceService } from "./models/services/PolicyPriceService";
import { PersonRepository } from "./models/repositories/PersonRepository";

const container : AwilixContainer = createContainer();
const o : any= {};

o[PERIOD_REPOSITORY] = asClass(PeriodRepository).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
o[POLICY_PRICE_CONTROLLER] = asClass(PolicyPriceController).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
o[POLICY_PRICE_ESTABLISHMENT_REPOSITORY] = asClass(PolicyPriceEstablishmentRepository).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
o[POLICY_PRICE_PERIOD_REPOSITORY] = asClass(PolicyPricePeriodRepository).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
o[POLICY_PRICE_REPOSITORY] = asClass(PolicyPriceRepository).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
o[POLICY_PRICE_SERVICE] = asClass(PolicyPriceService).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
o[PERSON_REPOSITORY] = asClass(PersonRepository).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
o[APP] = asClass(Application).setLifetime(Lifetime.SINGLETON).setInjectionMode(InjectionMode.CLASSIC);
container.register(o);

export default container;
