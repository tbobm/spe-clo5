import { EPolicyPrice } from "./EPolicyPrice";

const { attributes } = require("structure");

class PeriodResource {
    id: number;
    from: number;
    to: number;
    sign: number;
    percent: number;
}

class PolicyPriceResource {
    id: number;
    key: EPolicyPrice;
    periods: Array<PeriodResource>;
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
    establishments: {
        type: Array,
        itemType: DomainPolicyPriceEstablishment
    }
})(PolicyPriceResource);

export {
    PeriodResource,
    PolicyPriceResource,
    DomainPeriod,
    DomainPolicyPrice,
    PolicyPriceEstablishmentResource,
    DomainPolicyPriceEstablishment
};
