const Repairs = require('../models/repairs.model');

const findAllRepairs = async (req, res) => {
  try {
    const allRepairs = await Repairs.findAll({
      where: {
        status: 'pending',
      },
    });

    res.status(200).json({
      status: 'succes',
      message: 'All repairs found were succesfully',
      allRepairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const findRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'The repair found was succesfully',
      repair,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const createRepair = async (req, res) => {
  const { date, userId } = req.body;
  const newRepair = await Repairs.create({
    date,
    userId,
  });

  return res.status(500).json({
    status: 'success',
    message: 'The repair was created successfully',
    newRepair,
  });
};

const updateRepair = async (req, res) => {
  const { id } = req.params;

  const repair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
  });
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair was not found',
    });
  }
  const updatedRepair = await repair.update({
    status: 'completed',
  });

  return res.json(200).json({
    status: 'success',
    message: 'The repair has been updated successfully',
    updatedRepair,
  });
};

const deleteRepair = async (req, res) => {
  const { id } = req.params;
  const repair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
  });
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair was not found',
    });
  }
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
