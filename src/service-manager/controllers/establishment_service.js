const EstablishmentService = require('../models').EstablishmentService;

module.exports = {
    list(req, res) {
        return EstablishmentService
            .findAll({
            })
            .then((services) =>
                res.status(200).json({
                messages: "List of establishment_service",
                data: services
            }))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return EstablishmentService
            .findByPk(req.params.id)
            .then((service) => {
                if (!service) {
                    return res.status(404).send({
                        message: 'Establishment Service Not Found',
                    });
                }
                return res.status(200).send(service);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return EstablishmentService
            .create({
                establishment_id: req.body.establishment_id,
                service_id: req.body.service_id,
                override_price: req.body.override_price,
                model: req.body.model,
                interval: req.body.interval,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .then((course) => res.status(201).send(course))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return EstablishmentService
            .findByPk(req.params.id)
            .then(service => {
                if (!service) {
                    return res.status(404).send({
                        message: 'Establishment Service Not Found',
                    });
                }
                return service
                    .update({
                        establishment_id: req.body.establishment_id,
                        service_id: Number(req.body.service_id),
                        overridePrice: req.body.overridePrice,
                        model: req.body.model,
                        interval: req.body.interval,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })
                    .then(() => res.status(200).json({
                        message: `Updated Establishment Service with id ${req.params.id}`,
                        data: service
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return EstablishmentService
            .findByPk(req.params.id)
            .then(course => {
                if (!course) {
                    return res.status(400).send({
                        message: 'Establishment Service Not Found',
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
