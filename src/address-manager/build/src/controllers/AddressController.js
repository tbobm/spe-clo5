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
const AddressService_1 = require("../models/services/AddressService");
const Address_1 = require("../models/entities/Address");
const address_1 = require("../domain/entities/address");
class AddressController {
    constructor() {
        this.addressService = new AddressService_1.AddressService();
    }
    save(addressResource) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = new Address_1.Address();
            address.road = addressResource.road;
            address.city = addressResource.city;
            address.country = addressResource.country;
            address.postalCode = addressResource.postalCode;
            address.roadNumber = addressResource.roadNumber;
            const saved = yield this.addressService.save(address);
            if (saved) {
                const domain = new address_1.DomainAddress(saved);
                return {
                    message: "address saved",
                    data: domain
                };
            }
            return {
                message: "error on save"
            };
        });
    }
    update(addressResource) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = new Address_1.Address();
            address.id = addressResource.id;
            address.road = addressResource.road;
            address.city = addressResource.city;
            address.country = addressResource.country;
            address.postalCode = addressResource.postalCode;
            address.roadNumber = addressResource.roadNumber;
            const updated = yield this.addressService.update(address);
            if (updated) {
                const domain = new address_1.DomainAddress(updated);
                return {
                    message: "address saved",
                    data: domain
                };
            }
            return {
                message: "error on save"
            };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const flag = yield this.addressService.delete(id);
            if (flag) {
                return ({
                    message: "address deleted",
                    action: true
                });
            }
            else {
                return ({
                    message: "error on delete"
                });
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.addressService.findOne(id);
            if (address) {
                const domain = new address_1.DomainAddress(address);
                return ({
                    message: "get address",
                    data: domain
                });
            }
            else {
                return ({
                    message: "failed to get address"
                });
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.addressService.getAll();
            if (!list || !list.length) {
                return ({
                    message: "no content"
                });
            }
            const domains = [];
            for (let item of list) {
                domains.push(new address_1.DomainAddress(item));
            }
            return ({
                message: "address list",
                data: domains
            });
        });
    }
    hello() {
        return ("address");
    }
}
exports.AddressController = AddressController;
