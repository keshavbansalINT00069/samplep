const express = require('express');
const router = express.Router();
const { getMyApplications, getJobApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.get('/me', protect, authorize('seeker'), getMyApplications);
router.get('/job/:jobId', protect, authorize('employer'), getJobApplications);
router.patch('/:id/status', protect, authorize('employer'), updateApplicationStatus);

module.exports = router;
