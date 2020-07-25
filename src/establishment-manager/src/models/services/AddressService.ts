import * as axios from "axios";

export class AddressService {

    constructor(){

    }

    async findOne(id: number){
        try {
            const response = await axios.default.get(`http://address-manager/${id}`);

            return (response);
        }
        catch (e){
            return (null);
        }
    }
}