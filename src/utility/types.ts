import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

// Extended JWT Payload
export interface IAuthUser extends JwtPayload {
  id: number;
  name: string;
  email: string;
  role: "contributor" | "maintainer";
}

// Extended Express Request with user
export interface IAuthRequest extends Request {
  user?: IAuthUser;
}

// Pagination Query
export interface IPaginationQuery {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
  sortBy?: string;
}

// API Response wrapper
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error Response
export interface IErrorResponse {
  success: false;
  message: string;
  error: any;
  data?: null;
}

// Success Response
export interface ISuccessResponse<T = any> {
  success: true;
  message: string;
  data?: T;
  error?: null;
}

// User types
export interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: "contributor" | "maintainer";
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserSignup extends IUserLogin {
  name: string;
  role?: "contributor" | "maintainer";
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  role: "contributor" | "maintainer";
  created_at: string;
  updated_at: string;
}

// Issue types
export interface IIssue {
  id?: number;
  title: string;
  description: string;
  type: "bug" | "feature_request";
  status?: "open" | "in_progress" | "resolved";
  reporter_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IIssueResponse extends IIssue {
  reporter?: {
    id: number;
    name: string;
    role: string;
  };
}

export interface IIssueCreate {
  title: string;
  description: string;
  type: "bug" | "feature_request";
}

export interface IIssueUpdate {
  title?: string;
  description?: string;
  type?: "bug" | "feature_request";
  status?: "open" | "in_progress" | "resolved";
}

export interface IIssueFilter {
  type?: "bug" | "feature_request";
  status?: "open" | "in_progress" | "resolved";
  reporter_id?: number;
}

export interface IIssueQuery extends IPaginationQuery, IIssueFilter {
  sort?: "newest" | "oldest";
}

// Database query types
export interface IQueryResult<T> {
  rows: T[];
  rowCount: number;
  command: string;
}

// Service response types
export interface IServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Pagination metadata
export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// List response with pagination
export interface IListResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: IPaginationMeta;
}