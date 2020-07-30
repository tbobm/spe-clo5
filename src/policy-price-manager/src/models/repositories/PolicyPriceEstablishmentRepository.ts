import { Repository, EntityManager, EntityMetadata, getManager, getConnection, EntityRepository } from "typeorm";
import { PolicyPriceEstablishment } from "../entities/PolicyPriceEstablishment";

@EntityRepository(PolicyPriceEstablishment)
export class PolicyPriceEstablishmentRepository extends Repository<PolicyPriceEstablishment> {
    public manager: EntityManager;
    public metadata: EntityMetadata;

    constructor(){
        super();
        
        if (process.env.NODE_ENV === "test"){
            return;
        }
        this.manager = getManager();
        this.metadata = getConnection().getMetadata(PolicyPriceEstablishment);
    }
}