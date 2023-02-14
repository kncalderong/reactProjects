import express from 'express';
const router = express.Router()

import {createComment, updateComment,deleteComment, getAllComments } from '../controllers/commentsController.js'

router.route('/').post(createComment).get(getAllComments)
router.route('/:id').patch(updateComment).delete(deleteComment)
export default router