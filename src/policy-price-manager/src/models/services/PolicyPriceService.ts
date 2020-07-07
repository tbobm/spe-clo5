import { Repository, getRepository } from "typeorm";
import { Period } from "../entities/Period";
import { PolicyPriceEstablishment } from "../entities/PolicyPriceEstablishment";
import { PolicyPricePeriod } from "../entities/PolicyPricePeriod";
import { PolicyPriceResource, DomainPolicyPrice } from "../../controllers/types/PolicyPriceResource";
import { PolicyPrice } from "../entities/PolicyPrice";
import { IPolicyPriceService } from "./IPolicyPriceService";
import { DTOPolicyPriceKey, DTOKeyPolicyPrice } from "../../controllers/types/EPolicyPrice"
import { PolicyPricePerson } from "../entities/PolicyPricePerson";
import { Person } from "../entities/Person";
import { PolicyPriceRepository } from "../repositories/PolicyPriceRepository";
import { PeriodRepository } from "../repositories/PeriodRepository";
import { PolicyPriceEstablishmentRepository } from "../repositories/PolicyPriceEstablishmentRepository";
import { PolicyPricePeriodRepository } from "../repositories/PolicyPricePeriodRepository";
import { PersonRepository } from "../repositories/PersonRepository";

export class PolicyPriceService implements IPolicyPriceService {

    private policyPriceRepository: PolicyPriceRepository
    private periodRepository: PeriodRepository;
    private personRepository: PersonRepository;
    private policyPriceEstablishmenteRepository: PolicyPriceEstablishmentRepository;
    private policyPricePeriodRepository: PolicyPricePeriodRepository;

    constructor(policyPriceRepository: PolicyPriceRepository, 
        periodRepository: PeriodRepository, 
        personRepository: PersonRepository, 
        policyPriceEstablishmenteRepository: PolicyPriceEstablishmentRepository, 
        policyPricePeriodRepository: PolicyPricePeriodRepository){
        this.policyPriceRepository = policyPriceRepository;
        this.periodRepository = periodRepository;
        this.personRepository = personRepository;
        this.policyPriceEstablishmenteRepository = policyPriceEstablishmenteRepository;
        this.policyPricePeriodRepository = policyPricePeriodRepository;
    }

    async findByEstablishment(establishmentId: number) {
        let policies = await this.policyPriceRepository
            .createQueryBuilder("policy")
            .leftJoinAndSelect("policy.policyPriceEstablishments", "policyPriceEstablishments")
            .leftJoinAndSelect("policy.policyPricePeriods", "policyPricePeriods")
            .leftJoinAndSelect("policyPricePeriods.period", "period")
            .leftJoinAndSelect("policy.policyPricePersons", "policyPricePersons")
            .leftJoinAndSelect("policyPricePersons.person", "person")
            .where("policyPriceEstablishments.establishmentId = :id", {
            "id": establishmentId
        }).getMany();
        const ret = [];

        if (!policies){
            policies = [];
        }
        for (let policy of policies){
            const o : any = {};

            o.id = policy.id;
            o.key = DTOKeyPolicyPrice[policy.key];
            if (!policy.policyPricePeriods){
                policy.policyPricePeriods = [];
            }
            if (!policy.policyPriceEstablishments){
                policy.policyPriceEstablishments = [];
            }
            o.periods = [];
            for (let policyPeriod of policy.policyPricePeriods){
                o.periods.push({
                    id: policyPeriod.period.id,
                    from: policyPeriod.period.from,
                    to: policyPeriod.period.to,
                    sign: policyPeriod.period.sign,
                    percent: policyPeriod.period.percent
                });
            }
            if (!policy.policyPricePersons){
                policy.policyPricePersons = [];
            }
            o.persons = [];
            for (let policyPerson of policy.policyPricePersons){
                o.persons.push({
                    id: policyPerson.person.id,
                    nb: policyPerson.person.nb,
                    percent: policyPerson.person.percent,
                    sign: policyPerson.person.sign
                });
            }
            ret.push(new DomainPolicyPrice(o));
        }
        return (ret);
    }

