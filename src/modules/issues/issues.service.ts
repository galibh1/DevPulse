import { pool } from "../../db/index";
import type { IIssue, IIssueResponse } from "./issues.interface";

const createIssue = async (payload: IIssue, reporterId: number) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
    INSERT INTO issues(title, description, type, status, reporter_id)
    VALUES($1, $2, $3, 'open', $4)
    RETURNING *
    `,
    [title, description, type, reporterId]
  );

  return result.rows[0];
};

const getAllIssues = async (
  sort: 'newest' | 'oldest' = 'newest',
  type?: string,
  status?: string
) => {
  let query = `SELECT * FROM issues`;
  const params: any[] = [];
  const conditions: string[] = [];
  let paramIndex = 1;

  if (type) {
    conditions.push(`type = $${paramIndex}`);
    params.push(type);
    paramIndex++;
  }

  if (status) {
    conditions.push(`status = $${paramIndex}`);
    params.push(status);
    paramIndex++;
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  const orderBy = sort === 'newest' ? 'DESC' : 'ASC';
  query += ` ORDER BY created_at ${orderBy}`;

  const result = await pool.query(query, params);
  const issues = result.rows;

  // Fetch reporter details for each issue without JOINs
  const issuesWithReporters: IIssueResponse[] = await Promise.all(
    issues.map(async (issue) => {
      const reporterResult = await pool.query(
        `SELECT id, name, role FROM users WHERE id = $1`,
        [issue.reporter_id]
      );

      const reporter = reporterResult.rows[0] || {
        id: issue.reporter_id,
        name: 'Unknown',
        role: 'contributor',
      };

      return {
        ...issue,
        reporter,
      };
    })
  );

  return issuesWithReporters;
};

const getIssueById = async (id: number): Promise<IIssueResponse | null> => {
  const result = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const issue = result.rows[0];

  // Fetch reporter details
  const reporterResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = $1`,
    [issue.reporter_id]
  );

  const reporter = reporterResult.rows[0] || {
    id: issue.reporter_id,
    name: 'Unknown',
    role: 'contributor',
  };

  return {
    ...issue,
    reporter,
  };
};

const updateIssue = async (
  id: number,
  payload: Partial<IIssue>
): Promise<IIssue> => {
  const { title, description, type, status } = payload;
  const updates: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (title !== undefined) {
    updates.push(`title = $${paramIndex}`);
    params.push(title);
    paramIndex++;
  }

  if (description !== undefined) {
    updates.push(`description = $${paramIndex}`);
    params.push(description);
    paramIndex++;
  }

  if (type !== undefined) {
    updates.push(`type = $${paramIndex}`);
    params.push(type);
    paramIndex++;
  }

  if (status !== undefined) {
    updates.push(`status = $${paramIndex}`);
    params.push(status);
    paramIndex++;
  }

  if (updates.length === 0) {
    throw new Error('No valid fields to update');
  }

  updates.push(`updated_at = NOW()`);
  params.push(id);

  const query = `
    UPDATE issues
    SET ${updates.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *
  `;

  const result = await pool.query(query, params);

  if (result.rows.length === 0) {
    throw new Error('Issue not found');
  }

  return result.rows[0];
};

const deleteIssue = async (id: number): Promise<void> => {
  const result = await pool.query(
    `DELETE FROM issues WHERE id = $1`,
    [id]
  );

  if (result.rowCount === 0) {
    throw new Error('Issue not found');
  }
};

const getIssueByIdForOwnerCheck = async (id: number): Promise<IIssue | null> => {
  const result = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [id]
  );

  return result.rows.length > 0 ? result.rows[0] : null;
};

export const issuesService = {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  getIssueByIdForOwnerCheck,
};