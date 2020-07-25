import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Person1583778613798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const increment : "uuid" | "increment" | "rowid" = "increment";

        await queryRunner.createTable(new Table({
            name: "person",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary:true,
                    isGenerated: true,
                    generationStrategy: increment
                },
                {
                    name: "number",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "percent",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "sign",
                    type: "int",
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person");
    }

}
