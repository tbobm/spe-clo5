import { IAddressService } from "./IAddressService";
import { Address } from "../entities/Address";
import { AddressRepository } from "../repositories/AddressRepository";

export class AddressService implements IAddressService {

    private addressRepository: AddressRepository;

    constructor(addressRepository: AddressRepository){
        this.addressRepository = addressRepository;
    }

    async findOne(id: number) {
        try {
            const address: Address = await this.addressRepository.findOne(id);
        
            return (address);
        }
        catch (e){
            return (null);
        }
    }

    getAll() {
        return (this.addressRepository.find());
    }

    async save(address: Address) {
        try {
            return (await this.addressRepository.save(address));
        }
        catch (e){
            return (null);
        }
    }

    async update(address: Address) {
        try {
            const finded = await this.addressRepository.findOne(address.id);

            if (!finded){
                return (null);
            }
            await this.addressRepository.update(address.id, address);
            return (address);
        }
        catch (e){
            return (null);
        }
    }

    async delete(id: number) {
        try {
            const address = await this.addressRepository.findOne(id);
            
            if (address){
                await this.addressRepository.delete(address.id);
                return (true);
            }
            return (false);
        }
        catch (e){
            return (false);
        }
    }

}