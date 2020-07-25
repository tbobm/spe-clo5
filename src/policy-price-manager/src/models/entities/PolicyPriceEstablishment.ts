import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { PolicyPrice } from "./PolicyPrice";

@Entity({
    name: "policy_price_establishment"
})
export class PolicyPriceEstablishment {

    @Column({
        name: "policy_price_id",
        primary: true
    })
    policyPriceId: number;

    @Column({
        name: "establishment_id",
        primary: true
    })
    establishmentId: number;

    @JoinColumn({
        name: "policy_price_id",
        referencedColumnName: "id"
    })
    @ManyToOne(type => PolicyPrice, pp => pp.policyPriceEstablishments, {
        primary: true
    })
    policyPrice: PolicyPrice;

}
