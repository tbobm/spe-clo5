import { Repository, EntityManager, EntityMetadata, getManager, getConnection, EntityRepository } from "typeorm";
import { PolicyPricePeriod } from "../entities/PolicyPricePeriod";

@EntityRepository(PolicyPricePeriod)
export class PolicyPricePeriodRepository extends Repository<PolicyPricePeriod> {
    public manager: EntityManager;
    public metadata: EntityMetadata;
    
    constructor(){
        super();
        this.manager = getManager(process.env.NODE_ENV || "development");
        this.metadata = getConnection(process.env.NODE_ENV || "development").getMetadata(PolicyPricePeriod);
    }
}