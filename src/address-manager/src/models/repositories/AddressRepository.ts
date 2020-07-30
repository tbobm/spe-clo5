import { Repository, EntityManager, EntityMetadata, getManager, getConnection, EntityRepository } from "typeorm";
import { Address } from "../entities/Address";

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
    public manager: EntityManager;
    public metadata: EntityMetadata;

    constructor(){
        super();

        if (process.env.NODE_ENV !== "test"){
            this.manager = getManager();
            this.metadata = getConnection().getMetadata(Address);
        }
    }
}