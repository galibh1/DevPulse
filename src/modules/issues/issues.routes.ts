import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from "../../middleware/auth";

const router = Router();

// Public routes
router.get("/", issuesController.getAllIssues);
router.get("/:id", issuesController.getIssueById);

// Protected routes (authentication required)
router.post("/", auth(), issuesController.createIssue);
router.patch("/:id", auth(), issuesController.updateIssue);

// Protected routes (maintainer only)
router.delete("/:id", auth("maintainer"), issuesController.deleteIssue);

export const issuesRoute = router;