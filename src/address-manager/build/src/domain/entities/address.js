"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { attributes } = require("structure");
const DomainAddress = attributes({
    id: Number,
    postalCode: Number,
    road: String,
    roadNumber: Number,
    city: String,
    country: String
})(class DomainAddress {
    toString(address) {
        return `${address.roadNumber} ${address.road} ${address.postalCode} ${address.city} ${address.country}`;
    }
});
exports.DomainAddress = DomainAddress;
