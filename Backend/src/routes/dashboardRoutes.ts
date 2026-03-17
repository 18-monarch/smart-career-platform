import express from "express";
import {
  dashboardHandler,
  notificationsHandler,
} from "../controllers/dashboardController";
import { authMiddleware } from "../middleware";

const router = express.Router();

router.get("/", authMiddleware, dashboardHandler);
router.get("/notifications", authMiddleware, notificationsHandler);

export default router;