import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class period1593687684846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const increment: "uuid" | "increment" | "rowid" = "increment";

        await queryRunner.createTable(new Table({
            name: "period",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: increment
                },
                {
                    name: "from",
                    type: "timestamp",
                    isNullable: false
                },
                {
                    name: "to",
                    type: "timestamp",
                    isNullable: false
                },
                {
                    name: "sign",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "percent",
                    type: "int",
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("period");
    }

}
