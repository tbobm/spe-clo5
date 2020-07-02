"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { attributes } = require("structure");
const DomainEstablishmentService = attributes({
    establishment_id: Number,
    service_id: Number,
    model: Number,
    interval: Number,
    overridePrice: Number
})(class DomainEstablishmentService {
});
exports.DomainEstablishmentService = DomainEstablishmentService;
