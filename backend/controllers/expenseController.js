import Expense from "../models/Expense.js";

// Add Expense
export const addExpense = async (req, res) => {
  try {
    const { title, category, amount, date } = req.body;

    const expense = await Expense.create({
      title,
      category,
      amount,
      date,
    });

    res.status(201).json({
      message: "Expense Added Successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const { title, category, amount, date } = req.body;

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        amount,
        date,
      },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
