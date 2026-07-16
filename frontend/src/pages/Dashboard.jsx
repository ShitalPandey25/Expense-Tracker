import { useState, useEffect } from "react";
import "./Dashboard.css";
import SummaryCard from "../components/SummaryCard";

function Dashboard() {

  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      const incomeResponse = await fetch(
        "http://localhost:5000/api/income"
      );

      const income = await incomeResponse.json();

      const expenseResponse = await fetch(
        "http://localhost:5000/api/expenses"
      );

      const expense = await expenseResponse.json();

      setIncomeData(income);
      setExpenseData(expense);

    } catch (error) {

      console.log(error);

    }
  };

  const totalIncome = incomeData.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalExpense = expenseData.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalBalance = totalIncome - totalExpense;
    return (
    <div className="dashboard">

      <h1>Track Your Finances 💰</h1>

      <div className="summary-container">

        <SummaryCard
          title="Total Balance"
          amount={totalBalance}
        />

        <SummaryCard
          title="Total Income"
          amount={totalIncome}
        />

        <SummaryCard
          title="Total Expense"
          amount={totalExpense}
        />

      </div>

      <div className="transactions">

        <h2>Recent Transactions</h2>

        <table className="transaction-table">

          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {[
              ...incomeData.map((item) => ({
                ...item,
                type: "Income",
              })),

              ...expenseData.map((item) => ({
                ...item,
                type: item.category,
              })),
            ]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((transaction) => (

                <tr key={transaction._id}>

                  <td>{transaction.title}</td>

                  <td>{transaction.type}</td>

                  <td>₹{transaction.amount}</td>

                  <td>
                    {new Date(transaction.date)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </td>

                </tr>

              ))}

            {incomeData.length === 0 &&
              expenseData.length === 0 && (

                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No Transactions Found
                  </td>
                </tr>

              )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;