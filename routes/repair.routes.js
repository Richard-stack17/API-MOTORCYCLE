const { Router } = require('express');
const { check } = require('express-validator');
const {
  findRepair,
  findAllRepairs,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');
const { restrictTo, protect } = require('../middlewares/auth.middleware');
const {
  validIfServiceIsPending,
} = require('../middlewares/repairs.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.use(protect);

router.get('/', restrictTo('employee'), findAllRepairs);
router.get('/:id', restrictTo('employee'), validIfServiceIsPending, findRepair);
router.post(
  '/',
  [
    check('date', 'the date is required').not().isEmpty(),
    check('userId', 'the userId is required').not().isEmpty(),
    check('userId', 'the userId must be a number').isNumeric(),
    check('motorsNumber', 'the number of motors is required').not().isEmpty(),
    check('motorsNumber', 'the number of motors  must be a number').isNumeric(),
    check('description', 'The description is required').not().isEmpty(),
    validateFields,
  ],
  createRepair
);
router.patch(
  '/:id',
  restrictTo('employee'),
  validIfServiceIsPending,
  updateRepair
);
router.delete(
  '/:id',
  restrictTo('employee'),
  validIfServiceIsPending,
  deleteRepair
);

module.exports = {
  repairsRouter: router,
};
