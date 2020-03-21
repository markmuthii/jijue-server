const router = require('express').Router();
const { addUserRole, getUserRoles } = require('../controllers/roles');

router
  .route('/')
  .get(getUserRoles)
  .post(addUserRole);

module.exports = router;
