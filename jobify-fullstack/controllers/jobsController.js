import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createJob = async (req, res, next) => {
  try {
    const { position, company } = req.body;

    if (!position || !company) {
      throw new BadRequestError("Please provide all values");
    }

    //to include the Id referred to whom created the job
    //this comes from the Authentication middleware
    req.body.createdBy = req.user.userId;
    console.log(req.user);

    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    next(error);
  }
};
const deleteJob = async (req, res) => {
  res.send("deleteJob");
};
const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId });
    res
      .status(StatusCodes.OK)
      .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res) => {
  res.send("updateJob");
};
const showStats = async (req, res) => {
  res.send("showStats");
};
export { createJob, deleteJob, getAllJobs, updateJob, showStats };
