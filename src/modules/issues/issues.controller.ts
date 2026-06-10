import type { Response } from "express";
import { issuesService } from "./issues.service";
import {
  sendSuccess,
  sendError,
  validateIssueTitle,
  validateIssueDescription,
  validateIssueType,
  validateIssueStatus,
  asyncHandler,
  calculatePagination,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  Logger,
  type IAuthRequest,
} from "../../utils";

export const createIssue = asyncHandler(
  async (req: IAuthRequest, res: Response) => {
    const { title, description, type } = req.body;
    const userId = req.user?.id;

    const titleError = validateIssueTitle(title);
    if (titleError) {
      return sendError(res, HTTP_STATUS.BAD_REQUEST, titleError);
    }

    const descError = validateIssueDescription(description);
    if (descError) {
      return sendError(res, HTTP_STATUS.BAD_REQUEST, descError);
    }

    if (!validateIssueType(type)) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_ISSUE_TYPE
      );
    }

    const result = await issuesService.createIssue(
      { title, description, type },
      userId!
    );

    Logger.logIssue("created", result.id, userId!);
    return sendSuccess(
      res,
      HTTP_STATUS.CREATED,
      SUCCESS_MESSAGES.ISSUE_CREATED,
      result
    );
  }
);

export const getAllIssues = asyncHandler(
  async (req: IAuthRequest, res: Response) => {
    const { page = 1, limit = 10, sort = "newest", type, status } = req.query;

    const { offset, limit: validLimit } = calculatePagination(
      parseInt(page as string),
      parseInt(limit as string)
    );

    const issues = await issuesService.getAllIssues(
      (sort as "newest" | "oldest") || "newest",
      type as string,
      status as string
    );

    const paginatedIssues = issues.slice(offset, offset + validLimit);

    Logger.info("Retrieved all issues");
    return sendSuccess(
      res,
      HTTP_STATUS.OK,
      SUCCESS_MESSAGES.ISSUES_RETRIEVED,
      paginatedIssues
    );
  }
);

export const getSingleIssue = asyncHandler(
  async (req: IAuthRequest, res: Response) => {
    const id = req.params.id as string;

    const issue = await issuesService.getIssueById(parseInt(id));
    if (!issue) {
      return sendError(
        res,
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.ISSUE_NOT_FOUND
      );
    }

    return sendSuccess(
      res,
      HTTP_STATUS.OK,
      SUCCESS_MESSAGES.ISSUE_RETRIEVED,
      issue
    );
  }
);

export const updateIssue = asyncHandler(
  async (req: IAuthRequest, res: Response) => {
    const id = req.params.id as string;
    const { title, description, type, status } = req.body;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (title) {
      const titleError = validateIssueTitle(title);
      if (titleError) {
        return sendError(res, HTTP_STATUS.BAD_REQUEST, titleError);
      }
    }

    if (description) {
      const descError = validateIssueDescription(description);
      if (descError) {
        return sendError(res, HTTP_STATUS.BAD_REQUEST, descError);
      }
    }

    if (type && !validateIssueType(type)) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_ISSUE_TYPE
      );
    }

    if (status && !validateIssueStatus(status)) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_ISSUE_STATUS
      );
    }

    const issue = await issuesService.getIssueByIdForOwnerCheck(parseInt(id));
    if (!issue) {
      return sendError(
        res,
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.ISSUE_NOT_FOUND
      );
    }

    if (issue.reporter_id !== userId && userRole !== "maintainer") {
      return sendError(
        res,
        HTTP_STATUS.FORBIDDEN,
        ERROR_MESSAGES.CANNOT_UPDATE_ISSUE
      );
    }

    const result = await issuesService.updateIssue(parseInt(id), {
      title,
      description,
      type,
      status,
    });

    Logger.logIssue("updated", parseInt(id), userId!);
    return sendSuccess(
      res,
      HTTP_STATUS.OK,
      SUCCESS_MESSAGES.ISSUE_UPDATED,
      result
    );
  }
);

export const deleteIssue = asyncHandler(
  async (req: IAuthRequest, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    const issue = await issuesService.getIssueByIdForOwnerCheck(parseInt(id));
    if (!issue) {
      return sendError(
        res,
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.ISSUE_NOT_FOUND
      );
    }

    if (issue.reporter_id !== userId && userRole !== "maintainer") {
      return sendError(
        res,
        HTTP_STATUS.FORBIDDEN,
        ERROR_MESSAGES.CANNOT_DELETE_ISSUE
      );
    }

    await issuesService.deleteIssue(parseInt(id));
    Logger.logIssue("deleted", parseInt(id), userId!);
    return sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.ISSUE_DELETED);
  }
);

export const issuesController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};