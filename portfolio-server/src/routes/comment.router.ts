import express from "express";
import commentController from "../controllers/comment.controller";

const commentRouter = express.Router();

commentRouter.get('/', commentController.getAllComments);
commentRouter.get('/length', commentController.getCommentsLength);
commentRouter.get('/:id', commentController.getOneComment);
commentRouter.get('/user/:userId', commentController.getUserComments);
commentRouter.post('/', commentController.postComment);
commentRouter.patch('/:id', commentController.patchComment);
commentRouter.delete('/:id', commentController.deleteComment)

export default commentRouter;