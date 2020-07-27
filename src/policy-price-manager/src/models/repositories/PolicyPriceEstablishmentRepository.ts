import { Repository, EntityManager, EntityMetadata, getManager, getConnection, EntityRepository } from "typeorm";
import { PolicyPriceEstablishment } from "../entities/PolicyPriceEstablishment";

@EntityRepository(PolicyPriceEstablishment)
export class PolicyPriceEstablishmentRepository extends Repository<PolicyPriceEstablishment> {
    public manager: EntityManager;
    public metadata: EntityMetadata;

    constructor(){
        super();

        this.manager = getManager(process.env.NODE_ENV || "development");
        this.metadata = getConnection(process.env.NODE_ENV || "development").getMetadata(PolicyPriceEstablishment);
    }
}