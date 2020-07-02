const { attributes } = require("structure");

class AddressResource {
    id: number;
    road: string;
    roadNumber: number;
    postalCode: number;
    city: string;
    country: string;

    toString(){
        return `${this.roadNumber} ${this.road} ${this.postalCode} ${this.city} ${this.country}`;
    }
}

const DomainAddress = attributes({
    id: Number,
    postalCode: Number,
    road: String,
    roadNumber: Number,
    city: String,
    country: String
})(AddressResource);

export { DomainAddress, AddressResource };
