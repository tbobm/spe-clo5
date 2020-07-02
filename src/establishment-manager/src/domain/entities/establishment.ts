import { DomainEstablishmentAddress } from "./establishment_address";
import { DomainEstablishmentService } from "./establishment_service";

const { attributes } = require("structure");

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
    }
})(
    class DomainEstablishment {

    }
);

export { DomainEstablishment };
