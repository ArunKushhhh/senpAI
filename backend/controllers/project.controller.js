import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import * as ProjectService from "../services/project.service.js";
import { validationResult } from "express-validator";

export const createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const loggedInUser = await User.findOne({ email: req.user.email });

    const userId = loggedInUser._id;
    const newProject = await ProjectService.createProject({ name, userId });
    res.status(201).json(newProject);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const loggedInUser = await User.findOne({
      email: req.user.email,
    });

    const allUserProjects = await ProjectService.getAllProjectByUserId({
      userId: loggedInUser._id,
    });

    return res.status(200).json({ projects: allUserProjects });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

export const addUserToProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId, users } = req.body;

    const loggedInUser = await User.findOne({
      email: req.user.email,
    });

    const project = await ProjectService.addUsersToProject({
      projectId,
      users,
      userId: loggedInUser._id,
    });

    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await ProjectService.getProjectById({ projectId });

    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