    async deleteEstablishmentPolicy(id: number){
        try {
            await this.policyPriceRepository.createQueryBuilder().from(PolicyPriceEstablishment, "pe").delete().where("policy_price_establishment.policy_price_id = :id", {
                id: id
            }).execute();
    
            return (true);
        }
        catch (e){
            return (false);
        }
    }

    async deletePersonPolicy(id: number){
        try {
            await this.policyPriceRepository.createQueryBuilder().from(PolicyPricePerson, "ppp").delete().where("policy_price_person.policy_price_id = :id", {
                id: id
            }).execute();
    
            return (true);
        }
        catch (e){
            return (false);
        }
    }

    async deletePeriodPolicy(id: number){
        try {
            await this.policyPriceRepository.createQueryBuilder().from(PolicyPricePeriod, "pp").delete().where("policy_price_period.policy_price_id = :id", {
                id: id
            }).execute();
    
            return (true);
        }
        catch (e){
            return (false);
        }
    }

    async findOne(id: number) {
        const policyPrice = await this.policyPriceRepository.findOne(id, {
            relations: [
                "policyPricePeriods",
                "policyPriceEstablishments",
                "policyPricePersons"
            ]
        });
        const o: any = {};

        if (!policyPrice){
            return (null);
        }
        o.id = policyPrice.id;
        o.key = DTOKeyPolicyPrice[policyPrice.key];
        if (!policyPrice.policyPriceEstablishments){
            policyPrice.policyPriceEstablishments = [];
        }
        if (!policyPrice.policyPricePeriods){
            policyPrice.policyPricePeriods = [];
        }
        if (!policyPrice.policyPricePersons){
            policyPrice.policyPricePersons = [];
        }
        o.periods = [];
        o.persons = [];
        o.establishments = [];
        for (let policyPriceEstablishment of policyPrice.policyPriceEstablishments){
            const establishment = {
                establishmentId: policyPriceEstablishment.establishmentId
            };

            o.establishments.push(establishment);
        }
        for (let policyPricePeriod of policyPrice.policyPricePeriods){
            const period = {
                id: policyPricePeriod.period.id,
                from: policyPricePeriod.period.from,
                to: policyPricePeriod.period.to,
                sign: policyPricePeriod.period.sign,
                percent: policyPricePeriod.period.percent
            };

            o.periods.push(period);
        }
        for (let policyPricePerson of policyPrice.policyPricePersons){
            const person = {
                id: policyPricePerson.person.id,
                nb: policyPricePerson.person.nb,
                sign: policyPricePerson.person.sign,
                percent: policyPricePerson.person.percent
            };

            o.persons.push(person);
        }
        return (new DomainPolicyPrice(o));
    }

    async getAll() {
        let policies = await this.policyPriceRepository.find({
            relations: [
                "policyPricePeriods",
                "policyPricePersons"
            ]
        });
        console.log(policies);
        const list = [];

        if (!policies){
            policies = [];
        }
        for (let policy of policies){
            const o : any= {};

            o.id = policy.id;
            o.key = DTOKeyPolicyPrice[policy.key];
            if (!policy.policyPricePeriods){
                policy.policyPricePeriods = [];
            }
            o.periods = [];
            for (let policyPricePeriod of policy.policyPricePeriods){
                const period = {
                    id: policyPricePeriod.period.id,
                    from: policyPricePeriod.period.from,
                    to: policyPricePeriod.period.to,
                    sign: policyPricePeriod.period.sign,
                    percent: policyPricePeriod.period.percent
                };
    
                o.periods.push(period);
            }
            o.persons = [];
            for (let policyPricePerson of policy.policyPricePersons){
                const person = {
                    id: policyPricePerson.person.id,
                    nb: policyPricePerson.person.nb,
                    sign: policyPricePerson.person.sign,
                    percent: policyPricePerson.person.percent,
                };

                o.persons.push(person);
            }
            list.push(new DomainPolicyPrice(o));
        }
        return (list);
    }

