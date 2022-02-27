import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

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

const deleteJob = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
      throw new CustomError.NotFoundError(`No job with id : ${jobId}`);
    }
    checkPermissions(req.user, job.createdBy);

    await job.remove();
    res.status(StatusCodes.OK).json({ msg: "Job removed" });
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const { search, status, jobType, sort } = req.query;
    const queryObject = { createdBy: req.user.userId };

    if (status !== "all") {
      queryObject.status = status;
    }
    if (jobType !== "all") {
      queryObject.jobType = jobType;
    }
    if (search) {
      queryObject.position = { $regex: search, $options: "i" };
    }

    // NO AWAIT
    let result = Job.find(queryObject);

    //chain conditions
    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      result = result.sort("position");
    }
    if (sort === "a-z") {
      result = result.sort("-position");
    }

    const jobs = await result;
    res
      .status(StatusCodes.OK)
      .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const { company, position } = req.body;

    if (!company || !position) {
      throw new BadRequestError("Please Provide All Values");
    }
    const job = await Job.findOne({ _id: jobId });

    if (!job) {
      throw new NotFoundError(`No job with id: ${jobId}`);
    }

    //check permissions
    checkPermissions(req.user, job.createdBy);

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
      new: true,
      runValidators: true,
    });

    // alternative approach

    // job.position = position;
    // job.company = company;
    // job.jobLocation = jobLocation;
    // await job.save();

    res.status(StatusCodes.OK).json({ updatedJob });
  } catch (error) {
    next(error);
  }
};
const showStats = async (req, res, next) => {
  try {
    let stats = await Job.aggregate([
      { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    //this is to change the array to an object, easily to manipulate on the front
    stats = stats.reduce((acc, curr) => {
      //acc stands for "accumulator"
      //this are the values of each object from the mongoose agreggate
      const { _id: title, count } = curr;

      //this will be the output:
      acc[title] = count;
      return acc;
    }, {});

    const defaultStats = {
      pending: stats.pending || 0,
      interview: stats.interview || 0,
      declined: stats.declined || 0,
    };

    //to get the last six months
    let monthlyApplications = await Job.aggregate([
      { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
        },
      },
      { $limit: 6 },
    ]);

    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;
        const date = moment()
          .month(month - 1) //its because mongo handle 1-12 months, but moment 0-11
          .year(year)
          .format("MMM Y");
        return { date, count };
      })
      .reverse();

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
  } catch (error) {
    next(error);
  }
};
export { createJob, deleteJob, getAllJobs, updateJob, showStats };
