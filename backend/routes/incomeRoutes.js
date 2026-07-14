import express from "express";

import {
  addIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
} from "../controllers/incomeController.js";


const router = express.Router();


// Add Income
router.post("/", addIncome);


// Get All Income
router.get("/", getIncomes);


// Update Income
router.put("/:id", updateIncome);


// Delete Income
router.delete("/:id", deleteIncome);


export default router;