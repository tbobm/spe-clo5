import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class policyPricePerson1593778444595 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "policy_price_person",
            columns: [
                {
                    name: "policy_price_id",
                    isPrimary: true,
                    type: "int",
                },
                {
                    name: "person_id",
                    isPrimary: true,
                    type: "int",                
                }
            ]
        }));
        await queryRunner.createForeignKey("policy_price_person", new TableForeignKey({
            name: "fk_policy_person_id",
            columnNames: ["policy_price_id"],
            referencedTableName: "policy_price",
            referencedColumnNames: ["id"]
        }));
        await queryRunner.createForeignKey("policy_price_person", new TableForeignKey({
            name: "fk_person_policy_id",
            columnNames: ["person_id"],
            referencedTableName: "person",
            referencedColumnNames: ["id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("policy_price_person", "fk_person_policy_id");
        await queryRunner.dropForeignKey("policy_price_person", "fk_policy_person_id");
        await queryRunner.dropTable("policy_price_person");

    }

}
