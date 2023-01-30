const { Router } = require('express');
const {
  findRepair,
  findAllRepairs,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');

const router = Router();

router.get('/', findAllRepairs);
router.get('/:id', findRepair);
router.post('/', createRepair);
router.patch('/:id', updateRepair);
router.delete('/:id', deleteRepair);

module.exports = {
  repairsRouter: router,
};
