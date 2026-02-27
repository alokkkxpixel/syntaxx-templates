import express from "express";
import routes from "./routes/index.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api", routes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
