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
class address1593633409487 {
    constructor() {
        this.name = 'address1593633409487';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const increment = "increment";
            yield queryRunner.createTable(new typeorm_1.Table({
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
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("address");
        });
    }
}
exports.address1593633409487 = address1593633409487;
