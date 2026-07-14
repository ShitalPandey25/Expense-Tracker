import express from "express";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", addExpense);
router.get("/", getExpenses);
router.delete("/:id", deleteExpense);
router.put("/:id", updateExpense);

export default router;