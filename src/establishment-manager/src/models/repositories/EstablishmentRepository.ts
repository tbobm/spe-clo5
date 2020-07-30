import { Repository, EntityManager, EntityMetadata, getManager, getConnection, EntityRepository } from "typeorm";
import { Establishment } from "../entities/Establishment";

@EntityRepository(Establishment)
export class EstablishmentRepository extends Repository<Establishment> {
    public manager: EntityManager;
    public metadata: EntityMetadata;
    
    constructor(){
        super();
        if (process.env.NODE_ENV === "test"){
            return;
        }
        this.manager = getManager();
        this.metadata = getConnection().getMetadata(Establishment);
    }
}