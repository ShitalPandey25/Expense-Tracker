import Income from "../models/Income.js";

// Add Income
export const addIncome = async (req, res) => {
  try {
    const { title, Source, amount, date } = req.body;

    const income = await Income.create({
      title,
      Source,
      amount,
      date,
      user: req.user,
    });

    res.status(201).json({
      message: "Income Added Successfully",
      income,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Income
export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user }).sort({ date: -1 });

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Income
export const updateIncome = async (req, res) => {
  try {
    const { title, Source, amount, date } = req.body;

    const income = await Income.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      {
        title,
        Source,
        amount,
        date,
      },
      { new: true }
    );

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    res.status(200).json({
      message: "Income updated successfully",
      income,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Income
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    res.status(200).json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
