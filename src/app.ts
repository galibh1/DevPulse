import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { authRoute } from "./modules/auth/auth.route";
import { issuesRoute } from "./modules/issues/issues.routes";
import { errorHandlingMiddleware } from "./utility";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Devpulse Server",
    author: "Devpulse",
  });
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/issues", issuesRoute);

// Error handling middleware (must be last)
app.use(errorHandlingMiddleware);

export default app;