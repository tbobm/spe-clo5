import { EPolicyPrice } from "./EPolicyPrice";

const { attributes } = require("structure");

class PeriodResource {
    id: number;
    from: number;
    to: number;
    sign: number;
    percent: number;
}

class PersonResource {
    id: number;
    nb: number;
    percent: number;
    sign: number;
}

class PolicyPriceResource {
    id: number;
    key: EPolicyPrice;
    periods: Array<PeriodResource>;
    persons: Array<PersonResource>;
    establishments: Array<PolicyPriceEstablishmentResource>;
}

class PolicyPriceEstablishmentResource {
    policyPriceId: number;
    establishmentId: number;
}

const DomainPeriod = attributes({
    id: {
        type: Number
    },
    from: {
        type: Number,
        required: true
    },
    to: {
        type: Number,
        required: true
    },
    sign: {
        type: Number,
        required: true
    },
    percent: {
        type: Number,
        required: true
    }
})(PeriodResource);

const DomainPerson = attributes({
    id: {
        type: Number
    },
    nb: {
        type: Number,
        required: true
    },
    sign: {
        type: Number,
        required: true
    },
    percent: {
        type: Number,
        required: true
    }
})(PersonResource);

const DomainPolicyPriceEstablishment = attributes({
    policyPriceId: {
        type: Number,
    },
    establishmentId: {
        type: Number,
        required: true
    },
})(PolicyPriceEstablishmentResource);

const DomainPolicyPrice = attributes({
    id: Number,
    key: {
        type: String,
        required: true
    },
    periods: {
        type: Array,
        itemType: DomainPeriod
    },
    persons: {
        type: Array,
        itemType: DomainPerson
    },
    establishments: {
        type: Array,
        itemType: DomainPolicyPriceEstablishment
    }
})(PolicyPriceResource);

export {
    PeriodResource,
    PersonResource,
    PolicyPriceResource,
    DomainPeriod,
    DomainPolicyPrice,
    DomainPerson,
    PolicyPriceEstablishmentResource,
    DomainPolicyPriceEstablishment
};
