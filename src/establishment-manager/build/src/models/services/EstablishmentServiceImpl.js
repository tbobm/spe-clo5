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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Establishment_1 = require("../entities/Establishment");
const EstablishmentAddress_1 = require("../entities/EstablishmentAddress");
const EstablishmentService_1 = require("../entities/EstablishmentService");
class EstablishmentServiceImpl {
    constructor() {
        this.establishmentRepository = typeorm_1.getRepository(Establishment_1.Establishment, process.env.NODE_ENV || "development");
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.establishmentRepository.find({
                relations: [
                    "addresses",
                    "services"
                ]
            }));
        });
    }
    save(establishment) {
        return __awaiter(this, void 0, void 0, function* () {
            const saved = yield this.establishmentRepository.save(establishment);
            return (saved);
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const establishment = yield this.establishmentRepository.findOne(id, {
                relations: [
                    "addresses",
                    "services"
                ]
            });
            return (establishment);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.establishmentRepository.delete(id));
        });
    }
    deleteAddress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.establishmentRepository.createQueryBuilder().from(EstablishmentAddress_1.EstablishmentAddress, "ea").delete().where("establishment_address.establishment_id = :id", {
                "id": id
            }).execute());
        });
    }
    deleteService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.establishmentRepository.createQueryBuilder().from(EstablishmentService_1.EstablishmentService, "es").delete().where("establishment_service.establishment_id = :id", {
                "id": id
            }).execute());
        });
    }
    update(es) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.establishmentRepository.save(es));
        });
    }
}
exports.EstablishmentServiceImpl = EstablishmentServiceImpl;
