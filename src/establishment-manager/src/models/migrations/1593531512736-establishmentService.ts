import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class establishmentService1593531512736 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "establishment_service",
            columns: [
                {
                    name: "establishment_id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "service_id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "override_price",
                    type: "integer",
                    isNullable: true
                },
                {
                    name: "model",
                    type: "integer",
                    isNullable: true
                },
                {
                    name: "interval",
                    type: "integer",
                    isNullable: true
                }
            ]
        }));

        await queryRunner.createForeignKey("establishment_service", new TableForeignKey({
            name: "fk_establishment_service_establishment_id",
            columnNames: ["establishment_id"],
            referencedTableName: "establishment",
            referencedColumnNames: ["id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey("establishment_service", "fk_establishment_service_establishment_id");
        await queryRunner.dropTable("establishment_service");
    }

}
