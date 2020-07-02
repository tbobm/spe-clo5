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
const EstablishmentRouter_1 = require("./routes/EstablishmentRouter");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
class Application {
    constructor() {
        dotenv_1.config();
        this.app = express_1.default();
        this.config();
    }
    config() {
        const bodyParser = require("body-parser");
        this.app.use(bodyParser.json());
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const connection = yield typeorm_1.createConnection(process.env.NODE_ENV || "development");
                const establishmentRouter = new EstablishmentRouter_1.EstablishmentRouter();
                yield connection.runMigrations({
                    transaction: "all"
                });
                this.app.use(establishmentRouter.toRouter());
                this.app.listen(Number(process.env.PORT), process.env.BIND_ADDRESS, () => {
                    console.log(`The application is started on port ${process.env.PORT}`);
                    resolve(connection);
                });
            }));
        });
    }
}
exports.Application = Application;
