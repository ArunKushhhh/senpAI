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
