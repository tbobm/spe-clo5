import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class policyPrice1593687650728 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const increment : "uuid" | "increment" | "rowid" = "increment";

        await queryRunner.createTable(new Table({
            name: "policy_price",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: increment
                },
                {
                    name: "key",
                    type: "int",
                    isUnique: true,
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("policy_price");
    }

}
