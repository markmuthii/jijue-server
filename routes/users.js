const router = require('express').Router();

const {
  getUsersByRoleName,
  getAllUsers,
  updateUser,
  getDoctorsPatients
} = require('../controllers/users');

router.get('/all', getAllUsers);

router.get('/role/:roleName', getUsersByRoleName);

router.get('/patients/:doctorId', getDoctorsPatients);

router.post('/update', updateUser);

module.exports = router;
