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

class PeriodResource {
    id: number;
    from: number;
    to: number;
    sign: number;
    percent: number;
}

const DomainPeriod = attributes({
    id: Number,
    from: Number,
    to: Number,
    sign: Number,
    percent: Number
})(PeriodResource);

class EstablishmentPolicyPriceResource {
    id: number;
    key: string;
    periods: Array<PeriodResource>;
}

class EstablishmentResource {
    id: number;
    name: string;
    phoneNumber: string;
    addresses: Array<EstablishmentAddressResource>;
    services: Array<EstablishmentServiceResource>;
    policyPrices: EstablishmentPolicyPriceResource;
}

const DomainEstablishmentPolicy = attributes({
    id: Number,
    key: String,
    periods: {
        type: Array,
        itemType: DomainPeriod
    }
})(EstablishmentPolicyPriceResource);

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
    },
    policyPrices: {
        type: Array,
        itemType: DomainEstablishmentPolicy
    }
})(EstablishmentResource)

export {
    DomainEstablishment,
    EstablishmentResource,
    DomainEstablishmentService,
    EstablishmentServiceResource,
    DomainEstablishmentAddress,
    EstablishmentAddressResource,
    EstablishmentPolicyPriceResource,
    DomainEstablishmentPolicy,
    DomainPeriod,
    PeriodResource
}