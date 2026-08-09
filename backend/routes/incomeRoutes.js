import express from "express";

import {
  addIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
} from "../controllers/incomeController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addIncome);
router.get("/", auth, getIncomes);
router.put("/:id", auth, updateIncome);
router.delete("/:id", auth, deleteIncome);

export default router;
