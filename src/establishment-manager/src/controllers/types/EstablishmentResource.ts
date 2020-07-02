const { attributes } = require("structure");

class EstablishmentAddressResource{
    establishment_id: number;
    address_id: number;
    id: number;
    postalCode: number;
    city: string;
    country: string;
    road: string;
    roadNumber: number;
}

class EstablishmentServiceResource {
    establishment_id: number;
    service_id: number;
    model: number;
    interval: number;
    overridePrice: number
}

class EstablishmentResource {
    id: number;
    name: string;
    phoneNumber: string;
    addresses: Array<EstablishmentAddressResource>;
    services: Array<EstablishmentServiceResource>;
}

const DomainEstablishmentAddress = attributes({
    establishment_id: Number,
    address_id: Number,
    id: Number,
    postalCode: Number,
    city: String,
    country: String,
    road: String,
    roadNumber: Number
})(EstablishmentAddressResource);

const DomainEstablishmentService = attributes({
    establishment_id: Number,
    service_id: Number,
    model: Number,
    interval: Number,
    overridePrice: Number,
})(EstablishmentServiceResource)

const DomainEstablishment = attributes({
    id: Number,
    name: String,
    phoneNumber: String,
    addresses: {
        type: Array,
        itemType: DomainEstablishmentAddress
    },
    services: {
        type: Array,
        itemType: DomainEstablishmentService
    }
})(EstablishmentResource)

export {
    DomainEstablishment,
    EstablishmentResource,
    DomainEstablishmentService,
    EstablishmentServiceResource,
    DomainEstablishmentAddress,
    EstablishmentAddressResource
}