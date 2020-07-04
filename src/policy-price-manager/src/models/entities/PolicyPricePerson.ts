import { PolicyPrice } from "./PolicyPrice";
import { Person } from "./Person";
import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";

@Entity({
    name: "policy_price_person"
})
export class PolicyPricePerson {

    @Column({
        primary: true
    })
    policy_price_id : number;

    @Column({
        primary: true
    })
    person_id : number;

    @JoinColumn({
        name: "policy_price_id"
    })

    @ManyToOne(type => PolicyPrice, pp => pp.policyPricePersons, {
        eager: true,
        primary: true
    })
    policyPrice: PolicyPrice;

    @JoinColumn({
        name: "person_id"
    })
    @ManyToOne(type => Person, p => p.policyPricePersons, {
        eager: true,
        primary: true
    })
    person: Person;

}