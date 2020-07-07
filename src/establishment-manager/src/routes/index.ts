import { Application } from "../app";
import express from "express";
import * as Constants from "../models/utils/Constants";
import { EstablishmentController } from "../controllers/EstablishmentController";

export function RegisterRoute(application: Application) {
    const app = application.app;
    const container = application.container;

    app.get("/", async (req: express.Request, res: express.Response) => {
        const controller : EstablishmentController = container.resolve(Constants.ESTABLISHMENT_CONTROLLER);
        const list = await controller.getAll();

        res.status(200).json(list);
    });
    
}