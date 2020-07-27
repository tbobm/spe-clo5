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

        res.status(ret.httpCode).json(ret);
    });

    app.get("/:id", async (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const ret : any= await addressController.findOne(Number(req.params.id));

        res.status(ret.httpCode).json(ret);
    });

    app.post("/", async (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const resource = new DomainAddress(req.body);
        const validation = DomainAddress.validate(resource);
        
        if (validation.valid){
            const ret : any = await addressController.save(resource);
            
            res.status(ret.httpCode).json(ret);
        }
        else{
            res.status(400).json(validation.errors);
        }
    });

    app.put("/", async (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const resource = new DomainAddress(req.body);
        const validation = DomainAddress.validate(resource);

        if (validation.valid){
            const ret : any = await addressController.update(resource);

            res.status(ret.httpCode).json(ret);
        }
        else{
            res.status(400).json(validation.errors);
        }
    });

    app.delete("/:id", async (req: express.Request, res: express.Response) => {
        const addressController : AddressController = container.resolve(Constants.ADDRESS_CONTROLLER);
        const ret : any= await addressController.delete(Number(parseInt(req.params.id)));

        res.status(ret.httpCode).json(ret);
    });
}
