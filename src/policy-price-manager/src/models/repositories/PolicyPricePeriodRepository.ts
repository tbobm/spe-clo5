import { Repository, EntityManager, EntityMetadata, getManager, getConnection, EntityRepository } from "typeorm";
import { PolicyPricePeriod } from "../entities/PolicyPricePeriod";

@EntityRepository(PolicyPricePeriod)
export class PolicyPricePeriodRepository extends Repository<PolicyPricePeriod> {
    public manager: EntityManager;
    public metadata: EntityMetadata;
    
    constructor(){
        super();

        if (process.env.NODE_ENV === "test"){
            return;
        }
        this.manager = getManager();
        this.metadata = getConnection().getMetadata(PolicyPricePeriod);
    }
}