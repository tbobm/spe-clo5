import { IPolicyPriceService } from "../models/services/IPolicyPriceService";
import { PolicyPriceResource } from "./types/PolicyPriceResource";
import { Route, Get, Path, Delete, Post, Body, Put } from "tsoa";

@Route("/")
export class PolicyPriceController {

    private policyPriceService: IPolicyPriceService;

    constructor(policyPriceService: IPolicyPriceService){
        this.policyPriceService = policyPriceService;
    }

    @Get("hello")
    hello(){
        return ("policy-price");
    }

    @Get()
    async getAll(){
        const list = await this.policyPriceService.getAll();

        if (!list || !list.length){
            return Promise.resolve({
                httpCode: 204
            });
        }
        return Promise.resolve({
            message: "list policy price",
            data: list,
            httpCode: 200
        });
    }

    @Get("establishmment/{establishmentId}")
    async findByEstablishment(@Path("establishmentId") id: number){
        const policies = await this.policyPriceService.findByEstablishment(id);

        if(!policies || !policies.length){
            return Promise.resolve({
                httpCode: 204
            });
        }
        return Promise.resolve({
            message: "policy price list",
            data: policies,
            httpCode: 200
        });
    }

    @Get("{id}")
    async findOne(@Path("id")  id: number){
        const policy = await this.policyPriceService.findOne(id);

        if (!policy){
            return Promise.resolve({
                httpCode: 204
            });
        }
        return Promise.resolve({
            message: "detail policy price",
            data: policy,
            httpCode: 200
        });
    }

    @Delete("{id}")
    async delete(@Path("id") id: number){
        const flag = await this.policyPriceService.delete(id);

        if (flag){
            return Promise.resolve({
                message: "policy price deleted",
                httpCode: 200
            });
        }
        return Promise.resolve({
            message: "error on delete",
            httpCode: 400
        });
    }

    @Post()
    async save(@Body() policyPrice : PolicyPriceResource){
        const saved = await this.policyPriceService.save(policyPrice);

        if (!saved){
            return Promise.resolve({
                message: "Error on save",
                httpCode: 400
            });
        }
        return Promise.resolve({
            message: "Policy price saved",
            httpCode: 200
        });
    }

    @Put()
    async update(@Body() policyPrice: PolicyPriceResource){
        const saved = await this.policyPriceService.update(policyPrice);

        if (!saved){
            return Promise.resolve({
                message: "Error on update",
                httpCode: 400
            });
        }
        return Promise.resolve({
            message: "Policy price updated",
            httpCode: 200
        });
    }

}
