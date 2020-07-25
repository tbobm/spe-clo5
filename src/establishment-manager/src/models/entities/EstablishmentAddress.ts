import {Entity, Column, ManyToOne, JoinColumn} from "typeorm";
import { Establishment } from "./Establishment";

@Entity({
    name: "establishment_address"
})
export class EstablishmentAddress {
    @Column({
        name: "establishment_id",
        primary: true,
    })
    establishmentId: number;
    

    @JoinColumn({
        name: "establishment_id",
        referencedColumnName: "id"
    })
    @ManyToOne(type => Establishment, es => es.addresses, {
        primary: true
    })
    establishment: Establishment;


    @Column({
        name: "address_id",
        primary: true
    })
    addressId: number;
}
