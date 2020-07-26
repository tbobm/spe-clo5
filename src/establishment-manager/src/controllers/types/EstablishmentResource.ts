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
    establishment_id: {
        type: Number,
    },
    address_id: {
        type: Number,
    },
    id: {
        type: Number,
    },
    postalCode: {
        type: Number,
        minLength: 5
    },
    city: {
        type: String, 
    },
    country: {
        type: String,
    },
    road: {
        type: String,
    },
    roadNumber: {
        type: Number,
    }
})(EstablishmentAddressResource);

const DomainEstablishmentService = attributes({
    establishment_id: Number,
    service_id: {
        type: Number,
        required: true
    },
    model: {
        type: Number,
        required: true
    },
    interval: {
        type: Number,
        required: true
    },
    overridePrice: {
        type: Number,
        required: false
    },
})(EstablishmentServiceResource)

const DomainEstablishment = attributes({
    id: Number,
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type:String,
        required: true,
        regex: /(\+33 )?([0-9][ -\.])?([0-9]{2}[ -\.]?)+/
    },
    addresses: {
        type: Array,
        itemType: DomainEstablishmentAddress,
        required: false
    },
    services: {
        type: Array,
        itemType: DomainEstablishmentService,
        required: false
    },
    policyPrices: {
        type: Array,
        itemType: DomainEstablishmentPolicy,
        required: false
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