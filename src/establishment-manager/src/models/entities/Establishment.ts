import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { EstablishmentAddress } from "./EstablishmentAddress";

@Entity({
    name: "establishment"
})
export class Establishment {
    @PrimaryGeneratedColumn({
        name: "id"
    })
    id: number;

    @Column()
    name: string

    @Column({
        name: "phone_number"
    })
    phoneNumber: string;

    @OneToMany(type => EstablishmentAddress, ea => ea.establishment, {
        cascade: true
    })
    addresses: Array<EstablishmentAddress>;

}
