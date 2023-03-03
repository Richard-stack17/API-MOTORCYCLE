const Repairs = require('../models/repairs.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfServiceIsPending = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return next(new AppError('The service is not pending', 400));
  }
  req.repair = repair;
  next();
});
