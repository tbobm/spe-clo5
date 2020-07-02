"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const establishment_address_1 = require("./establishment_address");
const establishment_service_1 = require("./establishment_service");
const { attributes } = require("structure");
const DomainEstablishment = attributes({
    id: Number,
    name: String,
    phoneNumber: String,
    addresses: {
        type: Array,
        itemType: establishment_address_1.DomainEstablishmentAddress
    },
    services: {
        type: Array,
        itemType: establishment_service_1.DomainEstablishmentService
    }
})(class DomainEstablishment {
});
exports.DomainEstablishment = DomainEstablishment;
