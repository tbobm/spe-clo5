import { EstablishmentServiceImpl } from "../models/services/EstablishmentServiceImpl";
import { Establishment } from "../models/entities/Establishment";
import { EstablishmentResource, DomainEstablishment } from "./types/EstablishmentResource";
import { EstablishmentAddress } from "../models/entities/EstablishmentAddress";
import { AddressService } from "../models/services/AddressService";
import { PolicyPriceService } from "../models/services/PolicyPriceService";
import { Route, Get, Path, Post, Body, Delete, Put } from "tsoa";

@Route("/")
export class EstablishmentController {

    private esService: EstablishmentServiceImpl;
    private addressService: AddressService;
    private policyPriceService: PolicyPriceService;

    constructor(establishmentService: EstablishmentServiceImpl){
        this.esService = establishmentService;
        this.addressService = new AddressService();
        this.policyPriceService = new PolicyPriceService();
    }

    @Get()
    async getAll(){
        const domains = [];
        let list = await this.esService.getAll();

        if (!list){
            list = [];
        }
        for (let item of list){
            const o :any = {};

            o.name = item.name;
            o.id = item.id;
            o.phoneNumber = item.phoneNumber;
            o.addresses = [];
            const fetch = ((saved: Establishment) => {
                return (new Promise(async (resolve, reject) => {
                    let list = item.addresses;

                    if (!list || !list.length){
                        resolve();
                        return;
                    }
                    for (let addr of list){
                        try {
                            const response = await this.addressService.findOne(addr.addressId);
            
                            if (response.status === 200){
                                o.addresses.push(response.data.data);
                            }
                            else {
                                o.addresses.push({
                                    address_id: addr.addressId,
                                    establishment_id: addr.establishmentId
                                });
                            }
                        }
                        catch (e){
                            o.addresses.push({
                                address_id: addr.addressId,
                                establishment_id: addr.establishmentId
                            });
                        }
                        if (o.addresses.length == saved.addresses.length){
                            return resolve();
                        }
                    }
                }));
            });
            await fetch(item);
            const response = await this.policyPriceService.findOne(item.id);
            if (response && response.status == 200){
                const policyPrices = response.data.data;

                if (policyPrices && policyPrices.length){
                    o.policyPrices = policyPrices;
                }
            }
            domains.push(new DomainEstablishment(o));
        }
        if (domains.length == 0){
            return Promise.resolve({
                message: "empty establishment",
                httpCode: 204
            });
        }
        return Promise.resolve({
            message: "List establishment",
            data: domains,
            httpCode: 200
        });
    }

    @Get("hello")
    hello(){
        return Promise.resolve("establishment");
    }

    @Get("{id}")
    async getOne(@Path("id") id: number){
        const establishment = await this.esService.getOne(id);
        const o :any = {};

        if (establishment == null){
            return Promise.resolve({
                message: "no content",
                httpCode: 204
            });
        }
        o.name = establishment.name;
        o.id = establishment.id;
        o.phoneNumber = establishment.phoneNumber;
        o.addresses = [];
        const fetch = ((saved: Establishment) => {
            return (new Promise(async (resolve, reject) => {
                const list = saved.addresses;

                if (!list || !list.length){
                    resolve();
                    return;
                }
                for (let addr of list){
                    try {
                        const response = await this.addressService.findOne(addr.addressId);
        
                        if (response && response.status === 200){
                            o.addresses.push(response.data.data);
                        }
                        else {
                            o.addresses.push({
                                address_id: addr.addressId,
                                establishment_id: addr.establishmentId
                            });
                        }
                    }
                    catch (e){
                        o.addresses.push({
                            address_id: addr.addressId,
                            establishment_id: addr.establishmentId
                        });
                    }
                    if (o.addresses.length == saved.addresses.length){
                        return resolve();
                    }
                }
            }));
        });
        await fetch(establishment);
        const response = await this.policyPriceService.findOne(id);
        if (response && response.status === 200){
            const policyPrices = response.data.data;

            if (policyPrices && policyPrices.length){
                o.policyPrices = policyPrices;
            }
        }
        const e = new DomainEstablishment(o);
        return Promise.resolve({
            message: "Get establishment",
            data: e,
            httpCode: 200
        })
    }

