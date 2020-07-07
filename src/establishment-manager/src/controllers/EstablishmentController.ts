import { EstablishmentServiceImpl } from "../models/services/EstablishmentServiceImpl";
import { Establishment } from "../models/entities/Establishment";
import { EstablishmentResource, DomainEstablishment } from "./types/EstablishmentResource";
import { EstablishmentAddress } from "../models/entities/EstablishmentAddress";
import { EstablishmentService } from "../models/entities/EstablishmentService";
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
            o.services = [];
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
            if (!item.services){
                item.services = [];
            }
            item.services.forEach((serv) => {
                o.services.push({
                    service_id: serv.serviceId,
                    establishment_id: serv.establishmentId,
                    model: serv.model,
                    overridePrice: serv.overridePrice,
                    interval: serv.interval
                });
            });
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
                message: "empty establishment"
            });
        }
        return Promise.resolve({
            message: "List establishment",
            data: domains
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
                message: "no content"
            });
        }
        o.name = establishment.name;
        o.id = establishment.id;
        o.phoneNumber = establishment.phoneNumber;
        o.addresses = [];
        o.services = [];
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
        establishment.services.forEach((serv) => {
            o.services.push({
                service_id: serv.serviceId,
                establishment_id: serv.establishmentId,
                model: serv.model,
                overridePrice: serv.overridePrice,
                interval: serv.interval
            });
        });
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
            data: e
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
        if (!domainEstablishment.services){
            domainEstablishment.services = [];
        }
        establishment.services = domainEstablishment.services.map((serv) => {
            const esService = new EstablishmentService();

            esService.serviceId = serv.service_id;
            esService.establishment = establishment;
            esService.interval = serv.interval;
            esService.model = serv.interval;
            esService.overridePrice = serv.overridePrice;
            return (esService);
        });
        let saved = null;
        try {
            saved = await this.esService.save(establishment);
        }
        catch (e){
            console.log(e.message);
            return Promise.resolve({
                message: "Failed to save"
            });
        }
        const o :any = {};
        o.name = saved.name;
        o.id = saved.id;
        o.phoneNumber = saved.phoneNumber;
        o.addresses = [];
        o.services = [];
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
        if (!saved.services){
            saved.services = [];
        }
        saved.services.forEach((serv) => {
            o.services.push({
                service_id: serv.serviceId,
                establishment_id: serv.establishmentId,
                model: serv.model,
                overridePrice: serv.overridePrice,
                interval: serv.interval
            });
        });
        const savedEs = new DomainEstablishment(o);
        return Promise.resolve({
            message: "Establishment saved",
            data: savedEs
        });
    }

    @Delete("{id}")
    async delete(@Path("id") id: number){
        const establishment = await this.esService.getOne(id);
        
        if(establishment == null){
            return Promise.resolve({
                message: "no content"
            });
        }
        await this.esService.deleteAddress(id);
        await this.esService.deleteService(id);
        await this.esService.delete(id);
        return Promise.resolve({
            message: "Establishment deleted",
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
            esAddress.establishment = establishment;
            return (esAddress);
        });
        if (!domainEstablishment.services){
            domainEstablishment.services = [];
        }
        await this.esService.deleteService(establishment.id);
        establishment.services = domainEstablishment.services.map((serv) => {
            const esService = new EstablishmentService();

            esService.serviceId = serv.service_id;
            esService.establishment = establishment;
            esService.model = serv.model;
            esService.interval = serv.interval;
            esService.overridePrice = serv.overridePrice;
            return (esService);
        });
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
        saved.services.forEach((serv) => {
            o.services.push({
                service_id: serv.serviceId,
                establishment_id: serv.establishmentId,
                overridePrice: serv.overridePrice,
                model: serv.model,
                interval: serv.interval
            });
        });
        const savedEs = new DomainEstablishment(o);
        return Promise.resolve({
            message: "Establishment updated",
            data: savedEs
        });
    }

}
