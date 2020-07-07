import { Application } from "../app";
import { expect } from "chai";
import { describe, it } from "mocha";
import  sinon from "sinon";
import { EstablishmentRepository } from "../models/repositories/EstablishmentRepository";
import { Establishment } from "../models/entities/Establishment";
import fs from "fs";
import { EstablishmentAddress } from "../models/entities/EstablishmentAddress";
import { EstablishmentService } from "../models/entities/EstablishmentService";
import supertest from "supertest";

describe("TEST - ESTABLISHMENT CONTROLLER", () => {
    const app = new Application();
    const sum = (a: number, b: number) => a + b
    const MOCK_REPOSITORY = `${__dirname}/mock`;
    let repository : EstablishmentRepository = null; 


    before(async () => {
        await app.start();

        repository = app.container.resolve("establishmentRepository");
        sinon.stub(repository, "count").callsFake((param) => {
            return (Promise.resolve(12));
        });
        sinon.stub(repository, "find").callsFake((param) => {
            const tab = [];
            const filename = `${MOCK_REPOSITORY}/Establishments.json`
            const data = fs.readFileSync(filename, {
                encoding: "utf8"
            });
            const arr = JSON.parse(data);

            for (let item of arr){
                const establishment = new Establishment();

                establishment.id = item.id;
                establishment.name = item.name;
                establishment.phoneNumber = item.phoneNumber;
                establishment.addresses = item.addresses.map((addr: any)  => {
                    const establishmentAddress = new EstablishmentAddress();

                    establishmentAddress.addressId = addr.addressId;
                    establishmentAddress.establishment = establishment;
                    establishmentAddress.establishmentId = establishment.id;
                    return (establishmentAddress);
                });
                establishment.services = item.services.map((service: any) => {
                    const establishmentService = new EstablishmentService();

                    establishmentService.establishment = establishment;
                    establishmentService.establishmentId = establishment.id;
                    establishmentService.interval = service.interval;
                    establishmentService.model = service.model;
                    establishmentService.overridePrice = service.overridePrice;
                    return (establishmentService);
                });
                tab.push(establishment);
            }
            return (Promise.resolve(arr));
        });
        sinon.stub(repository, "findOne").callsFake((param) => {
            const filename = `${MOCK_REPOSITORY}/EstablishmentId.json`
            const data = fs.readFileSync(filename, {
                encoding: "utf8"
            });
            const establishment = new Establishment();
            const o = JSON.parse(data);

            establishment.id = o.id;
            establishment.name = o.name;
            establishment.phoneNumber = o.phoneNumber;
            establishment.addresses = o.addresses.map((addr: any) => {
                const establishmentAddress = new EstablishmentAddress();

                establishmentAddress.addressId = addr.addressId;
                establishmentAddress.establishment = establishment;
                establishmentAddress.establishmentId = establishment.id;
                return (establishmentAddress);
            });
            establishment.services = o.services.map((service: any) => {
                const establishmentService = new EstablishmentService();

                establishmentService.establishment = establishment;
                establishmentService.establishmentId = establishment.id;
                establishmentService.interval = service.interval;
                establishmentService.model = service.model;
                establishmentService.overridePrice = service.overridePrice;
                establishmentService.serviceId = service.serviceId;
                return (establishmentService);
            });
            return (Promise.resolve(establishment));
        });
    });

    after(async () => {
        await app.stop();
    })

    it("1+1=2",  (done) => {
        expect(sum(1, 1)).equal(2)
        done()
    })

    it("1+2=3", (done) => {
        expect(sum(1, 2)).equal(3)
        done()
    });

    it("stub works", async () => {
        const nb = await repository.count();

        expect(nb).equal(12);
    });

    it("details establishment", (done) => {
        console.log(`http://localhost:${process.env.PORT}/`);
        supertest(app.app).get(`/`).expect(200).then(response => {
            const body = response.body;
            const establishments = body.data;
            const filename = `${MOCK_REPOSITORY}/Establishments.json`
            const data = fs.readFileSync(filename, {
                encoding: "utf8"
            });
            const arr = JSON.parse(data);
            for (let i = 0; i < arr.length; i++){
                let o = arr[i];

                for (let key in o){
                    if (key == "addresses"){
                        let addresses = o[key];

                        for (let i = 0; i < addresses.length; i++){
                            const addr = addresses[i];

                            for (let k in addr){
                                expect(addr[k], establishments[i]["addresses"][i][k]);
                            }
                        }
                    }
                    else if (key == "services"){
                        let services = o[key];

                        for (let i = 0; i < services.length; i++){
                            const service = services[i];

                            for (let k in service){
                                expect(service[k], establishments[i]["services"][i][k]);
                            }
                        }
                    }
                    else {
                        expect(o[key]).equal(establishments[i][key]);
                    }
                }
            }
            done();
        }).catch((error) => {
            expect(error).equal(null);
            done();
        });
    });
});

