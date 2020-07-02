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
const Address_1 = require("../entities/Address");
class AddressService {
    constructor() {
        this.addressRepository = typeorm_1.getRepository(Address_1.Address, process.env.NODE_ENV || "development");
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield this.addressRepository.findOne(id);
                return (address);
            }
            catch (e) {
                return (null);
            }
        });
    }
    getAll() {
        return (this.addressRepository.find());
    }
    save(address) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.addressRepository.save(address));
            }
            catch (e) {
                return (null);
            }
        });
    }
    update(address) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const finded = yield this.addressRepository.findOne(address.id);
                if (!finded) {
                    return (null);
                }
                yield this.addressRepository.update(address.id, address);
                return (address);
            }
            catch (e) {
                return (null);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield this.addressRepository.findOne(id);
                if (address) {
                    yield this.addressRepository.delete(address.id);
                    return (true);
                }
                return (false);
            }
            catch (e) {
                return (false);
            }
        });
    }
}
exports.AddressService = AddressService;
