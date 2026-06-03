import type { Request, Response } from "express";
import { issuesService } from "./issues.service";
import type { IIssue } from "./issues.interface";

const createIssue = async (req: Request, res: Response) => {
  try {
    const { title, description, type } = req.body;
    const userId = req.user?.id;

    // Validation
    if (!title || !description || !type) {
      res.status(400).json({
        success: false,
        message: "Title, description, and type are required",
        error: null,
      });
      return;
    }

    if (title.length > 150) {
      res.status(400).json({
        success: false,
        message: "Title must not exceed 150 characters",
        error: null,
      });
      return;
    }

    if (description.length < 20) {
      res.status(400).json({
        success: false,
        message: "Description must be at least 20 characters long",
        error: null,
      });
      return;
    }

    if (!['bug', 'feature_request'].includes(type)) {
      res.status(400).json({
        success: false,
        message: 'Type must be either "bug" or "feature_request"',
        error: null,
      });
      return;
    }

    const issue = await issuesService.createIssue(
      { title, description, type },
      userId
    );

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: issue,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const sort = (req.query.sort as 'newest' | 'oldest') || 'newest';
    const type = req.query.type as string | undefined;
    const status = req.query.status as string | undefined;

    // Validate query params
    if (sort && !['newest', 'oldest'].includes(sort)) {
      res.status(400).json({
        success: false,
        message: 'Sort must be "newest" or "oldest"',
        error: null,
      });
      return;
    }

    if (type && !['bug', 'feature_request'].includes(type)) {
      res.status(400).json({
        success: false,
        message: 'Type must be "bug" or "feature_request"',
        error: null,
      });
      return;
    }

    if (status && !['open', 'in_progress', 'resolved'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Status must be "open", "in_progress", or "resolved"',
        error: null,
      });
      return;
    }

    const issues = await issuesService.getAllIssues(sort, type, status);

    res.status(200).json({
      success: true,
      message: "Issues retrieved successfully",
      data: issues,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getIssueById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const issue = await issuesService.getIssueById(parseInt(id));

    if (!issue) {
      res.status(404).json({
        success: false,
        message: "Issue not found",
        error: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Issue retrieved successfully",
      data: issue,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, type, status } = req.body;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    // Fetch the issue first
    const issue = await issuesService.getIssueByIdForOwnerCheck(parseInt(id));

    if (!issue) {
      res.status(404).json({
        success: false,
        message: "Issue not found",
        error: null,
      });
      return;
    }

    // Authorization: contributor can only update own issue if it's open
    if (userRole === 'contributor') {
      if (issue.reporter_id !== userId) {
        res.status(403).json({
          success: false,
          message: "You can only update your own issues",
          error: null,
        });
        return;
      }

      if (issue.status !== 'open') {
        res.status(409).json({
          success: false,
          message: 'Contributors can only update issues with "open" status',
          error: null,
        });
        return;
      }
    }

    // Validate fields being updated
    if (title !== undefined && title.length > 150) {
      res.status(400).json({
        success: false,
        message: "Title must not exceed 150 characters",
        error: null,
      });
      return;
    }

    if (description !== undefined && description.length < 20) {
      res.status(400).json({
        success: false,
        message: "Description must be at least 20 characters long",
        error: null,
      });
      return;
    }

    if (type !== undefined && !['bug', 'feature_request'].includes(type)) {
      res.status(400).json({
        success: false,
        message: 'Type must be "bug" or "feature_request"',
        error: null,
      });
      return;
    }

    if (status !== undefined && !['open', 'in_progress', 'resolved'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Status must be "open", "in_progress", or "resolved"',
        error: null,
      });
      return;
    }

    const updatedIssue = await issuesService.updateIssue(parseInt(id), {
      title,
      description,
      type,
      status,
    });

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: updatedIssue,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Fetch the issue first to check if it exists
    const issue = await issuesService.getIssueByIdForOwnerCheck(parseInt(id));

    if (!issue) {
      res.status(404).json({
        success: false,
        message: "Issue not found",
        error: null,
      });
      return;
    }

    await issuesService.deleteIssue(parseInt(id));

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const issuesController = {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};