import { Application } from "../app";
import container from "../container";
import express from "express";
import * as Constants from "../models/utils/Constants";
import { EstablishmentController } from "../controllers/EstablishmentController";
import { DomainEstablishment } from "../controllers/types/EstablishmentResource"; 

export function RegisterRoute(application: Application) {
    const app = application.app;

    app.get("/", async (req: express.Request, res: express.Response) => {
        const controller : EstablishmentController = container.resolve(Constants.ESTABLISHMENT_CONTROLLER);
        const ret = await controller.getAll();

        res.status(ret.httpCode).json(ret);
    });

    app.post("/", async (req: express.Request, res: express.Response) => {
        const controller : EstablishmentController = container.resolve(Constants.ESTABLISHMENT_CONTROLLER);
        const resource = new DomainEstablishment(req.body);
        const validation = DomainEstablishment.validate(resource);

        if (validation.valid){
            const ret = await controller.save(resource);

            res.status(ret.httpCode).json(ret);
        }
        else {
            res.status(400).json(validation.errors);
        }
    });

    app.put("/", async (req: express.Request, res: express.Response) => {
        const controller : EstablishmentController = container.resolve(Constants.ESTABLISHMENT_CONTROLLER);
        const resource = new DomainEstablishment(req.body);
        const validation = DomainEstablishment.validate(resource);
        
        if (validation.valid){
            const ret = await controller.update(resource);

            res.status(ret.httpCode).json(ret);
        }
        else {
            res.status(400).json(validation.errors);
        }
    });

    app.delete("/:id", async (req: express.Request, res: express.Response) => {
        const controller : EstablishmentController = container.resolve(Constants.ESTABLISHMENT_CONTROLLER);
        const ret = await controller.delete(Number(req.params.id))

        res.status(ret.httpCode).json(ret);
    });

    app.get("/:id", async (req: express.Request, res: express.Response) => {
        const controller : EstablishmentController = container.resolve(Constants.ESTABLISHMENT_CONTROLLER);
        const ret = await controller.getOne(Number(req.params.id));

        res.status(ret.httpCode).json(ret);
    });
    
}