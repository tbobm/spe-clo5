import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PolicyPriceEstablishment } from "./PolicyPriceEstablishment";
import { PolicyPricePeriod } from "./PolicyPricePeriod";
import { PolicyPricePerson } from "./PolicyPricePerson";

@Entity({
    name: "policy_price"
})
export class PolicyPrice {

    @PrimaryGeneratedColumn({
        name: "id"
    })
    id: number;

    @Column({
        name: "key"
    })
    key: number;

    @OneToMany(type => PolicyPriceEstablishment, pe => pe.policyPrice, {
        cascade: true
    })
    policyPriceEstablishments: Array<PolicyPriceEstablishment>;

    @OneToMany(type => PolicyPricePeriod, pp => pp.policyPrice, {
        cascade: true
    })
    policyPricePeriods: Array<PolicyPricePeriod>;

    @OneToMany(type => PolicyPricePerson, ppp => ppp.policyPrice, {
        cascade: true
    })
    policyPricePersons: Array<PolicyPricePerson>;
    
}

