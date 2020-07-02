import { Repository, getRepository } from "typeorm";
import { Establishment } from "../entities/Establishment";
import { EstablishmentAddress } from "../entities/EstablishmentAddress";
import { EstablishmentService } from "../entities/EstablishmentService";

export class EstablishmentServiceImpl {

    private establishmentRepository: Repository<Establishment>;

    constructor(){
        this.establishmentRepository = getRepository(Establishment, process.env.NODE_ENV || "development");
    }

    async getAll(){
        return (await this.establishmentRepository.find({
            relations: [
                "addresses",
                "services"
            ]
        }));
    }

    async save(establishment: Establishment){
        const saved = await this.establishmentRepository.save(establishment);
    
        return (saved);
    }

    async getOne(id: number){
        const establishment = await this.establishmentRepository.findOne(id, {
            relations: [
                "addresses",
                "services"
            ]
        });

        return (establishment);
    }

    async delete(id: number){
        return (await this.establishmentRepository.delete(id));
    }

    async deleteAddress(id: number){
        return (await this.establishmentRepository.createQueryBuilder().from(EstablishmentAddress, "ea").delete().where("establishment_address.establishment_id = :id", {
            "id": id
        }).execute());
    }

    async deleteService(id: number){
        return (await this.establishmentRepository.createQueryBuilder().from(EstablishmentService, "es").delete().where("establishment_service.establishment_id = :id", {
            "id": id
        }).execute());
    }

    async update(es: Establishment){
        return (await this.establishmentRepository.save(es));
    }

}