import express from "express";
import projectController from "../controllers/project.controller";

const projectRouter = express.Router();

projectRouter.get('/', projectController.getAllProjects);
projectRouter.get('/length', projectController.getProjectsLength);
projectRouter.get('/:id', projectController.getOneProject);
projectRouter.get('/user/:userId', projectController.getUserProjects);
projectRouter.post('/', projectController.postProject);
projectRouter.patch('/:id', projectController.patchProject);
projectRouter.delete('/:id', projectController.deleteProject)

export default projectRouter;