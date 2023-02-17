const Repairs = require('../models/repairs.model');
const User = require('../models/users.model');

const findAllRepairs = async (req, res) => {
  const allRepairs = await Repairs.findAll({
    where: {
      status: 'pending',
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password', 'status'],
        },
        where: {
          status: 'available',
        },
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'All repairs found were succesfully',
    allRepairs,
  });
};

const findRepair = async (req, res) => {
  const { repair } = req;
  const user = await User.findOne({
    where: {
      id: repair.userId,
      status: 'available',
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'The repair found was succesfully',
    repair,
    user,
  });
};

const createRepair = async (req, res) => {
  const { date, userId, motorsNumber, description } = req.body;
  const newRepair = await Repairs.create({
    date,
    userId,
    motorsNumber,
    description,
  });

  return res.status(500).json({
    status: 'success',
    message: 'The repair was created successfully',
    newRepair,
  });
};

const updateRepair = async (req, res) => {
  const { repair } = req;

  await repair.update({
    status: 'completed',
  });

  return res.status(200).json({
    status: 'success',
    message: 'The repair has been updated successfully'
  });
};

const deleteRepair = async (req, res) => {
  const { repair } = req;
  await repair.update({
    status: 'cancelled',
  });
  res.status(200).json({
    status: 'success',
    message: 'The repair has been deleted succesfully',
  });
};

module.exports = {
  findAllRepairs,
  findRepair,
  createRepair,
  updateRepair,
  deleteRepair,
};
