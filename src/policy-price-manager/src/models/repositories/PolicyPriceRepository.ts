import { Repository, EntityManager, EntityMetadata, getManager, getConnection, EntityRepository } from "typeorm";
import { PolicyPrice } from "../entities/PolicyPrice";

@EntityRepository(PolicyPrice)
export class PolicyPriceRepository extends Repository<PolicyPrice> {
    public manager: EntityManager;
    public metadata: EntityMetadata;

    constructor(){
        super();

        if (process.env.NODE_ENV === "test"){
            return;
        }
        this.manager = getManager(process.env.NODE_ENV || "development");
        this.metadata = getConnection(process.env.NODE_ENV || "development").getMetadata(PolicyPrice);
    }
}