    async save(resource: PolicyPriceResource) {
        const policyPrice = new PolicyPrice();

        if (!DTOPolicyPriceKey[resource.key]){
            return;
        }
        policyPrice.key = DTOPolicyPriceKey[resource.key];
        policyPrice.policyPricePeriods = [];
        if(!resource.periods){
            resource.periods = [];
        }
        if (!resource.persons){
            resource.persons = [];
        }
        for (let period of resource.periods){
            const periodEntity = await this.periodRepository.findOne(period.id);

            if (!periodEntity || !period.id){
                const toSave = new Period();

                toSave.from = period.from;
                toSave.to = period.to;
                toSave.percent = period.percent;
                toSave.sign = period.sign;
                const tmp = await this.periodRepository.save(toSave);
                period.id = tmp.id;
            }
            const policyPricePeriod = new PolicyPricePeriod();

            policyPricePeriod.periodId = period.id;
            policyPricePeriod.policyPrice = policyPrice;
            policyPrice.policyPricePeriods.push(policyPricePeriod);
        }
        policyPrice.policyPriceEstablishments = [];
        if (!resource.establishments){
            resource.establishments = [];
        }
        for (let establishment of resource.establishments){
            const policyPriceEstablishment = new PolicyPriceEstablishment();

            policyPriceEstablishment.policyPrice = policyPrice;
            policyPriceEstablishment.establishmentId = establishment.establishmentId;
            policyPrice.policyPriceEstablishments.push(policyPriceEstablishment);
        }
        policyPrice.policyPricePersons = [];
        for (let person of resource.persons){
            const personEntity = await this.personRepository.findOne(person.id);

            if (!personEntity || !person.id){
                const toSave = new Person();

                toSave.nb = person.nb;
                toSave.percent = person.percent;
                toSave.sign = person.sign;
                const tmp = await this.periodRepository.save(toSave);
                person.id = tmp.id;
            }
            const policyPricePerson = new PolicyPricePerson();

            policyPricePerson.person_id = person.id;
            policyPricePerson.policyPrice = policyPrice;
            policyPrice.policyPricePersons.push(policyPricePerson);
        }
        try {
            const saved = await this.policyPriceRepository.save(policyPrice);
            const o: any = {};
    
            o.id = saved.id;
            o.key = DTOKeyPolicyPrice[saved.key];
            o.periods = [];
            if (!saved.policyPricePeriods){
                saved.policyPricePeriods = [];
            }
            if (!saved.policyPriceEstablishments){
                saved.policyPriceEstablishments = [];
            }
            if (!saved.policyPricePersons){
                saved.policyPricePersons = [];
            }
            for (let policyPricePeriod of saved.policyPricePeriods){
                const periodEntity = await this.periodRepository.findOne(policyPricePeriod.periodId);
                const period = {
                    id: periodEntity.id,
                    from: periodEntity.from,
                    to: periodEntity.to,
                    percent: periodEntity.percent,
                    sign: periodEntity.sign
                };

                o.periods.push(period);
            }
            o.establishments = [];
            for (let policyPriceEstablishment of saved.policyPriceEstablishments){
                const establishment = {
                    establishmentId: policyPriceEstablishment.establishmentId,
                    policyPriceId: policyPriceEstablishment.policyPriceId
                };
    
                o.establishments.push(establishment);
            }
            o.persons = [];
            for (let policyPricePerson of saved.policyPricePersons){
                const personEntity = await this.personRepository.findOne(policyPricePerson.person_id);

                o.persons.push({
                    id: personEntity.id,
                    nb: personEntity.nb,
                    percent: personEntity.percent,
                    sign: personEntity.sign
                });
            }
            return (new DomainPolicyPrice(o));
        }
        catch (e){
            console.log(e.message);
            return (null);
        }
    }

