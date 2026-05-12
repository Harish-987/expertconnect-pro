const { body, query } = require('express-validator');

const createExpertRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['Technology', 'Business', 'Finance', 'Design', 'Marketing', 'Legal', 'Health', 'Education'])
    .withMessage('Invalid category'),
  body('bio').trim().notEmpty().withMessage('Bio is required'),
  body('experience').isInt({ min: 0 }).withMessage('Experience must be a non-negative integer'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
];

const getExpertsQueryRules = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be 1–50'),
  query('sort')
    .optional()
    .isIn(['rating', '-rating', 'price', '-price', 'experience', '-experience', 'name', '-name'])
    .withMessage('Invalid sort value'),
];

module.exports = { createExpertRules, getExpertsQueryRules };
