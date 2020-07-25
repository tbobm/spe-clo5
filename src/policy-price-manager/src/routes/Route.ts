import { EMethod } from "./EMethod";
import express from "express";

export class Route {
    private method: EMethod;
    private url: string;
    private handle: (req: express.Request, res: express.Response) => any;

    constructor(method: EMethod, url: string, handle: (req: express.Request, res: express.Response) => any){
        this.method = method;
        this.url = url;
        this.handle = handle;
    }

    buildEndpoint(app: express.Router){
        if (this.method == EMethod.GET){
            app.get(this.url, this.handle);
        }
        else if (this.method == EMethod.POST){
            app.post(this.url, this.handle);
        }
        else if (this.method == EMethod.PUT){
            app.put(this.url, this.handle);
        }
        else if (this.method == EMethod.DELETE){
            app.delete(this.url, this.handle);
        }
    }

}

