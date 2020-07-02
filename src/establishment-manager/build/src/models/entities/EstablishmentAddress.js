"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Establishment_1 = require("./Establishment");
let EstablishmentAddress = class EstablishmentAddress {
};
__decorate([
    typeorm_1.Column({
        name: "establishment_id",
        primary: true,
    }),
    __metadata("design:type", Number)
], EstablishmentAddress.prototype, "establishmentId", void 0);
__decorate([
    typeorm_1.JoinColumn({
        name: "establishment_id",
        referencedColumnName: "id"
    }),
    typeorm_1.ManyToOne(type => Establishment_1.Establishment, es => es.addresses, {
        primary: true
    }),
    __metadata("design:type", Establishment_1.Establishment)
], EstablishmentAddress.prototype, "establishment", void 0);
__decorate([
    typeorm_1.Column({
        name: "address_id",
        primary: true
    }),
    __metadata("design:type", Number)
], EstablishmentAddress.prototype, "addressId", void 0);
EstablishmentAddress = __decorate([
    typeorm_1.Entity({
        name: "establishment_address"
    })
], EstablishmentAddress);
exports.EstablishmentAddress = EstablishmentAddress;
