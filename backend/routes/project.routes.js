import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  authMiddleware.authUser, //allows only logged in users to create a project
  body("name").isString().withMessage("Name is required"),
  projectController.createProject
);

router.get(
  "/all",
  authMiddleware.authUser, //allows only logged in users to create a project
  projectController.getAllProjects
);

router.put(
  "/add-user",
  authMiddleware.authUser, ////allows only logged in users to create a project
  body("projectId").isString().withMessage("Project Id is required"),
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users must be an array of strings")
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("Each user must be a string"),
  projectController.addUserToProject
);

router.get('/get-projects/:projectId', authMiddleware.authUser, projectController.getProjectById)

export default router;
