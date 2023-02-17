const User = require('../models/users.model');

const findUsers = async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });

  res.status(200).json({
    status: 'succes',
    message: 'The users found were succesfully',
    users,
  });
};

const findUser = async (req, res) => {
  const { user } = req;
  res.status(200).json({
    status: 'success',
    message: 'The user found was succesfully',
    user,
  });
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const newUser = await User.create({
    name: name.toLowerCase(),
    email,
    password,
    role,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user was created successfully',
    newUser,
  });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;

  const updatedUser = await user.update({
    name,
    email,
  });

  res.json(200).json({
    status: 'success',
    message: 'The user has been updated successfully',
    updatedUser,
  });
};

const deleteUser = async (req, res) => {
  const { user } = req;
  const deletedUser = await user.update({ status: 'unavailable' });
  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted succesfully',
    deletedUser,
  });
};

module.exports = {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
};
