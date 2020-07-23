const Eservice = require('../models').EService;

module.exports = {
    list(req, res) {
        return Eservice
            .findAll({})
            .then((eservices) =>
                res.status(200).json({
                    messages: "List of Eservice",
                    data: eservices
                }))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Eservice
            .findByPk(req.params.id)
            .then((service) => {
                if (!service) {
                    return res.status(404).send({
                        message: 'Eservice Service Not Found',
                    });
                }
                return res.status(200).send(service);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return Eservice
            .create({
                key: req.body.key,
                code: req.body.code,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .then((course) => res.status(201).send(course))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Eservice
            .findByPk(req.params.id)
            .then(service => {
                if (!service) {
                    return res.status(404).send({
                        message: 'Eservice Not Found',
                    });
                }
                return service
                    .update({
                        key: req.body.key,
                        code: req.body.code,
                        updatedAt: new Date()
                    })
                    .then(() => res.status(200).json({
                        message: `Updated EService with id ${req.params.id}`,
                        data: service
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Eservice
            .findByPk(req.params.id)
            .then(course => {
                if (!course) {
                    return res.status(400).send({
                        message: 'Eservice Not Found',
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
