const { attributes } = require("structure");

const DomainEstablishmentAddress = attributes({
    establishment_id: Number,
    address_id: Number,
})(
    class DomainEstablishmentAddress {

    }
);

export {
    DomainEstablishmentAddress
};