enum EPolicyPrice {
    NIGHT_MAJOR_15_PERCENT = "NIGHT_MAJOR_15_PERCENT",
    NIGHT_MINOR_1O_PERCENT = "NIGHT_MINOR_1O_PERCENT"
}

enum EKeyPolicy {
    NIGHT_MAJOR_15_PERCENT = 1,
    NIGHT_MINOR_1O_PERCENT = 2
}

const DTOKeyPolicyPrice: any = {
    1: "NIGHT_MAJOR_15_PERCENT",
    2: "NIGHT_MINOR_1O_PERCENT"
};

const DTOPolicyPriceKey: any = {
    "NIGHT_MAJOR_15_PERCENT": 1,
    "NIGHT_MINOR_1O_PERCENT": 2
};

export {
    EKeyPolicy,
    EPolicyPrice,
    DTOKeyPolicyPrice,
    DTOPolicyPriceKey
};
