const { attributes } = require("structure");

const DomainAddress = attributes({
    id: Number,
    postalCode: Number,
    road: String,
    roadNumber: Number,
    city: String,
    country: String
})(
    class DomainAddress {
        toString(address: any){
            return `${address.roadNumber} ${address.road} ${address.postalCode} ${address.city} ${address.country}`;
        }
    }
);

export { DomainAddress };
