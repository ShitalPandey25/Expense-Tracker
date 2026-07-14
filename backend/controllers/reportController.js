import Expense from "../models/Expense.js";
import Income from "../models/Income.js";


export const getReport = async (req, res) => {

  try {

    const expenses = await Expense.find();

    const incomes = await Income.find();


    const totalExpense = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );


    const totalIncome = incomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );


    const balance = totalIncome - totalExpense;


    res.status(200).json({

      totalIncome,

      totalExpense,

      balance,

      expenses,

      incomes

    });


  } catch(error) {

    res.status(500).json({

      message:error.message

    });

  }

};