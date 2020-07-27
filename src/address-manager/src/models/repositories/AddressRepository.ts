import { Repository, EntityManager, EntityMetadata, getManager, getConnection, EntityRepository } from "typeorm";
import { Address } from "../entities/Address";

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
    public manager: EntityManager;
    public metadata: EntityMetadata;

    constructor(){
        super();
        this.manager = getManager(process.env.NODE_ENV || "development");
        this.metadata = getConnection(process.env.NODE_ENV || "development").getMetadata(Address);
    }
}