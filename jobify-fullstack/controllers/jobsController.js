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
const getAllJobs = async (req, res) => {
  res.send("getAllJobs");
};

const updateJob = async (req, res) => {
  res.send("updateJob");
};
const showStats = async (req, res) => {
  res.send("showStats");
};
export { createJob, deleteJob, getAllJobs, updateJob, showStats };
