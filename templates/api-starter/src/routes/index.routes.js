import { Router } from "express";
import { healthCheck } from "../controllers/health.controller.js";

const router = Router();

// check health of the api and health check controller for more details of error
router.get("/health", healthCheck);

export default router;
