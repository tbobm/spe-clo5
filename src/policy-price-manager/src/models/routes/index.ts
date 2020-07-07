import { Application } from "../../app";
import * as Constants from "../utils/Constants";
import { PolicyPriceController } from "../../controllers/PolicyPriceController";
import express from "express";
import { DomainPolicyPrice } from "../../controllers/types/PolicyPriceResource";

export function RegisterRoutes(application: Application){
    const app = application.app;
    const container = application.container;

    app.get("/:id", async (req : express.Request, res: express.Response) => {
        const controller : PolicyPriceController = container.resolve(Constants.POLICY_PRICE_CONTROLLER);
        const ret = await controller.findOne(Number(req.params.id));

        res.status(ret.httpCode).json(ret);
    });

    app.get("/", async (req : express.Request, res: express.Response) => {
        const controller : PolicyPriceController = container.resolve(Constants.POLICY_PRICE_CONTROLLER);
        const ret = await controller.getAll();

        res.status(ret.httpCode).json(ret);
    });

    app.post("/", async (req : express.Request, res: express.Response) => {
        const controller : PolicyPriceController = container.resolve(Constants.POLICY_PRICE_CONTROLLER);
        const ret = await controller.save(new DomainPolicyPrice(req.body));

        res.status(ret.httpCode).json(ret);
    });

    app.delete("/:id", async (req : express.Request, res: express.Response) => {
        const controller : PolicyPriceController = container.resolve(Constants.POLICY_PRICE_CONTROLLER);
        const ret = await controller.delete(Number(req.params.id));

        res.status(ret.httpCode).json(ret);
    });

    app.put("/", async (req : express.Request, res: express.Response) => {
        const controller : PolicyPriceController = container.resolve(Constants.POLICY_PRICE_CONTROLLER);
        const ret = await controller.update(new DomainPolicyPrice(req.body));

        res.status(ret.httpCode).json(ret);
    });

    app.get("/establishment/:id", async (req : express.Request, res: express.Response) => {
        const controller : PolicyPriceController = container.resolve(Constants.POLICY_PRICE_CONTROLLER);
        const ret = await controller.findByEstablishment(Number(req.params.id));

        res.status(ret.httpCode).json(ret);
    });

}
