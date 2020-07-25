import express from "express";

export abstract class Middleware {
    constructor(){

    }

    abstract use(req: express.Request, res: express.Response): any;

}
