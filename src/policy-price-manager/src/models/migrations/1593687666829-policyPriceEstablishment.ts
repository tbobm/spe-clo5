import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class policyPriceEstablishment1593687666829 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "policy_price_establishment",
            columns: [
                {
                    name: "policy_price_id",
                    type: "int",
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "establishment_id",
                    type: "int",
                    isPrimary: true,
                    isNullable: false
                }
            ]
        }));

        await queryRunner.createForeignKey("policy_price_establishment", new TableForeignKey({
            name: "fk_policy_price_establishment_policy_price_id",
            referencedTableName: "policy_price",
            referencedColumnNames: ["id"],
            columnNames: ["policy_price_id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("polpolicy_price_establishmenticy_price", "fk_policy_price_establishment_policy_price_id")
        await queryRunner.dropTable("policy_price_establishment");
    }

}
