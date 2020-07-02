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
const EstablishmentServiceImpl_1 = require("../models/services/EstablishmentServiceImpl");
const Establishment_1 = require("../models/entities/Establishment");
const EstablishmentAddress_1 = require("../models/entities/EstablishmentAddress");
const EstablishmentService_1 = require("../models/entities/EstablishmentService");
const establishment_1 = require("../domain/entities/establishment");
class EstablishmentController {
    constructor() {
        this.esService = new EstablishmentServiceImpl_1.EstablishmentServiceImpl();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const domains = [];
            const list = yield this.esService.getAll();
            for (let item of list) {
                const o = {};
                o.name = item.name;
                o.id = item.id;
                o.phoneNumber = item.phoneNumber;
                o.addresses = [];
                o.services = [];
                item.addresses.forEach((addr) => {
                    o.addresses.push({
                        address_id: addr.addressId,
                        establishment_id: addr.establishmentId
                    });
                });
                item.services.forEach((serv) => {
                    o.services.push({
                        service_id: serv.serviceId,
                        establishment_id: serv.establishmentId,
                        model: serv.model,
                        overridePrice: serv.overridePrice,
                        interval: serv.interval
                    });
                });
                domains.push(new establishment_1.DomainEstablishment(o));
            }
            return (domains);
        });
    }
    hello() {
        return ("establishment");
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const establishment = yield this.esService.getOne(id);
            const o = {};
            o.name = establishment.name;
            o.id = establishment.id;
            o.phoneNumber = establishment.phoneNumber;
            o.addresses = [];
            o.services = [];
            establishment.addresses.forEach((addr) => {
                o.addresses.push({
                    address_id: addr.addressId,
                    establishment_id: addr.establishmentId
                });
            });
            establishment.services.forEach((serv) => {
                o.services.push({
                    service_id: serv.serviceId,
                    establishment_id: serv.establishmentId,
                    model: serv.model,
                    overridePrice: serv.overridePrice,
                    interval: serv.interval
                });
            });
            return (new establishment_1.DomainEstablishment(o));
        });
    }
    save(domainEstablishment) {
        return __awaiter(this, void 0, void 0, function* () {
            const establishment = new Establishment_1.Establishment();
            establishment.name = domainEstablishment.name;
            establishment.phoneNumber = domainEstablishment.phoneNumber;
            if (!domainEstablishment.addresses) {
                domainEstablishment.addresses = [];
            }
            establishment.addresses = domainEstablishment.addresses.map((addr) => {
                const esAddress = new EstablishmentAddress_1.EstablishmentAddress();
                esAddress.addressId = addr.address_id;
                esAddress.establishment = establishment;
                return (esAddress);
            });
            if (!domainEstablishment.services) {
                domainEstablishment.services = [];
            }
            establishment.services = domainEstablishment.services.map((serv) => {
                const esService = new EstablishmentService_1.EstablishmentService();
                esService.serviceId = serv.service_id;
                esService.establishment = establishment;
                esService.interval = serv.interval;
                esService.model = serv.interval;
                esService.overridePrice = serv.overridePrice;
                return (esService);
            });
            const saved = yield this.esService.save(establishment);
            const o = {};
            o.name = saved.name;
            o.id = saved.id;
            o.phoneNumber = saved.phoneNumber;
            o.addresses = [];
            o.services = [];
            saved.addresses.forEach((addr) => {
                o.addresses.push({
                    address_id: addr.addressId,
                    establishment_id: addr.establishmentId
                });
            });
            saved.services.forEach((serv) => {
                o.services.push({
                    service_id: serv.serviceId,
                    establishment_id: serv.establishmentId,
                    model: serv.model,
                    overridePrice: serv.overridePrice,
                    interval: serv.interval
                });
            });
            const savedEs = new establishment_1.DomainEstablishment(o);
            return (savedEs);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const establishment = yield this.esService.getOne(id);
            if (establishment == null) {
                return (null);
            }
            return (this.esService.delete(id));
        });
    }
    update(domainEstablishment) {
        return __awaiter(this, void 0, void 0, function* () {
            const establishment = new Establishment_1.Establishment();
            establishment.id = domainEstablishment.id;
            establishment.name = domainEstablishment.name;
            establishment.phoneNumber = domainEstablishment.phoneNumber;
            if (!domainEstablishment.addresses) {
                domainEstablishment.addresses = [];
            }
            yield this.esService.deleteAddress(establishment.id);
            establishment.addresses = domainEstablishment.addresses.map((addr) => {
                const esAddress = new EstablishmentAddress_1.EstablishmentAddress();
                esAddress.addressId = addr.address_id;
                esAddress.establishment = establishment;
                return (esAddress);
            });
            if (!domainEstablishment.services) {
                domainEstablishment.services = [];
            }
            yield this.esService.deleteService(establishment.id);
            establishment.services = domainEstablishment.services.map((serv) => {
                const esService = new EstablishmentService_1.EstablishmentService();
                esService.serviceId = serv.service_id;
                esService.establishment = establishment;
                esService.model = serv.model;
                esService.interval = serv.interval;
                esService.overridePrice = serv.overridePrice;
                return (esService);
            });
            const saved = yield this.esService.update(establishment);
            const o = {};
            o.name = saved.name;
            o.id = saved.id;
            o.phoneNumber = saved.phoneNumber;
            o.addresses = [];
            o.services = [];
            saved.addresses.forEach((addr) => {
                o.addresses.push({
                    address_id: addr.addressId,
                    establishment_id: addr.establishmentId
                });
            });
            saved.services.forEach((serv) => {
                o.services.push({
                    service_id: serv.serviceId,
                    establishment_id: serv.establishmentId,
                    overridePrice: serv.overridePrice,
                    model: serv.model,
                    interval: serv.interval
                });
            });
            const savedEs = new establishment_1.DomainEstablishment(o);
            return (savedEs);
        });
    }
}
exports.EstablishmentController = EstablishmentController;
