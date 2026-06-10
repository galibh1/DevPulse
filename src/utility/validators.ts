// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 8 chars, at least 1 uppercase, 1 lowercase, 1 number)
export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  return null;
};

// Name validation
export const validateName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return "Name is required";
  }
  if (name.length > 255) {
    return "Name must not exceed 255 characters";
  }
  if (name.length < 2) {
    return "Name must be at least 2 characters long";
  }
  return null;
};

// Role validation
export const validateRole = (role: string): boolean => {
  return ["contributor", "maintainer"].includes(role);
};

// Issue title validation
export const validateIssueTitle = (title: string): string | null => {
  if (!title || title.trim().length === 0) {
    return "Title is required";
  }
  if (title.length > 150) {
    return "Title must not exceed 150 characters";
  }
  if (title.length < 5) {
    return "Title must be at least 5 characters long";
  }
  return null;
};

// Issue description validation
export const validateIssueDescription = (description: string): string | null => {
  if (!description || description.trim().length === 0) {
    return "Description is required";
  }
  if (description.length < 20) {
    return "Description must be at least 20 characters long";
  }
  if (description.length > 5000) {
    return "Description must not exceed 5000 characters";
  }
  return null;
};

// Issue type validation
export const validateIssueType = (type: string): boolean => {
  return ["bug", "feature_request"].includes(type);
};

// Issue status validation
export const validateIssueStatus = (status: string): boolean => {
  return ["open", "in_progress", "resolved"].includes(status);
};