import { Repository, EntityManager, EntityMetadata, getManager, getConnection, EntityRepository } from "typeorm";
import { Establishment } from "../entities/Establishment";

@EntityRepository(Establishment)
export class EstablishmentRepository extends Repository<Establishment> {
    public manager: EntityManager;
    public metadata: EntityMetadata;
    
    constructor(){
        super();
        this.manager = getManager(process.env.NODE_ENV || "development");
        this.metadata = getConnection(process.env.NODE_ENV || "development").getMetadata(Establishment);
    }
}