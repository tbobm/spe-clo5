import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { PolicyPricePeriod } from "./PolicyPricePeriod";

@Entity({
    name: "period"
})
export class Period {

    @PrimaryGeneratedColumn({
        name: "id"
    })
    id: number;

    @Column({
        name: "from"
    })
    from: Date;

    @Column({
        name: "to"
    })
    to: Date;

    @Column({
        name: "sign"
    })
    sign: number;

    @Column({
        name: "percent"
    })
    percent: number;

    @OneToMany(type => PolicyPricePeriod, pp => pp.period, {
        cascade: true
    })
    policyPricePeriods: Array<PolicyPricePeriod>;

}
