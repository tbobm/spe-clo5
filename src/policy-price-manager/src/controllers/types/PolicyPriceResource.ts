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
    id: Number,
    from: Number,
    to: Number,
    sign: Number,
    percent: Number
})(PeriodResource);

const DomainPerson = attributes({
    id: Number,
    nb: Number,
    sign: Number,
    percent: Number
})(PersonResource);

const DomainPolicyPriceEstablishment = attributes({
    policyPriceId: Number,
    establishmentId: Number,
})(PolicyPriceEstablishmentResource);

const DomainPolicyPrice = attributes({
    id: Number,
    key: String,
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
