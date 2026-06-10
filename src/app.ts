import express from "express";
import cors from "cors";
import { authRoute } from "./modules/auth/auth.route";
import { issuesRoute } from "./modules/issues/issues.routes";
import { errorHandlingMiddleware } from "./utils/errorHandler";

const app = express();


app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== ROUTES ==========
app.use("/api/auth", authRoute);
app.use("/api/issues", issuesRoute);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "DevPulse API is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: null,
    errors: null,
  });
});

// Global error handler (must be last)
app.use(errorHandlingMiddleware);

export default app;