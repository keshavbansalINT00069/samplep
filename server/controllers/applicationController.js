const Application = require('../models/Application');
const Job = require('../models/Job');

const applyToJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.status !== 'open') {
      return res.status(400).json({ message: 'Job is no longer open' });
    }

    const existing = await Application.findOne({ job: req.params.id, applicant: req.user.id });
    if (existing) {
      return res.status(409).json({ message: 'Already applied to this job' });
    }

    const application = await Application.create({
      job: req.params.id,
      applicant: req.user.id,
      coverLetter: req.body.coverLetter,
    });

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicant: req.user.id }).populate(
      'job',
      'title company location type status'
    );
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

const getJobApplications = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const applications = await Application.find({ job: req.params.jobId }).populate(
      'applicant',
      'name email'
    );
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

const updateApplicationStatus = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id).populate('job');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    if (application.job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = req.body.status;
    await application.save();
    res.json(application);
  } catch (error) {
    next(error);
  }
};

module.exports = { applyToJob, getMyApplications, getJobApplications, updateApplicationStatus };
