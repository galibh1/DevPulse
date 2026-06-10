import { Router } from "express";
import {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
} from "./issues.controller";
import { auth } from "../../middleware/auth";

export const issuesRoute = Router();

issuesRoute.post("/", auth, createIssue);
issuesRoute.get("/", getAllIssues);
issuesRoute.get("/:id", getSingleIssue);
issuesRoute.patch("/:id", auth, updateIssue);
issuesRoute.delete("/:id", auth, deleteIssue);