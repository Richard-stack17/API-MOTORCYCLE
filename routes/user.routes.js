const { Router } = require('express');
const { check } = require('express-validator');
const {
  findUsers,
  findUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
const {
  protectAccountOwner,
  protect,
} = require('../middlewares/auth.middleware');
const {
  validUserById,
  validIfExistUserEmail,
} = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findUsers);
router.get('/:id', validUserById, findUser);

router.use(protect);

router.patch(
  '/:id',
  [
    check('name', 'the name must be required').not().isEmpty(),
    check('email', 'the email must be required').not().isEmpty(),
    check('email', 'the email must be a correct format').isEmail(),
    validateFields,
    validUserById,
    validIfExistUserEmail,
    protectAccountOwner,
  ],
  updateUser
);
router.delete('/:id', validUserById, protectAccountOwner, deleteUser);

module.exports = {
  usersRouter: router,
};
