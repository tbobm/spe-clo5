import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class policyPricePeriod1593687692943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "policy_price_period",
            columns: [
                {
                    name: "policy_price_id",
                    type: "int",
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "period_id",
                    type: "int",
                    isPrimary: true,
                    isNullable: false
                }
            ]
        }));
        await queryRunner.createForeignKey("policy_price_period", new TableForeignKey({
            name: "fk_policy_price_period_policy_price_id",
            columnNames: ["policy_price_id"],
            referencedTableName: "policy_price",
            referencedColumnNames: ["id"]
        }));
        await queryRunner.createForeignKey("policy_price_period", new TableForeignKey({
            name: "fk_policy_price_period_period_id",
            columnNames: ["period_id"],
            referencedTableName: "period",
            referencedColumnNames: ["id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("policy_price_period", "fk_policy_price_period_period_id");
        await queryRunner.dropForeignKey("policy_price_period", "fk_policy_price_period_policy_price_id")
        await queryRunner.dropTable("policy_price_period");
    }

}
