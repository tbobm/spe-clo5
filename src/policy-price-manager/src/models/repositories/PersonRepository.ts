import { Repository, EntityManager, EntityMetadata, getManager, getConnection, EntityRepository } from "typeorm";
import { Person } from "../entities/Person";

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
    public manager : EntityManager;
    public metadata : EntityMetadata;
    
    constructor(){
        super();

        this.manager = getManager(process.env.NODE_ENV || "development");
        this.metadata = getConnection(process.env.NODE_ENV || "development").getMetadata(Person);
    }
}