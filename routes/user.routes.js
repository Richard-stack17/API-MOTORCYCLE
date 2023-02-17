const { Router } = require('express');
const { check } = require('express-validator');
const {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
const {
  validUserById,
  validIfExistUserEmail,
} = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findUsers);
router.get('/:id', validUserById, findUser);
router.post(
  '/',
  [
    check('name', 'the name must be required').not().isEmpty(),
    check('email', 'the email must be required').not().isEmpty(),
    check('email', 'the email must be a correct format').isEmail(),
    check('password', 'the password must be required').not().isEmpty(),
    validateFields,
  ],
  createUser
);
router.patch(
  '/:id',
  [
    check('name', 'the name must be required').not().isEmpty(),
    check('email', 'the email must be required').not().isEmpty(),
    check('email', 'the email must be a correct format').isEmail(),
    validateFields,
    validUserById,
    validIfExistUserEmail,
  ],
  updateUser
);
router.delete('/:id', validUserById, deleteUser);

module.exports = {
  usersRouter: router,
};
