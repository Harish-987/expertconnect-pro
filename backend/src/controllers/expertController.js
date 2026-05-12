const { validationResult } = require('express-validator');
const expertService = require('../services/expertService');
const { success, error } = require('../utils/apiResponse');
const asyncWrapper = require('../middleware/asyncWrapper');

const getExperts = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return error(res, 'Validation failed', 422, errors.array());
  }

  const { search, category, sort, page, limit } = req.query;
  const result = await expertService.getExperts({ search, category, sort, page, limit });
  return success(res, 'Experts fetched successfully', result.experts, 200, result.pagination);
});

const getExpertById = asyncWrapper(async (req, res) => {
  const expert = await expertService.getExpertById(req.params.id);
  if (!expert) return error(res, 'Expert not found', 404);
  return success(res, 'Expert fetched successfully', expert);
});

module.exports = { getExperts, getExpertById };
