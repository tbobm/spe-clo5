import { IAddressService } from "../models/services/IAddressService";
import { AddressService } from "../models/services/AddressService";
import { AddressResource } from "./types/AddressResource";
import { Address } from "../models/entities/Address";
import { DomainAddress } from "../domain/entities/address";

export class AddressController {
    private addressService: IAddressService;

    constructor(){
        this.addressService = new AddressService();
    }

    async save(addressResource: AddressResource){
        const address = new Address();

        address.road = addressResource.road;
        address.city = addressResource.city;
        address.country = addressResource.country;
        address.postalCode = addressResource.postalCode;
        address.roadNumber = addressResource.roadNumber;
        const saved = await this.addressService.save(address);
        if (saved){
            const domain = new DomainAddress(saved);

            return {
                message: "address saved",
                data: domain
            };
        }
        return {
            message: "error on save"
        };
    }


    async update(addressResource: AddressResource){
        const address = new Address();

        address.id = addressResource.id;
        address.road = addressResource.road;
        address.city = addressResource.city;
        address.country = addressResource.country;
        address.postalCode = addressResource.postalCode;
        address.roadNumber = addressResource.roadNumber;
        const updated = await this.addressService.update(address);
        if (updated){
            const domain = new DomainAddress(updated);

            return {
                message: "address saved",
                data: domain
            };
        }
        return {
            message: "error on save"
        };
    }

    async delete(id: number){
        const flag = await this.addressService.delete(id);

        if (flag){
            return ({
                message: "address deleted",
                action: true
            });
        }
        else {
            return ({
                message: "error on delete"
            })
        }
    }

    async findOne(id: number){
        const address = await this.addressService.findOne(id);
        
        if (address){
            const domain = new DomainAddress(address);

            return ({
                message: "get address",
                data: domain
            });
        }
        else {
            return ({
                message: "failed to get address"
            });
        }
    }

    async getAll(){
        const list = await this.addressService.getAll();

        if (!list || !list.length){
            return ({
                message: "no content"
            });
        }
        const domains = [];
        for (let item of list){
            domains.push(new DomainAddress(item));
        }
        return ({
            message: "address list",
            data: domains
        });
    }

    hello(){
        return ("address");
    }
}