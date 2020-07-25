import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class address1593633409487 implements MigrationInterface {
    name = 'address1593633409487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const increment : "increment" | "uuid" | "rowid" = "increment";
        
        await queryRunner.createTable(new Table({
            name: "address",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: increment
                },
                {
                    name: "road",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "postal_code",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "road_number",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "city",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "country",
                    type: "varchar",
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("address");
    }

}
