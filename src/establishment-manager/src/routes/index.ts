import { Application } from "../app";
import express from "express";
import * as Constants from "../models/utils/Constants";
import { EstablishmentController } from "../controllers/EstablishmentController";
import { DomainEstablishment } from "../controllers/types/EstablishmentResource"; 

export function RegisterRoute(application: Application) {
    const app = application.app;
    const container = application.container;

    app.get("/", async (req: express.Request, res: express.Response) => {
        const controller : EstablishmentController = container.resolve(Constants.ESTABLISHMENT_CONTROLLER);
        const list = await controller.getAll();

        res.status(200).json(list);
    });

    app.post("/", async (req: express.Request, res: express.Response) => {
        const controller : EstablishmentController = container.resolve(Constants.ESTABLISHMENT_CONTROLLER);
        const ret = await controller.save(new DomainEstablishment(req.body));

        res.status(201).json(ret);
    });

    app.put("/", async (req: express.Request, res: express.Response) => {
        const controller : EstablishmentController = container.resolve(Constants.ESTABLISHMENT_CONTROLLER);
        const ret = await controller.update(new DomainEstablishment(req.body));

        res.status(200).json(ret);
    });

    app.delete("/:id", async (req: express.Request, res: express.Response) => {
        const controller : EstablishmentController = container.resolve(Constants.ESTABLISHMENT_CONTROLLER);
        const ret = await controller.delete(Number(req.params.id))

        res.status(200).json(ret);
    });

    app.get("/:id", async (req: express.Request, res: express.Response) => {
        const controller : EstablishmentController = container.resolve(Constants.ESTABLISHMENT_CONTROLLER);
        const ret = await controller.getOne(Number(req.params.id));

        res.status(200).json(ret);
    });
    
}