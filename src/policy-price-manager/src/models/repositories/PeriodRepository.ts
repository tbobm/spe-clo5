import { Repository, EntityManager, EntityMetadata, getManager, getConnection, EntityRepository } from "typeorm";
import { Period } from "../entities/Period";

@EntityRepository(Period)
export class PeriodRepository extends Repository<Period> {
    manager: EntityManager;
    metadata: EntityMetadata;

    constructor(){
        super();
        
        if (process.env.NODE_ENV === "test"){
            return;
        }
        this.manager = getManager();
        this.metadata = getConnection().getMetadata(Period);
    }

}