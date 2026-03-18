const express = require('express');
const router = express.Router();
const { getJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { applyToJob } = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', protect, authorize('employer'), createJob);
router.put('/:id', protect, authorize('employer'), updateJob);
router.delete('/:id', protect, authorize('employer'), deleteJob);
router.post('/:id/apply', protect, authorize('seeker'), applyToJob);

module.exports = router;
