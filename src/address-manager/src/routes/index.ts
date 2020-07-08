import { Application } from "../app";
import express from "express";
import * as Constants from "../utils/Constants";
import { AddressController } from "../controllers/AddressController";
import { DomainAddress } from "../controllers/types/AddressResource";

export function RegisterRoutes(application: Application){
    const app = application.app;
    const container = application.container;

    app.get("/", (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const ret : any= addressController.getAll();

        if (!ret.data){
            res.status(204).json(ret);
        }
        else {
            res.status(200).json(ret);
        }
    });

    app.get("/:id", (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const ret : any= addressController.findOne(Number(req.params.id));

        if (!ret.data){
            res.status(204).json(ret);
        }
        else {
            res.status(200).json(ret);
        }
    });

    app.post("/", (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const ret : any = addressController.save(new DomainAddress(req.body));

        if (!ret.data){
            res.status(400).json(ret);
        }
        else {
            res.status(201).json(ret);
        }
    });

    app.put("/", (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const ret : any = addressController.update(new DomainAddress(req.body));

        if (!ret.data){
            res.status(400).json(ret);
        }
        else {
            res.status(200).json(ret);
        }
    });

    app.delete("/:id", (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const ret : any= addressController.delete(Number(parseInt(req.params.id)));

        if (!ret.action){
            res.status(400).json(ret);
        }
        else {
            res.status(200).json(ret);
        }
    });
}