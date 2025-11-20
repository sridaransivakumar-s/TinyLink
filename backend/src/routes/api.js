import express from "express";
import {
  createLink,
  deleteLink,
  getLinkStats,
  listLinks,
} from "../controllers/linkController.js";

const router = express.Router();

router.post("/links", createLink);
router.get("/links", listLinks);
router.get("/links/:code", getLinkStats);
router.delete("/links/:code", deleteLink);

export default router;
