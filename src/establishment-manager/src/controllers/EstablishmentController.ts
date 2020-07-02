import { EstablishmentServiceImpl } from "../models/services/EstablishmentServiceImpl";
import { Establishment } from "../models/entities/Establishment";
import { EstablishmentResource } from "./types/EstablishmentResource";
import { EstablishmentAddress } from "../models/entities/EstablishmentAddress";
import { EstablishmentService } from "../models/entities/EstablishmentService";
import { DomainEstablishment } from "../domain/entities/establishment";

export class EstablishmentController {

    private esService: EstablishmentServiceImpl;

    constructor(){
        this.esService = new EstablishmentServiceImpl();
    }

    async getAll(){
        const domains = [];
        const list = await this.esService.getAll();

        for (let item of list){
            const o :any = {};

            o.name = item.name;
            o.id = item.id;
            o.phoneNumber = item.phoneNumber;
            o.addresses = [];
            o.services = [];
            item.addresses.forEach((addr) => {
                o.addresses.push({
                    address_id: addr.addressId,
                    establishment_id: addr.establishmentId
                });
            });
            item.services.forEach((serv) => {
                o.services.push({
                    service_id: serv.serviceId,
                    establishment_id: serv.establishmentId,
                    model: serv.model,
                    overridePrice: serv.overridePrice,
                    interval: serv.interval
                });
            });
            domains.push(new DomainEstablishment(o));
        }
        return (domains);
    }

    hello(){
        return ("establishment");
    }

    async getOne(id: number){
        const establishment = await this.esService.getOne(id);
        const o :any = {};

        o.name = establishment.name;
        o.id = establishment.id;
        o.phoneNumber = establishment.phoneNumber;
        o.addresses = [];
        o.services = [];
        establishment.addresses.forEach((addr) => {
            o.addresses.push({
                address_id: addr.addressId,
                establishment_id: addr.establishmentId
            });
        });
        establishment.services.forEach((serv) => {
            o.services.push({
                service_id: serv.serviceId,
                establishment_id: serv.establishmentId,
                model: serv.model,
                overridePrice: serv.overridePrice,
                interval: serv.interval
            });
        });
        return (new DomainEstablishment(o));
    }

    async save(domainEstablishment: EstablishmentResource){
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
        const saved = await this.esService.save(establishment);
        const o :any = {};
        o.name = saved.name;
        o.id = saved.id;
        o.phoneNumber = saved.phoneNumber;
        o.addresses = [];
        o.services = [];
        saved.addresses.forEach((addr) => {
            o.addresses.push({
                address_id: addr.addressId,
                establishment_id: addr.establishmentId
            });
        });
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
        return (savedEs);
    }

    async delete(id: number){
        const establishment = await this.esService.getOne(id);
        
        if(establishment == null){
            return (null);
        }
        return (this.esService.delete(id));
    }

    async update(domainEstablishment: EstablishmentResource){
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
        saved.addresses.forEach((addr) => {
            o.addresses.push({
                address_id: addr.addressId,
                establishment_id: addr.establishmentId
            });
        });
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
        return (savedEs);
    }

}
