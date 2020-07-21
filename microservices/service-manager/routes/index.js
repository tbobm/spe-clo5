var express = require('express');
var router = express.Router();

const serviceController = require('../controllers').service;
const establishmentServiceController = require('../controllers').establishment_service;
// const lecturerController = require('../controllers').lecturer;
// const courseController = require('../controllers').course;

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.status(200).json({ title: 'Express' });
// });

/* General Router */
router.get('/', serviceController.list);

/* Service Router */
router.get('/api/service', serviceController.list);
router.get('/api/service/:id', serviceController.getById);
router.post('/api/service', serviceController.add);
router.put('/api/service/:id', serviceController.update);
router.delete('/api/service/:id', serviceController.delete);

/* EstablishmentService Router */
router.get('/api/establishment_service', establishmentServiceController.list);
router.get('/api/establishment_service/:id', establishmentServiceController.getById);
router.post('/api/establishment_service', establishmentServiceController.add);
router.put('/api/establishment_service/:id', establishmentServiceController.update);
router.delete('/api/establishment_service/:id', establishmentServiceController.delete);

/* Lecturer Router */
// router.get('/api/lecturer', lecturerController.list);
// router.get('/api/lecturer/:id', lecturerController.getById);
// router.post('/api/lecturer', lecturerController.add);
// router.put('/api/lecturer/:id', lecturerController.update);
// router.delete('/api/lecturer/:id', lecturerController.delete);

/* Course Router */
// router.get('/api/course', courseController.list);
// router.get('/api/course/:id', courseController.getById);
// router.post('/api/course', courseController.add);
// router.put('/api/course/:id', courseController.update);
// router.delete('/api/course/:id', courseController.delete);

/* Advance Router */
// router.post('/api/student/add_course', studentController.addCourse);
// router.post('/api/classroom/add_with_students', classroomController.addWithStudents);
// router.post('/api/lecturer/add_with_course', lecturerController.addWithCourse);

module.exports = router;
