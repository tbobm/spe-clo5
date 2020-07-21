const Service = require('../models').Service;
// const Student = require('../models').Student;
// const Lecturer = require('../models').Lecturer;
//
module.exports = {
    list(req, res) {
        return Service
            // .findAll({
            //     include: [{
            //         model: Student,
            //         as: 'students'
            //     },{
            //         model: Lecturer,
            //         as: 'lecturer'
            //     }],
            //     order: [
            //         ['createdAt', 'DESC'],
            //         [{ model: Student, as: 'students' }, 'createdAt', 'DESC'],
            //     ],
            // })
            .findAll()
            .then((courses) => res.status(200).send(courses))
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
                        message: 'Service Not Found',
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
                basePrice: req.body.basePrice
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
            .then(course => {
                if (!course) {
                    return res.status(404).send({
                        message: 'Service Not Found',
                    });
                }
                return course
                    .update({
                        key: req.body.key,
                        basePrice: req.body.basePrice
                    })
                    .then(() => res.status(200).send(course))
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
                        message: 'Service Not Found',
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
