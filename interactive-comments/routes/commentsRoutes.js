import express from 'express';
const router = express.Router()

import {createComment, updateComment,deleteComment } from '../controllers/commentsController.js'

router.route('/').post(createComment)
router.route('/:id').patch(updateComment).delete(deleteComment)
export default router