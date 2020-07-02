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
const express_1 = __importDefault(require("express"));
const Route_1 = require("./Route");
const EMethod_1 = require("./EMethod");
const AddressController_1 = require("../controllers/AddressController");
class AddressRouter {
    constructor() {
        this.controller = new AddressController_1.AddressController();
        this.hello = this.hello.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.findOne = this.findOne.bind(this);
        this.getAll = this.getAll.bind(this);
    }
    hello(req, res) {
        res.end(this.controller.hello());
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = yield this.controller.save(req.body);
            if (!obj.data) {
                return (res.status(400).end());
            }
            res.status(201).json(obj);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = yield this.controller.delete(Number(req.params.id));
            if (obj.action) {
                delete obj.action;
                return (res.status(200).json(obj));
            }
            res.status(400).json(obj);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = yield this.controller.update(req.body);
            if (!obj.data) {
                return (res.status(400).json(obj));
            }
            return (res.status(200).json(obj));
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = yield this.controller.findOne(Number(req.params.id));
            if (!obj.data) {
                return (res.status(204).json(obj));
            }
            return (res.status(200).json(obj));
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = yield this.controller.getAll();
            return (res.status(200).json(obj));
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
exports.AddressRouter = AddressRouter;
