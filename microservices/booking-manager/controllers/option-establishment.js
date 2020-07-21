const Service = require('../models').service;
const OptionEstablishment = require('../models').establishment_service;

module.exports = {
    list(req, res) {
        return Service
            // .findAll({
            //     include: [{
            //         model: Student,
            //         as: 'students'
            //     }],
            //     order: [
            //         ['createdAt', 'DESC'],
            //         [{ model: Student, as: 'students' }, 'createdAt', 'DESC'],
            //     ],
            // })
            .findAll()
            .then((services) => res.status(200).json({
                messages: "List of Options",
                data: services
            }))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Service
            // .findByPk(req.params.id, {
            //     include: [{
            //         model: Course,
            //         as: 'course'
            //     }],
            // })
            .findByPk(req.params.id)
            .then((service) => {
                if (!service) {
                    return res.status(404).send({
                        message: 'Option Not Found',
                    });
                }
                return res.status(200).send(service);
            })
            .catch((error) => res.status(400).send(error));
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
            // .findByPk(req.params.id, {
            //     include: [{
            //         model: Course,
            //         as: 'course'
            //     }],
            // })
            .findByPk(req.params.id)
            .then(service => {
                if (!service) {
                    return res.status(404).send({
                        message: 'Option Not Found',
                    });
                }
                return service
                    .update({
                        key: req.body.key,
                        basePrice: req.body.basePrice
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
