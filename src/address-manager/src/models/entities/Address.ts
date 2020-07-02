import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: "address"
})
export class Address {
    @PrimaryGeneratedColumn({
        name: "id"
    })
    id: number;

    @Column()
    road: string;

    @Column({
        name: "postal_code"
    })
    postalCode: number;

    @Column({
        name: "road_number"
    })
    roadNumber: number;

    @Column()
    city: string;

    @Column()
    country: string;
}
