import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { PolicyPrice } from "./PolicyPrice";
import { Period } from "./Period";

@Entity({
    name: "policy_price_period"
})
export class PolicyPricePeriod {

    @Column({
        name: "policy_price_id",
        primary: true
    })
    policyPriceId: number;
    
    @Column({
        name: "period_id",
        primary: true
    })
    periodId: number;

    @JoinColumn({
        name: "policy_price_id",
        referencedColumnName: "id"
    })
    @ManyToOne(type => PolicyPrice, pp => pp.policyPricePeriods, {
        primary: true
    })
    policyPrice: PolicyPrice;

    @JoinColumn({
        name: "period_id",
        referencedColumnName: "id"
    })
    @ManyToOne(type => Period, period => period.policyPricePeriods, {
        primary: true,
        eager: true
    })
    period: Period;

}
