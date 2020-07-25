import express from "express";
import { Route } from "./Route";
import { EMethod } from "./EMethod";
import { PolicyPriceController } from "../controllers/PolicyPriceController";
import { DomainPolicyPrice } from "../controllers/types/PolicyPriceResource";

export class PolicyPriceRouter {

    private controller: PolicyPriceController;

    constructor(){
        this.controller = new PolicyPriceController();

        this.hello = this.hello.bind(this);
        this.save = this.save.bind(this);
        this.getAll = this.getAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.findByEstablishment = this.findByEstablishment.bind(this);
    }


    hello(req: express.Request, res: express.Response){
        res.end(this.controller.hello());
    }

    async findByEstablishment(req: express.Request, res: express.Response){
        const finded = await this.controller.findByEstablishment(Number(req.params.id));

        res.status(finded.httpCode).json(finded);
    }

    async save(req: express.Request, res: express.Response){
        const domainPolicyPrice = new DomainPolicyPrice(req.body); 
        const saved = await this.controller.save(domainPolicyPrice);

        res.status(saved.httpCode).json(saved);
    }

    async update(req: express.Request, res: express.Response){
        const domainPolicyPrice = new DomainPolicyPrice(req.body); 
        const saved = await this.controller.update(domainPolicyPrice);

        res.status(saved.httpCode).json(saved);
    }

    async getAll(req: express.Request, res: express.Response){
        const o = await this.controller.getAll();

        res.status(o.httpCode).json(o.data);
    }

    async findOne(req: express.Request, res: express.Response){
        const o = await this.controller.findOne(Number(req.params.id));

        res.status(o.httpCode).json(o);
    }

    async delete(req: express.Request, res: express.Response){
        const o = await this.controller.delete(Number(req.params.id));

        res.status(o.httpCode).json(o);
    }

    toRouter(){
        const router = express.Router();

        new Route(EMethod.GET, "/establishment/:id", this.findByEstablishment).buildEndpoint(router);
        new Route(EMethod.GET, "/hello", this.hello).buildEndpoint(router);
        new Route(EMethod.POST, "/", this.save).buildEndpoint(router);
        new Route(EMethod.PUT, "/", this.update).buildEndpoint(router);
        new Route(EMethod.GET, "/:id", this.findOne).buildEndpoint(router);
        new Route(EMethod.GET, "/", this.getAll).buildEndpoint(router);
        new Route(EMethod.DELETE, "/:id", this.delete).buildEndpoint(router);
        return (router);
    }

}
