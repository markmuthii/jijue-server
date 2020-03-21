const router = require('express').Router();

const {
  getPatientMessages,
  saveUserMessages,
  getAllMessages,
  getDoctorMessages
} = require('../controllers/messages');

router
  .route('/')
  .get(getAllMessages)
  .post(saveUserMessages);

router.get('/patient/:patientId', getPatientMessages);

router.get('/doctor/:doctorId/:patientId', getDoctorMessages);

module.exports = router;
