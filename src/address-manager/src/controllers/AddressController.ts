import { Address } from "../models/entities/Address";
import { DomainAddress, AddressResource } from "./types/AddressResource";
import { Route, Post, Body, Put, Delete, Path, Get, Controller } from "tsoa";
import { AddressService } from "../models/services/AddressService";

@Route("/")
export class AddressController extends Controller {
    private addressService: AddressService;

    constructor(addressService: AddressService){
        super();
        this.addressService = addressService;
    }

    @Post()
    async save(@Body() addressResource: AddressResource){
        const address = new Address();

        address.road = addressResource.road;
        address.city = addressResource.city;
        address.country = addressResource.country;
        address.postalCode = addressResource.postalCode;
        address.roadNumber = addressResource.roadNumber;
        const saved = await this.addressService.save(address);
        if (saved){
            const domain = new DomainAddress(saved);

            return Promise.resolve({
                message: "address saved",
                data: domain
            });
        }
        return Promise.resolve({
            message: "error on save"
        });
    }


    @Put()
    async update(@Body() addressResource: AddressResource){
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

            return Promise.resolve({
                message: "address saved",
                data: domain
            });
        }
        return Promise.resolve({
            message: "error on save"
        });
    }

    @Delete("{id}")
    async delete(@Path() id: number){
        const flag = await this.addressService.delete(id);

        if (flag){
            return Promise.resolve({
                message: "address deleted",
                action: true
            });
        }
        else {
            return Promise.resolve({
                message: "error on delete"
            })
        }
    }

    @Get("{id}")
    async findOne(@Path() id: number){
        const address = await this.addressService.findOne(id);
        
        if (address){
            const domain = new DomainAddress(address);

            return Promise.resolve({
                message: "get address",
                data: domain
            });
        }
        else {
            return Promise.resolve({
                message: "failed to get address"
            });
        }
    }

    @Get()
    async getAll(){
        const list = await this.addressService.getAll();

        if (!list || !list.length){
            return Promise.resolve({
                message: "no content"
            });
        }
        const domains = [];
        for (let item of list){
            domains.push(new DomainAddress(item));
        }
        return Promise.resolve({
            message: "address list",
            data: domains
        });
    }

    hello(){
        return Promise.resolve("address");
    }
}