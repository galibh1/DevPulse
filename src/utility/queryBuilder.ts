import type { Pool, QueryResult } from "pg";

// Generic query execution with error handling
export const executeQuery = async (
  pool: Pool,
  query: string,
  params: any[] = []
): Promise<QueryResult> => {
  try {
    const result = await pool.query(query, params);
    return result;
  } catch (error: any) {
    console.error("Database Query Error:", {
      query,
      params,
      error: error.message,
    });
    throw error;
  }
};

// Build dynamic WHERE clause
export const buildWhereClause = (
  filters: Record<string, any>,
  columnMappings?: Record<string, string>
): { whereClause: string; params: any[] } => {
  const conditions: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      const columnName = columnMappings?.[key] || key;
      conditions.push(`${columnName} = $${paramIndex}`);
      params.push(value);
      paramIndex++;
    }
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  return { whereClause, params };
};

// Build dynamic SET clause for updates
export const buildSetClause = (
  updates: Record<string, any>,
  columnMappings?: Record<string, string>
): { setClause: string; params: any[]; paramIndex: number } => {
  const conditions: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined && value !== null) {
      const columnName = columnMappings?.[key] || key;
      conditions.push(`${columnName} = $${paramIndex}`);
      params.push(value);
      paramIndex++;
    }
  }

  const setClause = conditions.join(", ");
  return { setClause, params, paramIndex };
};

// Pagination helper
export const calculatePagination = (
  page: number = 1,
  limit: number = 10
): { offset: number; limit: number } => {
  const validPage = Math.max(1, page);
  const validLimit = Math.max(1, Math.min(limit, 100)); // Max 100 per page
  const offset = (validPage - 1) * validLimit;
  return { offset, limit: validLimit };
};

// Sorting helper
export const buildOrderBy = (
  sortBy: string = "created_at",
  order: "ASC" | "DESC" = "DESC",
  allowedColumns: string[] = []
): string => {
  const validColumn = allowedColumns.includes(sortBy) ? sortBy : "created_at";
  const validOrder = ["ASC", "DESC"].includes(order) ? order : "DESC";
  return `ORDER BY ${validColumn} ${validOrder}`;
};

// Build COUNT query
export const buildCountQuery = (
  tableName: string,
  whereClause: string = ""
): string => {
  const query = `SELECT COUNT(*) as total FROM ${tableName}`;
  return whereClause ? `${query} ${whereClause}` : query;
};

// Build SELECT query
export const buildSelectQuery = (
  tableName: string,
  columns: string[] = ["*"],
  whereClause: string = "",
  orderBy: string = "",
  limit?: number,
  offset?: number
): string => {
  let query = `SELECT ${columns.join(", ")} FROM ${tableName}`;

  if (whereClause) query += ` ${whereClause}`;
  if (orderBy) query += ` ${orderBy}`;
  if (limit) query += ` LIMIT ${limit}`;
  if (offset) query += ` OFFSET ${offset}`;

  return query;
};

// Build INSERT query
export const buildInsertQuery = (
  tableName: string,
  data: Record<string, any>
): { query: string; params: any[] } => {
  const columns = Object.keys(data);
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
  const query = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${placeholders}) RETURNING *`;
  const params = Object.values(data);
  return { query, params };
};

// Build UPDATE query
export const buildUpdateQuery = (
  tableName: string,
  data: Record<string, any>,
  whereClause: string,
  whereParams: any[]
): { query: string; params: any[] } => {
  const columns = Object.keys(data);
  const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(", ");
  const params = [...Object.values(data), ...whereParams];
  const query = `UPDATE ${tableName} SET ${setClause}, updated_at = NOW() ${whereClause} RETURNING *`;
  return { query, params };
};

// Build DELETE query
export const buildDeleteQuery = (
  tableName: string,
  whereClause: string
): string => {
  return `DELETE FROM ${tableName} ${whereClause}`;
};