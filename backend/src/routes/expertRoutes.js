const router = require('express').Router();
const { getExperts, getExpertById } = require('../controllers/expertController');
const { getExpertsQueryRules } = require('../validators/expertValidator');

router.get('/', getExpertsQueryRules, getExperts);
router.get('/:id', getExpertById);

module.exports = router;
