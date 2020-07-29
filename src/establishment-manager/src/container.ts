import { createContainer, AwilixContainer, asClass, InjectionMode, Lifetime } from "awilix";
import { EstablishmentRepository } from "./models/repositories/EstablishmentRepository";
import { EstablishmentServiceImpl } from "./models/services/EstablishmentServiceImpl";
import { EstablishmentController } from "./controllers/EstablishmentController";
import { Application } from "./app";

const container : AwilixContainer = createContainer();

container.register({
    "establishmentRepository": asClass(EstablishmentRepository).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON),
    "establishmentService": asClass(EstablishmentServiceImpl).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON),
    "establishmentController": asClass(EstablishmentController).setInjectionMode(InjectionMode.CLASSIC).setLifetime(Lifetime.SINGLETON),
    "app": asClass(Application)
});

export default container;
