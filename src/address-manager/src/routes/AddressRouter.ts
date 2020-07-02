import express from "express";
import { Route } from "./Route";
import { EMethod } from "./EMethod";
import { AddressController } from "../controllers/AddressController";
import { AddressResource } from "../controllers/types/AddressResource";

export class AddressRouter {

    private controller: AddressController;

    constructor(){
        this.controller = new AddressController();

        this.hello = this.hello.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.findOne = this.findOne.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    hello(req: express.Request, res: express.Response){
        res.end(this.controller.hello());
    }

    async save(req: express.Request, res: express.Response){
        const obj = await this.controller.save(req.body as AddressResource);

        if (!obj.data){
            return (res.status(400).end());
        }
        res.status(201).json(obj);
    }

    async delete(req: express.Request, res: express.Response){
        const obj = await this.controller.delete(Number(req.params.id));
   
        if (obj.action){
            delete obj.action;
            return (res.status(200).json(obj));
        }
        res.status(400).json(obj);
    }

    async update(req: express.Request, res: express.Response){
        const obj = await this.controller.update(req.body as AddressResource);
        
        if (!obj.data){
            return (res.status(400).json(obj));
        }
        return (res.status(200).json(obj));
    }

    async findOne(req: express.Request, res: express.Response){
        const obj = await this.controller.findOne(Number(req.params.id));

        if (!obj.data){
            return (res.status(204).json(obj));
        }
        return (res.status(200).json(obj));
    }

    async getAll(req: express.Request, res: express.Response){
        const obj = await this.controller.getAll();

        return (res.status(200).json(obj));
    }

    toRouter(){
        const router = express.Router();

        new Route(EMethod.GET, "/hello", this.hello).buildEndpoint(router);
        new Route(EMethod.POST, "/", this.save).buildEndpoint(router);
        new Route(EMethod.PUT, "/", this.update).buildEndpoint(router);
        new Route(EMethod.GET, "/:id", this.findOne).buildEndpoint(router);
        new Route(EMethod.GET, "/", this.getAll).buildEndpoint(router);
        new Route(EMethod.DELETE, "/:id", this.delete).buildEndpoint(router);
        return (router);
    }

}
