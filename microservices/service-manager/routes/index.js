var express = require('express');
var router = express.Router();

const serviceController = require('../controllers').service;
const establishmentServiceController = require('../controllers').establishment_service;
const eServiceController = require('../controllers').eservice;
const modelServiceController = require('../controllers').model;
// const lecturerController = require('../controllers').lecturer;
// const courseController = require('../controllers').course;

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.status(200).json({ title: 'Express' });
// });

/* General Router */
router.get('/', serviceController.list);

/* Service Router */
router.get('/', serviceController.list);
router.get('/:id', serviceController.getById);
router.post('/', serviceController.add);
router.put('/:id', serviceController.update);
router.delete('/:id', serviceController.delete);

/* EstablishmentService Router */
router.get('/api/establishment_service', establishmentServiceController.list);
router.get('/api/establishment_service/:id', establishmentServiceController.getById);
router.post('/api/establishment_service', establishmentServiceController.add);
router.put('/api/establishment_service/:id', establishmentServiceController.update);
router.delete('/api/establishment_service/:id', establishmentServiceController.delete);

/* Lecturer Router */
router.get('/api/eservice', eServiceController.list);
router.get('/api/eservice/:id', eServiceController.getById);
router.post('/api/eservice', eServiceController.add);
router.put('/api/eservice/:id', eServiceController.update);
router.delete('/api/eservice/:id', eServiceController.delete);

/* Course Router */
router.get('/api/model', modelServiceController.list);
router.get('/api/model/:id', modelServiceController.getById);
router.post('/api/model', modelServiceController.add);
router.put('/api/model/:id', modelServiceController.update);

module.exports = router;
