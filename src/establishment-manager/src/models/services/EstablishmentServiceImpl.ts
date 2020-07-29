import { Establishment } from "../entities/Establishment";
import { EstablishmentAddress } from "../entities/EstablishmentAddress";
import { EstablishmentRepository } from "../repositories/EstablishmentRepository";

export class EstablishmentServiceImpl {

    private establishmentRepository: EstablishmentRepository;

    constructor(establishmentRepository: EstablishmentRepository){
        this.establishmentRepository = establishmentRepository;
    }

    async getAll(){
        const list =  (await this.establishmentRepository.find({
            relations: [
                "addresses",
            ]
        }));

        return (list);
    }

    async save(establishment: Establishment){
        const saved = await this.establishmentRepository.save(establishment);
    
        return (saved);
    }

    async getOne(id: number){
        const establishment = await this.establishmentRepository.findOne(id, {
            relations: [
                "addresses",
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

    async update(es: Establishment){
        return (await this.establishmentRepository.save(es));
    }

}
