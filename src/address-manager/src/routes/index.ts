import { Application } from "../app";
import express from "express";
import * as Constants from "../utils/Constants";
import { AddressController } from "../controllers/AddressController";
import { DomainAddress } from "../controllers/types/AddressResource";

export function RegisterRoutes(application: Application){
    const app = application.app;
    const container = application.container;

    app.get("/", async (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const ret : any= await addressController.getAll();

        if (!ret.data){
            res.status(204).json(ret);
        }
        else {
            res.status(200).json(ret);
        }
    });

    app.get("/:id", async (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const ret : any= await addressController.findOne(Number(req.params.id));

        if (!ret.data){
            res.status(204).json(ret);
        }
        else {
            res.status(200).json(ret);
        }
    });

    app.post("/", async (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const ret : any = await addressController.save(new DomainAddress(req.body));

        if (!ret.data){
            res.status(400).json(ret);
        }
        else {
            res.status(201).json(ret);
        }
    });

    app.put("/", async (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const ret : any = await addressController.update(new DomainAddress(req.body));

        if (!ret.data){
            res.status(400).json(ret);
        }
        else {
            res.status(200).json(ret);
        }
    });

    app.delete("/:id", async (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const ret : any= await addressController.delete(Number(parseInt(req.params.id)));

        if (!ret.action){
            res.status(400).json(ret);
        }
        else {
            res.status(200).json(ret);
        }
    });
}