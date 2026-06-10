// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  // Auth messages
  SIGNUP_SUCCESS: "User registered successfully!",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",

  // Issues messages
  ISSUE_CREATED: "Issue created successfully",
  ISSUE_RETRIEVED: "Issue retrieved successfully",
  ISSUES_RETRIEVED: "Issues retrieved successfully",
  ISSUE_UPDATED: "Issue updated successfully",
  ISSUE_DELETED: "Issue deleted successfully",

  // Generic messages
  RECORD_CREATED: "Record created successfully",
  RECORD_UPDATED: "Record updated successfully",
  RECORD_DELETED: "Record deleted successfully",
  RECORD_RETRIEVED: "Record retrieved successfully",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  // Auth errors
  INVALID_CREDENTIALS: "Invalid Credentials!",
  USER_NOT_FOUND: "User not found!",
  UNAUTHORIZED_ACCESS: "Unauthorized access!",
  TOKEN_EXPIRED: "Token has expired!",
  INVALID_TOKEN: "Invalid token!",
  USER_ALREADY_EXISTS: "User already exists!",

  // Validation errors
  INVALID_EMAIL: "Invalid email format",
  WEAK_PASSWORD: "Password is too weak",
  INVALID_NAME: "Invalid name",
  INVALID_ROLE: "Invalid role",
  INVALID_ISSUE_TITLE: "Invalid issue title",
  INVALID_ISSUE_DESCRIPTION: "Invalid issue description",
  INVALID_ISSUE_TYPE: "Invalid issue type",
  INVALID_ISSUE_STATUS: "Invalid issue status",

  // Issues errors
  ISSUE_NOT_FOUND: "Issue not found",
  CANNOT_UPDATE_ISSUE: "You can only update your own issues",
  CANNOT_DELETE_ISSUE: "You can only delete your own issues or you need to be a maintainer",
  CANNOT_UPDATE_RESOLVED_ISSUE: "Cannot update a resolved issue",

  // Permission errors
  FORBIDDEN: "Forbidden! This role does not have access",
  INSUFFICIENT_PERMISSIONS: "You do not have permission to perform this action",

  // Generic errors
  RECORD_NOT_FOUND: "Record not found",
  RECORD_ALREADY_EXISTS: "Record already exists",
  INTERNAL_SERVER_ERROR: "Internal server error. Please try again later",
} as const;

// Roles
export const ROLES = {
  CONTRIBUTOR: "contributor",
  MAINTAINER: "maintainer",
} as const;

// Issue Types
export const ISSUE_TYPES = {
  BUG: "bug",
  FEATURE_REQUEST: "feature_request",
} as const;

// Issue Status
export const ISSUE_STATUS = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// Token expiration
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: "1d",
  REFRESH_TOKEN: "7d",
} as const;

// Regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
  PHONE: /^[0-9]{10}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
} as const;

// API response limits
export const LIMITS = {
  NAME_MAX: 255,
  ISSUE_TITLE_MAX: 150,
  ISSUE_TITLE_MIN: 5,
  ISSUE_DESCRIPTION_MAX: 5000,
  ISSUE_DESCRIPTION_MIN: 20,
} as const;