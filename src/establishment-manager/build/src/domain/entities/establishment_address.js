"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { attributes } = require("structure");
const DomainEstablishmentAddress = attributes({
    establishment_id: Number,
    address_id: Number,
})(class DomainEstablishmentAddress {
});
exports.DomainEstablishmentAddress = DomainEstablishmentAddress;
