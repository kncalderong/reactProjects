import Comment from '../models/Comment.js'
import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
} from '../errors/index.js';
import mongoose from 'mongoose';

//Create Comment
const createComment = async (req, res) => {
  const {
    user: commentUser,
    score: commentScore,
    text: commentText,
    answers
  } = req.body

  if (!commentUser || commentText.length < 1) {
    throw new BadRequestError('Please provide all required values')
  }

  if (commentText.length >= 500) {
    throw new BadRequestError('The length limit for comments is 500 characters')
  }
  
  const userId = mongoose.Types.ObjectId(commentUser)
  const commentCreated = new Comment({
    user: userId,
    score: commentScore,
    text: commentText,
    answers: answers
  })
  await commentCreated.save()
  res.status(StatusCodes.CREATED).json({
    commentCreated
  })
}

//Add reply || editComment || addScore || addScoreInReply || deleteReply
const updateComment = async (req, res) => {
  const { id: commentId } = req.params
  const {
    text: commentText,
    score: commentScore,
    answers
  } = req.body

  if (!commentText || !commentScore || !answers) {
    throw new BadRequestError('Please provide all values');
  }

  const comment = await Comment.findOne({ _id: commentId })

  if (!comment) {
    throw new NotFoundError(`No comment with id: ${commentId}`)
  }

  answers.user = mongoose.Types.ObjectId(answers.user)
  const updatedComment = await Comment.findOneAndUpdate({ _id: commentId }, {
    commentText,
    commentScore,
    answers
  }, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedComment });
}

//delete comment
const deleteComment = async (req, res) => {
  const { id: commentId } = req.params
  const comment = await Comment.findOne({ _id: commentId })

  if (!comment) {
    throw new NotFoundError(`No comment with id: ${commentId}`)
  }

  await comment.remove()

  res.status(StatusCodes.OK).json({
    msg: 'Success! Comment removed'
  })
}

//get all comments
const getAllComments = async (req, res) => {
  const { sort,  search } = req.query;
  
  const queryObject = {};
  
  if (search) {
    queryObject.text = { $regex: search, $options: 'i' };
  }
  
  //to populate with users Info from another collection of documents 'User'
  let result = Comment.find(queryObject).populate('user').populate({
    path: 'answers',
    populate: { path: 'user'}
  })
  
  //To sort
  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  
  //Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  result = result.skip(skip).limit(limit);
  
  const comments = await result
  const totalComments = await Comment.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalComments / limit);
  
  res.status(StatusCodes.OK).json({
    comments,
    totalComments,
    numOfPages
  })
}

export { createComment, updateComment, deleteComment, getAllComments }

