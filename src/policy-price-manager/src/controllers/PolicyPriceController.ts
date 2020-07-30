import { IPolicyPriceService } from "../models/services/IPolicyPriceService";
import { PolicyPriceResource } from "./types/PolicyPriceResource";
import { Route, Get, Path, Delete, Post, Body, Put } from "tsoa";

@Route("/")
export class PolicyPriceController {

    private policyPriceService: IPolicyPriceService;

    constructor(policyPriceService: IPolicyPriceService){
        this.policyPriceService = policyPriceService;
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
        try {
            await this.policyPriceService.delete(id);

            return Promise.resolve({
                message: "policy price deleted",
                httpCode: 200
            });
        }
        catch (e){
            return Promise.resolve({
                message: "error on delete",
                httpCode: 400
            });
        }
    }

    @Post()
    async save(@Body() policyPrice : PolicyPriceResource){
        try {
            const saved = await this.policyPriceService.save(policyPrice);

            return Promise.resolve({
                message: "Policy price saved",
                httpCode: 201,
                data: saved
            });
        }
        catch (e){
            return Promise.resolve({
                message: e.message,
                httpCode: 400
            });
        }
    }

    @Put()
    async update(@Body() policyPrice: PolicyPriceResource){
        try {
            await this.policyPriceService.update(policyPrice);
            
            return Promise.resolve({
                message: "Policy price updated",
                httpCode: 200,
                data: policyPrice
            });
        }
        catch (e){
            return Promise.resolve({
                message: e.message,
                httpCode: 400
            });
        }
    }

}
