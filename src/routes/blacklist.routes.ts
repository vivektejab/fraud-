import express from "express";
import {
  createBlacklistEntry,
  getBlacklistEntries,
  getBlacklistEntryById,
  updateBlacklistEntry,
  deleteBlacklistEntry,
} from "../controllers/blacklist.controller";
import { createBlacklistSchema, deleteBlacklistSchema, getBlacklistSchema, updateBlacklistSchema } from "../schema/blacklist.schema";
import validateResource from "../middlewares/validateResource";


const router = express.Router();



router.post("/blacklist", [validateResource(createBlacklistSchema)], createBlacklistEntry);

router.get("/blacklist", getBlacklistEntries);

router.get("/blacklist/:blacklistCode", [validateResource(getBlacklistSchema)], getBlacklistEntryById);

router.put("/blacklist/:blacklistCode", [validateResource(updateBlacklistSchema)], updateBlacklistEntry);

router.delete("/blacklist/:blacklistCode", [validateResource(deleteBlacklistSchema)], deleteBlacklistEntry);



export default router;
