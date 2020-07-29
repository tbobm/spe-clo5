import { createContainer, AwilixContainer, asClass, InjectionMode, Lifetime } from "awilix";
import * as Constants from "./models/utils/Constants";
import { AddressController } from "./controllers/AddressController";
import { AddressRepository } from "./models/repositories/AddressRepository";
import { AddressService } from "./models/services/AddressService";
import { Application } from "./app";

const container: AwilixContainer = createContainer();
const o : any= {};

o[Constants.ADDRESS_CONTROLLER] = asClass(AddressController).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON);
o[Constants.ADDRESS_REPOSITORY] = asClass(AddressRepository).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON);
o[Constants.ADDRESS_SERVICE] = asClass(AddressService).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON);
o[Constants.APP] = asClass(Application).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON);
container.register(o);
export default container;