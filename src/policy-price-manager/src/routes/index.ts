import { Application } from "../app";
import container from "../container";
import {
    POLICY_PRICE_CONTROLLER, 
} from "../models/utils/Constants";
import { PolicyPriceController } from "../controllers/PolicyPriceController";
import express from "express";
import { DomainPolicyPrice } from "../controllers/types/PolicyPriceResource";

export function RegisterRoutes(application: Application){
    const app = application.app;

    app.get("/:id", async (req : express.Request, res: express.Response) => {
        const controller : PolicyPriceController = container.resolve(POLICY_PRICE_CONTROLLER);
        const ret = await controller.findOne(Number(req.params.id));

        res.status(ret.httpCode).json(ret);
    });

    app.get("/", async (req : express.Request, res: express.Response) => {
        const controller : PolicyPriceController = container.resolve(POLICY_PRICE_CONTROLLER);
        const ret = await controller.getAll();

        res.status(ret.httpCode).json(ret);
    });

    app.post("/", async (req : express.Request, res: express.Response) => {
        const controller : PolicyPriceController = container.resolve(POLICY_PRICE_CONTROLLER);
        const resource = new DomainPolicyPrice(req.body);
        const validation = DomainPolicyPrice.validate(resource);

        if (validation.valid){
            const ret = await controller.save(resource);

            res.status(ret.httpCode).json(ret);
        }
        else {
            res.status(400).json(validation.errors);
        }
    });

    app.delete("/:id", async (req : express.Request, res: express.Response) => {
        const controller : PolicyPriceController = container.resolve(POLICY_PRICE_CONTROLLER);
        const ret = await controller.delete(Number(req.params.id));

        res.status(ret.httpCode).json(ret);
    });

    app.put("/", async (req : express.Request, res: express.Response) => {
        const controller : PolicyPriceController = container.resolve(POLICY_PRICE_CONTROLLER);
        const resource = new DomainPolicyPrice(req.body);
        const validation = DomainPolicyPrice.validate(resource);

        if (validation.valid){
            const ret = await controller.update(resource);

            res.status(ret.httpCode).json(ret);
        }
        else{
            res.status(400).json(validation.errors);
        }
    });

    app.get("/establishment/:id", async (req : express.Request, res: express.Response) => {
        const controller : PolicyPriceController = container.resolve(POLICY_PRICE_CONTROLLER);
        const ret = await controller.findByEstablishment(Number(req.params.id));

        res.status(ret.httpCode).json(ret);
    });

}
