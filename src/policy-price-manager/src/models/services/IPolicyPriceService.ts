import { PolicyPriceResource } from "../../controllers/types/PolicyPriceResource";

export abstract class IPolicyPriceService {
    abstract findOne(id: number): any;
    abstract getAll(): any;
    abstract save(policyPrice: PolicyPriceResource): any;
    abstract update(policyPrice: PolicyPriceResource): any;
    abstract delete(id: number): any;
    abstract findByEstablishment(establishmentId: number): any;
}
