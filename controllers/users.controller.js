const User = require('../models/users.model');

const findUsers = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findAll({
      where: {
        id,
        status: 'available',
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'The user found was succesfully',
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
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
  const { id } = req.params;
  const { name, email } = req.body;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user was not found',
    });
  }

  const updatedUser = await user.update({
    name,
    email,
  });

  res.json(200).json({
    status: 'success',
    message: 'The user has been updated successfully',
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user was not found',
    });
  }
  await user.update({ status: 'unavailable' });
  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted succesfully',
    id,
  });
};

module.exports = {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
};
