import Expense from "../models/Expense.js";
import Income from "../models/Income.js";

export const getReport = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const incomes = await Income.find();

    // Total
    const totalExpense = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const totalIncome = incomes.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const balance = totalIncome - totalExpense;

    // Month Wise Summary
    const monthlyData = {};

    // Income
    incomes.forEach((income) => {
      const month = new Date(income.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          income: 0,
          expense: 0,
          balance: 0,
        };
      }

      monthlyData[month].income += Number(income.amount);
    });

    // Expense
    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          income: 0,
          expense: 0,
          balance: 0,
        };
      }

      monthlyData[month].expense += Number(expense.amount);
    });

    // Balance
    Object.values(monthlyData).forEach((item) => {
      item.balance = item.income - item.expense;
    });

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
      monthlySummary: Object.values(monthlyData),
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};