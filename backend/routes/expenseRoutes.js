import express from "express";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addExpense);
router.get("/", auth, getExpenses);
router.delete("/:id", auth, deleteExpense);
router.put("/:id", auth, updateExpense);

export default router;
