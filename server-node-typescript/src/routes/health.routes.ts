import { Router } from "express";
import { healthCheck } from "../_module/health/health.controller.js";

export const healthRouter = Router();

healthRouter.get("/", healthCheck);
