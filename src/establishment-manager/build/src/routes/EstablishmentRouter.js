"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstablishmentController_1 = require("../controllers/EstablishmentController");
const express_1 = __importDefault(require("express"));
const Route_1 = require("./Route");
const EMethod_1 = require("./EMethod");
const establishment_1 = require("../domain/entities/establishment");
class EstablishmentRouter {
    constructor() {
        this.controller = new EstablishmentController_1.EstablishmentController();
        this.hello = this.hello.bind(this);
        this.save = this.save.bind(this);
        this.getAll = this.getAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }
    hello(req, res) {
        res.end(this.controller.hello());
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const domainEstablishment = new establishment_1.DomainEstablishment(req.body);
            const saved = yield this.controller.save(domainEstablishment);
            res.status(201).json({
                message: "Establishment saved",
                data: saved
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const domainEstablishment = new establishment_1.DomainEstablishment(req.body);
            const saved = yield this.controller.update(domainEstablishment);
            res.status(200).json({
                message: "Establishment updated",
                data: saved
            });
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.controller.getAll();
            console.log(list);
            if (list == null || list.length == 0) {
                res.status(204).json({
                    message: "empty establishment"
                });
                return;
            }
            res.status(200).json({
                message: "List establishment",
                data: list
            });
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const establishment = yield this.controller.getOne(id);
            if (establishment == null) {
                res.status(204).end();
                return;
            }
            res.status(200).json({
                message: "Get establishment",
                data: establishment
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const establishment = yield this.controller.delete(id);
            if (!establishment) {
                return res.status(404).end();
            }
            res.status(200).json({
                message: "Establishment deleted",
            });
        });
    }
    toRouter() {
        const router = express_1.default.Router();
        new Route_1.Route(EMethod_1.EMethod.GET, "/hello", this.hello).buildEndpoint(router);
        new Route_1.Route(EMethod_1.EMethod.POST, "/", this.save).buildEndpoint(router);
        new Route_1.Route(EMethod_1.EMethod.PUT, "/", this.update).buildEndpoint(router);
        new Route_1.Route(EMethod_1.EMethod.GET, "/:id", this.findOne).buildEndpoint(router);
        new Route_1.Route(EMethod_1.EMethod.GET, "/", this.getAll).buildEndpoint(router);
        new Route_1.Route(EMethod_1.EMethod.DELETE, "/:id", this.delete).buildEndpoint(router);
        return (router);
    }
}
exports.EstablishmentRouter = EstablishmentRouter;