    async update(resource: PolicyPriceResource) {
        const policy = new PolicyPrice();

        if (!resource.id){
            return (null);
        }
        policy.id = resource.id;
        policy.key = DTOPolicyPriceKey[resource.key];
        if (!resource.establishments){
            resource.establishments = [];
        }
        if (!resource.periods){
            resource.periods = [];
        }
        if (!resource.persons){
            resource.persons = [];
        }
        policy.policyPriceEstablishments = [];
        policy.policyPricePeriods = [];
        policy.policyPricePersons = [];
        await this.deletePeriodPolicy(policy.id);
        await this.deleteEstablishmentPolicy(policy.id);
        await this.deletePersonPolicy(policy.id);
        for (let establishment of resource.establishments){
            const policyPriceEstablishment = new PolicyPriceEstablishment();

            policyPriceEstablishment.policyPrice = policy;
            policyPriceEstablishment.establishmentId = establishment.establishmentId;
            policy.policyPriceEstablishments.push(policyPriceEstablishment);
        }
        for (let period of resource.periods){
            const periodEntity = new Period();

            periodEntity.id = period.id;
            periodEntity.from = period.from;
            periodEntity.to = period.to;
            periodEntity.sign = period.sign;
            periodEntity.percent = period.percent;
            let fetchDB = null;
            if(period.id){
                fetchDB = await this.periodRepository.findOne(period.id);
            }
            if (!fetchDB){
                const tmp = await this.periodRepository.save(periodEntity);

                periodEntity.id = tmp.id;
            }
            else {
                await this.periodRepository.update(periodEntity.id, periodEntity);
            }
            const policyPeriod = new PolicyPricePeriod();

            policyPeriod.periodId = periodEntity.id;
            policyPeriod.policyPrice = policy;
            policy.policyPricePeriods.push(policyPeriod);
        }
        for (let person of resource.persons){
            const personEntity = new Person();

            personEntity.id = person.id;
            personEntity.nb = person.nb;
            personEntity.percent = person.percent;
            personEntity.sign = person.sign;
            let fetchDB = null;
            if (!personEntity.id){
                fetchDB = await this.personRepository.findOne(person.id);
            }
            if (!fetchDB){
                const tmp = await this.periodRepository.save(personEntity);

                personEntity.id = tmp.id;
            }
            else {
                await this.periodRepository.update(personEntity.id, personEntity);
            }
            const policyPricePerson = new PolicyPricePerson();

            policyPricePerson.person_id = personEntity.id;
            policyPricePerson.policyPrice = policy;
            policy.policyPricePersons.push(policyPricePerson);
        }
        try {
            await this.policyPriceRepository.save(policy);
            const o: any = {};
    
            o.id = policy.id;
            o.key = DTOKeyPolicyPrice[policy.key];
            o.periods = [];
            for (let policyPricePeriod of policy.policyPricePeriods){
                const periodEntity = await this.periodRepository.findOne(policyPricePeriod.periodId);
                const period = {
                    id: periodEntity.id,
                    from: periodEntity.from,
                    to: periodEntity.to,
                    sign: periodEntity.sign,
                    percent: periodEntity.percent
                };
    
                o.periods.push(period);
            }
            o.establishments = [];
            for (let policyPriceEstablishment of policy.policyPriceEstablishments){
                const establishment = {
                    establishmentId: policyPriceEstablishment.establishmentId,
                    policyPriceId: policyPriceEstablishment.policyPriceId
                };
    
                o.establishments.push(establishment);
            }
            o.persons = [];
            for (let policyPricePerson of policy.policyPricePersons){
                const person = {
                    id: policyPricePerson.person.id,
                    nb: policyPricePerson.person.nb,
                    percent: policyPricePerson.person.percent,
                    sign: policyPricePerson.person.sign
                };
    
                o.persons.push(person);
            }
            return (new DomainPolicyPrice(o));
        }
        catch (e){
            return (null);
        }
    }
    
    async delete(id: number) {
        try {
            await this.deletePeriodPolicy(id);
            await this.deletePersonPolicy(id);
            await this.deleteEstablishmentPolicy(id);
            await this.policyPriceRepository.delete(id);

            return (true);
        }
        catch (e){
            return (false);
        }
    }
    
}