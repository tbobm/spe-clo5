import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PolicyPricePerson } from "./PolicyPricePerson";

@Entity({
    name: "person"
})
export class Person {

    @PrimaryGeneratedColumn({
        name: "id"
    })
    id: number;

    @Column({
        name: "number"
    })
    nb: number;

    @Column()
    sign: number;

    @Column()
    percent: number;

    @OneToMany(type => PolicyPricePerson, ppp => ppp.person, {
        cascade: true
    })
    policyPricePersons: Array<PolicyPricePerson>;

};