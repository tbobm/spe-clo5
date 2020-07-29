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
    id: {
        type: Number
    },
    postalCode: {
        type: Number,
        required: true
    },
    road: {
        type: String,
        required: true
    },
    roadNumber: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})(AddressResource);

export { DomainAddress, AddressResource };
