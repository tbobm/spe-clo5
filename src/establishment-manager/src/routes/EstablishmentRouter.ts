import { EstablishmentController } from "../controllers/EstablishmentController";
import express from "express";
import { Route } from "./Route";
import { EMethod } from "./EMethod";
import { Establishment } from "../models/entities/Establishment";
import { DomainEstablishment } from "../domain/entities/establishment";

export class EstablishmentRouter {

    private controller: EstablishmentController;

    constructor(){
        this.controller = new EstablishmentController();

        this.hello = this.hello.bind(this);
        this.save = this.save.bind(this);
        this.getAll = this.getAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }


    hello(req: express.Request, res: express.Response){
        res.end(this.controller.hello());
    }

    async save(req: express.Request, res: express.Response){
        const domainEstablishment = new DomainEstablishment(req.body); 
        const saved = await this.controller.save(domainEstablishment);

        res.status(201).json({
            message: "Establishment saved",
            data: saved
        });
    }

    async update(req: express.Request, res: express.Response){
        const domainEstablishment = new DomainEstablishment(req.body); 
        const saved = await this.controller.update(domainEstablishment);

        res.status(200).json({
            message: "Establishment updated",
            data: saved
        });
    }

    async getAll(req: express.Request, res: express.Response){
        const list = await this.controller.getAll();

        console.log(list);
        if (list == null || list.length == 0){
            res.status(204).json({
                message: "empty establishment"
            });
            return;
        }
        res.status(200).json({
            message: "List establishment",
            data: list
        });
    }

    async findOne(req: express.Request, res: express.Response){
        const id = Number(req.params.id);
        const establishment = await this.controller.getOne(id);
        
        if (establishment == null){
            res.status(204).end();
            return;
        }
        res.status(200).json({
            message: "Get establishment",
            data: establishment
        });
    }

    async delete(req: express.Request, res: express.Response){
        const id = Number(req.params.id);
        const establishment =  await this.controller.delete(id);

        if (!establishment){
            return res.status(404).end();
        }
        res.status(200).json({
            message: "Establishment deleted",
        });
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
