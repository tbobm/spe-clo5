"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EMethod_1 = require("./EMethod");
class Route {
    constructor(method, url, handle) {
        this.method = method;
        this.url = url;
        this.handle = handle;
    }
    buildEndpoint(app) {
        if (this.method == EMethod_1.EMethod.GET) {
            app.get(this.url, this.handle);
        }
        else if (this.method == EMethod_1.EMethod.POST) {
            app.post(this.url, this.handle);
        }
        else if (this.method == EMethod_1.EMethod.PUT) {
            app.put(this.url, this.handle);
        }
        else if (this.method == EMethod_1.EMethod.DELETE) {
            app.delete(this.url, this.handle);
        }
    }
}
exports.Route = Route;
