// Trim and clean string
export const cleanString = (str: string): string => {
  return str.trim().replace(/\s+/g, " ");
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Convert string to slug (for URLs)
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Truncate string with ellipsis
export const truncate = (str: string, length: number = 100): string => {
  if (!str) return "";
  return str.length > length ? str.substring(0, length) + "..." : str;
};

// Remove special characters
export const removeSpecialChars = (str: string): string => {
  return str.replace(/[^a-zA-Z0-9\s]/g, "");
};

// Check if string is empty or whitespace only
export const isEmpty = (str: string | undefined | null): boolean => {
  return !str || str.trim().length === 0;
};

// Check if string is email
export const isEmail = (str: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
};

// Check if string is URL
export const isUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

// Generate random string
export const generateRandomString = (length: number = 10): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate unique ID
export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Convert string to camelCase
export const toCamelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return "";
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};

// Convert string to snake_case
export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
};

// Convert string to PascalCase
export const toPascalCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => {
      if (+match === 0) return "";
      return match.toUpperCase();
    });
};

// Extract numbers from string
export const extractNumbers = (str: string): number[] => {
  const matches = str.match(/\d+/g);
  return matches ? matches.map(Number) : [];
};

// Extract email from string
export const extractEmail = (str: string): string | null => {
  const match = str.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  return match ? match[0] : null;
};

// Extract URLs from string
export const extractUrls = (str: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = str.match(urlRegex);
  return matches || [];
};

// Compare strings (case-insensitive)
export const isEqual = (str1: string, str2: string): boolean => {
  return str1.toLowerCase().trim() === str2.toLowerCase().trim();
};

// Reverse string
export const reverseString = (str: string): string => {
  return str.split("").reverse().join("");
};

// Check if string contains only letters
export const isAlpha = (str: string): boolean => {
  return /^[a-zA-Z\s]+$/.test(str);
};

// Check if string contains only numbers
export const isNumeric = (str: string): boolean => {
  return /^\d+$/.test(str);
};

// Check if string is alphanumeric
export const isAlphanumeric = (str: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(str);
};

// Repeat string n times
export const repeatString = (str: string, times: number): string => {
  return str.repeat(Math.max(0, times));
};

// Pad string with character
export const padString = (
  str: string,
  length: number,
  char: string = " ",
  side: "left" | "right" = "left"
): string => {
  const padLength = Math.max(0, length - str.length);
  const padding = char.repeat(padLength);
  return side === "left" ? padding + str : str + padding;
};