import express from "express";
import { redirectLink } from "../controllers/linkController.js";

const router = express.Router();

router.get("/:code", redirectLink);

export default router;
