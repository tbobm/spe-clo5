const Service = require('../models').Service;
const EstablishmentService = require('../models').EstablishmentService;

module.exports = {
    async list(req, res) {
        return await Service
            .findAll({
            })
            .then(async (services) => {
                Promise.all(services.map(service => {
                        return EstablishmentService.findAll({
                            where: {
                                service_id: service.id
                            },
                        })
                    })
                ).then(result => {
                    let test = services.map(service => {
                        result.forEach(items => {
                            if (!items){
                                items = [];
                            }
                            items.forEach(item => {
                                if (item.dataValues.service_id === service.dataValues.id) {
                                    if (typeof service.dataValues.establishments === "undefined") {
                                        service.dataValues.establishments = [];
                                    }
                                    service.dataValues.establishments.push(item);
                                }
                            });
                        });
                        return service;
                    });
                    res.status(200).json({
                        messages: "List of Options",
                        data: test
                    })
                })
            })
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Service
            .findByPk(req.params.id, {
            })
            .then(async (service) => {
                if (!service) {
                    return res.status(404).send({
                        message: 'Option Not Found',
                    });
                }
                let establishments = [];
                await EstablishmentService.findAll({
                    where: {
                        service_id: req.params.id
                    },
                }).then((listEstablishments) => {
                    if (!listEstablishments){
                        listEstablishments = [];
                    }
                    listEstablishments.forEach(establishment => {
                        establishments.push(establishment.dataValues);
                    })
                });
                service.dataValues.establishments = establishments;
                return res.status(200).send(service);
            })
            .catch((error) => {
                res.status(400).send(error)
            });
    },

    add(req, res) {
        return Service
            .create({
                key: req.body.key,
                basePrice: Number(req.body.basePrice),
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .then((course) => res.status(201).send(course))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Service
            .findByPk(req.params.id, {
                include: [{
                    model: EstablishmentService,
                    as: 'establishments'
                }],
            })
            .then(service => {
                if (!service) {
                    return res.status(404).send({
                        message: 'Option Not Found',
                    });
                }
                return service
                    .update({
                        key: req.body.key,
                        basePrice: Number(req.body.basePrice),
                        updatedAt: new Date()
                    })
                    .then(() => res.status(200).json({
                        message: `Updated Option with id ${req.params.id}`,
                        data: service
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Service
            .findByPk(req.params.id)
            .then(course => {
                if (!course) {
                    return res.status(400).send({
                        message: 'Option Not Found',
                    });
                }
                return course
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
