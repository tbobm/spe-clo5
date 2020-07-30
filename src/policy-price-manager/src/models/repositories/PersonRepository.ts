import { Repository, EntityManager, EntityMetadata, getManager, getConnection, EntityRepository } from "typeorm";
import { Person } from "../entities/Person";

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
    public manager : EntityManager;
    public metadata : EntityMetadata;
    
    constructor(){
        super();
        
        if (process.env.NODE_ENV === "test"){
            return;
        }
        this.manager = getManager();
        this.metadata = getConnection().getMetadata(Person);
    }
}