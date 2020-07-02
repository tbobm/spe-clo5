import * as axios from "axios";

export class PolicyPriceService {

    constructor(){

    }

    async findOne(id: number){
        try {
            const response = await axios.default.get(`http://policy-price-manager/establishment/${id}`);

            return (response);
        }
        catch (e){
            return (null);
        }
    }
}