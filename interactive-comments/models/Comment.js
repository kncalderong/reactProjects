import mongoose from "mongoose";


const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide a user']
    },
    createdAt: {
      type: String,
      required: true,
      immutable: true,
      default: () => new Date().toLocaleString()
    },
    score: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      maxlength: 500
    },
    answers: [{
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        maxlength: 500,
      },
      createdAt: {
        type: String,
        required: true,
        immutable: true,
        default: () => new Date().toLocaleString()
      },
      score: {
        type: Number
      },
    }]
  }
)

export default mongoose.model('Comment', commentSchema)