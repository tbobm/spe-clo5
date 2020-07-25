import { Address } from "../entities/Address";

export abstract class IAddressService {
    abstract findOne(id: number): any;
    abstract getAll(): any;
    abstract save(address: Address): any;
    abstract update(address: Address): any;
    abstract delete(id: number): any;
}