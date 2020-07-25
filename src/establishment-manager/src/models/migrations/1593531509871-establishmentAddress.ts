import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class establishmentAddress1593531509871 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "establishment_address",
            columns: [
                {
                    name: "establishment_id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "address_id",
                    type: "int",
                    isPrimary: true
                }
            ]
        }));

        await queryRunner.createForeignKey("establishment_address", new TableForeignKey({
            name: "fk_establishment_address_establishment_id",
            columnNames: ["establishment_id"],
            referencedTableName: "establishment",
            referencedColumnNames: ["id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey("establishment_address", "fk_establishment_address_establishment_id");
        await queryRunner.dropTable("establishment_address");
    }

}
