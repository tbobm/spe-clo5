import { IPolicyPriceService } from "../models/services/IPolicyPriceService";
import { PolicyPriceService } from "../models/services/PolicyPriceService";
import { PolicyPriceResource } from "./types/PolicyPriceResource";

export class PolicyPriceController {

    private policyPriceService: IPolicyPriceService;

    constructor(){
        this.policyPriceService = new PolicyPriceService();
    }

    hello(){
        return ("policy-price");
    }

    async getAll(){
        const list = await this.policyPriceService.getAll();

        if (!list || !list.length){
            return {
                httpCode: 204
            };
        }
        return {
            message: "list policy price",
            data: list,
            httpCode: 200
        };
    }

    async findByEstablishment(id: number){
        const policies = await this.policyPriceService.findByEstablishment(id);

        if(!policies || !policies.length){
            return ({
                httpCode: 204
            });
        }
        return ({
            message: "policy price list",
            data: policies,
            httpCode: 200
        });
    }

    async findOne(id: number){
        const policy = await this.policyPriceService.findOne(id);

        if (!policy){
            return {
                httpCode: 204
            };
        }
        return {
            message: "detail policy price",
            data: policy,
            httpCode: 200
        };
    }

    async delete(id: number){
        const flag = await this.policyPriceService.delete(id);

        if (flag){
            return {
                message: "policy price deleted",
                httpCode: 200
            };
        }
        return {
            message: "error on delete",
            httpCode: 400
        };
    }

    async save(policyPrice : PolicyPriceResource){
        const saved = await this.policyPriceService.save(policyPrice);

        if (!saved){
            return {
                message: "Error on save",
                httpCode: 400
            };
        }
        return {
            message: "Policy price saved",
            httpCode: 200
        };
    }

    async update(policyPrice: PolicyPriceResource){
        const saved = await this.policyPriceService.update(policyPrice);

        if (!saved){
            return {
                message: "Error on update",
                httpCode: 400
            };
        }
        return {
            message: "Policy price updated",
            httpCode: 200
        };
    }

}
