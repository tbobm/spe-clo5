const Model = require('../models').ModelOption;

module.exports = {
    list(req, res) {
        return Model
            .findAll({})
            .then((models) =>
                res.status(200).json({
                    messages: "List of Models",
                    data: models
                }))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Model
            .findByPk(req.params.id)
            .then((service) => {
                if (!service) {
                    return res.status(404).send({
                        message: 'Model Not Found',
                    });
                }
                return res.status(200).send(service);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return Model
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
        return Model
            .findByPk(req.params.id)
            .then(model => {
                if (!model) {
                    return res.status(404).send({
                        message: 'Model Not Found',
                    });
                }
                return model
                    .update({
                        key: req.body.key,
                        code: req.body.code,
                        updatedAt: new Date()
                    })
                    .then(() => res.status(200).json({
                        message: `Updated Model with id ${req.params.id}`,
                        data: model
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Model
            .findByPk(req.params.id)
            .then(course => {
                if (!course) {
                    return res.status(400).send({
                        message: 'Model Not Found',
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
