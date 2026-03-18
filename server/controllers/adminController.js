const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Job.deleteMany({ employer: req.params.id });
    await Application.deleteMany({ applicant: req.params.id });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate('employer', 'name email');
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    await Application.deleteMany({ job: req.params.id });
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, deleteUser, getJobs, deleteJob };
