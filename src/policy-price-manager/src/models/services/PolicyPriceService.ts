import { Repository, getRepository } from "typeorm";
import { Period } from "../entities/Period";
import { PolicyPriceEstablishment } from "../entities/PolicyPriceEstablishment";
import { PolicyPricePeriod } from "../entities/PolicyPricePeriod";
import { PolicyPriceResource, DomainPolicyPrice } from "../../controllers/types/PolicyPriceResource";
import { PolicyPrice } from "../entities/PolicyPrice";
import { IPolicyPriceService } from "./IPolicyPriceService";
import { DTOPolicyPriceKey, DTOKeyPolicyPrice } from "../../controllers/types/EPolicyPrice"

export class PolicyPriceService implements IPolicyPriceService {

    private policyPriceRepository: Repository<PolicyPrice>;
    private periodRepository: Repository<Period>;
    private policyPriceEstablishmenteRepository: Repository<PolicyPriceEstablishment>;
    private policyPricePeriodRepository: Repository<PolicyPricePeriod>;

    constructor(){
        this.policyPriceRepository = getRepository(PolicyPrice, process.env.NODE_ENV || "development");
        this.periodRepository = getRepository(Period, process.env.NODE_ENV || "development");
        this.policyPriceEstablishmenteRepository = getRepository(PolicyPriceEstablishment, process.env.NODE_ENV || "development");
        this.policyPricePeriodRepository = getRepository(PolicyPricePeriod, process.env.NODE_ENV || "development");
    }

    async findByEstablishment(establishmentId: number) {
        let policies = await this.policyPriceRepository
            .createQueryBuilder("policy")
            .leftJoinAndSelect("policy.policyPriceEstablishments", "policyPriceEstablishments")
            .leftJoinAndSelect("policy.policyPricePeriods", "policyPricePeriods")
            .leftJoinAndSelect("policyPricePeriods.period", "period")
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
                "policyPriceEstablishments"
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
        o.periods = [];
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
        return (new DomainPolicyPrice(o));
    }

    async getAll() {
        let policies = await this.policyPriceRepository.find({
            relations: [
                "policyPricePeriods"
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
        policy.policyPriceEstablishments = [];
        policy.policyPricePeriods = [];
        await this.deletePeriodPolicy(policy.id);
        await this.deleteEstablishmentPolicy(policy.id);
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
            return (new DomainPolicyPrice(o));
        }
        catch (e){
            return (null);
        }
    }
    
    async delete(id: number) {
        try {
            await this.deletePeriodPolicy(id);
            await this.deleteEstablishmentPolicy(id);
            await this.policyPriceRepository.delete(id);

            return (true);
        }
        catch (e){
            return (false);
        }
    }
    
}