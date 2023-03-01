const { Router } = require('express');
const { check } = require('express-validator');
const { login, createUser } = require('../controllers/auth.controller');
const { validIfExistUserEmail } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.post(
  '/signup',
  [
    check('name', 'the name must be required').not().isEmpty(),
    check('email', 'the email must be required').not().isEmpty(),
    check('email', 'the email must be a correct format').isEmail(),
    check('password', 'the password must be required').not().isEmpty(),
    validateFields,
    validIfExistUserEmail,
  ],
  createUser
);

router.post(
  '/login',
  [
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = {
  authRouter: router,
};
