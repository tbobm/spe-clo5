import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { EstablishmentAddress } from "./EstablishmentAddress";
import { EstablishmentService } from "./EstablishmentService";

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

    @OneToMany(type => EstablishmentService, es => es.establishment, {
        cascade: true
    })
    services: Array<EstablishmentService>;
}
