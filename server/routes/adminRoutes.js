const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getJobs, deleteJob } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect, authorize('admin'));

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.get('/jobs', getJobs);
router.delete('/jobs/:id', deleteJob);

module.exports = router;
