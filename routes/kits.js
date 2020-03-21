const router = require('express').Router();
const {
  getAllKits,
  registerKit,
  getKitsByUserId
} = require('../controllers/kits');

router
  .route('/')
  .get(getAllKits)
  .post(registerKit);

//Path eg: /kits/5e675d0fae03022bb8411b8a
router.get('/:userId', getKitsByUserId);

module.exports = router;
