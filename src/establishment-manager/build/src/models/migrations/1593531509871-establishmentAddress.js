"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class establishmentAddress1593531509871 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            yield queryRunner.createForeignKey("establishment_address", new typeorm_1.TableForeignKey({
                name: "fk_establishment_address_establishment_id",
                columnNames: ["establishment_id"],
                referencedTableName: "establishment",
                referencedColumnNames: ["id"]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey("establishment_address", "fk_establishment_address_establishment_id");
            yield queryRunner.dropTable("establishment_address");
        });
    }
}
exports.establishmentAddress1593531509871 = establishmentAddress1593531509871;
