import {Entity, Column, ManyToOne, JoinColumn} from "typeorm";
import { Establishment } from "./Establishment";

@Entity({
    name: "establishment_service"
})
export class EstablishmentService {
    @Column({
        name: "establishment_id",
        primary: true
    })
    establishmentId: number;


    @JoinColumn({
        name: "establishment_id",
        referencedColumnName: "id"
    })
    @ManyToOne(type => Establishment, es => es.services, {
        primary: true
    })
    establishment: Establishment;

    @Column({
        name: "service_id",
        primary: true
    })
    serviceId: number;

    @Column({
        name: "override_price"
    })
    overridePrice: number;

    @Column()
    model: number;

    @Column()
    interval: number;
}