    @Post()
    async save(@Body() domainEstablishment: EstablishmentResource){
        const establishment = new Establishment();

        establishment.name = domainEstablishment.name;
        establishment.phoneNumber = domainEstablishment.phoneNumber;
        if (!domainEstablishment.addresses){
            domainEstablishment.addresses = [];
        }
        establishment.addresses = domainEstablishment.addresses.map((addr) => {
            const esAddress = new EstablishmentAddress();

            esAddress.addressId = addr.address_id;
            esAddress.establishment = establishment;
            return (esAddress);
        });
        let saved = null;
        try {
            saved = await this.esService.save(establishment);
        }
        catch (e){
            console.log(e.message);
            return Promise.resolve({
                message: "Failed to save",
                httpCode: 400
            });
        }
        const o :any = {};
        o.name = saved.name;
        o.id = saved.id;
        o.phoneNumber = saved.phoneNumber;
        o.addresses = [];
        const fetch = ((saved: Establishment) => {
            return (new Promise(async (resolve, reject) => {
                let list = saved.addresses;

                if (!list || !list.length){
                    resolve();
                    return;
                }
                for (let addr of list){
                    try {
                        const response = await this.addressService.findOne(addr.addressId);
        
                        if (response.status === 200){
                            o.addresses.push(response.data.data);
                        }
                        else {
                            o.addresses.push({
                                address_id: addr.addressId,
                                establishment_id: addr.establishmentId
                            });
                        }
                    }
                    catch (e){
                        o.addresses.push({
                            address_id: addr.addressId,
                            establishment_id: addr.establishmentId
                        });
                    }
                    if (o.addresses.length == saved.addresses.length){
                        return resolve();
                    }
                }
            }));
        });
        await fetch(saved);
        const savedEs = new DomainEstablishment(o);
        return Promise.resolve({
            message: "Establishment saved",
            data: savedEs,
            httpCode: 201
        });
    }

    @Delete("{id}")
    async delete(@Path("id") id: number){
        const establishment = await this.esService.getOne(id);
        
        if(establishment == null){
            return Promise.resolve({
                message: "no content",
                httpCode: 204
            });
        }
        await this.esService.deleteAddress(id);
        await this.esService.delete(id);
        return Promise.resolve({
            message: "Establishment deleted",
            httpCode: 200
        });
    }

    @Put()
    async update(@Body() domainEstablishment: EstablishmentResource){
        const establishment = new Establishment();

        establishment.id = domainEstablishment.id;
        establishment.name = domainEstablishment.name;
        establishment.phoneNumber = domainEstablishment.phoneNumber;
        if (!domainEstablishment.addresses){
            domainEstablishment.addresses = [];
        }
        await this.esService.deleteAddress(establishment.id);
        establishment.addresses = domainEstablishment.addresses.map((addr) => {
            const esAddress = new EstablishmentAddress();

            esAddress.addressId = addr.address_id;
            esAddress.establishmentId = establishment.id;
            esAddress.establishment = establishment;
            return (esAddress);
        });
        if (!domainEstablishment.services){
            domainEstablishment.services = [];
        }
        const saved = await this.esService.update(establishment);
        const o :any = {};
        o.name = saved.name;
        o.id = saved.id;
        o.phoneNumber = saved.phoneNumber;
        o.addresses = [];
        o.services = [];
        const fetch = ((saved: Establishment) => {
            return (new Promise(async (resolve, reject) => {
                const list = saved.addresses;

                if (list.length == 0){
                    return resolve();
                }
                for (let addr of list){
                    try {
                        const response = await this.addressService.findOne(addr.addressId);
        
                        if (response.status === 200){
                            o.addresses.push(response.data.data);
                        }
                        else {
                            o.addresses.push({
                                address_id: addr.addressId,
                                establishment_id: addr.establishmentId
                            });
                        }
                    }
                    catch (e){
                        o.addresses.push({
                            address_id: addr.addressId,
                            establishment_id: addr.establishmentId
                        });
                    }
                    if (o.addresses.length == saved.addresses.length){
                        return resolve();
                    }
                }
            }));
        });
        await fetch(saved);
        const savedEs = new DomainEstablishment(o);
        return Promise.resolve({
            message: "Establishment updated",
            data: savedEs,
            httpCode: 200
        });
    }

}
